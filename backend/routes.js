const externalWeatherApi = {
    getWeatherReport: async (city) => {
        const apiKey = process.env.WEATHER_API_KEY;

        // Function to format a Date object as 'YYYY-MM-DD'
        const formatDate = (date) => date.toISOString().split('T')[0];

        // Get today's date
        const today = new Date();
        const fromDate = formatDate(today); // Today's date in 'YYYY-MM-DD'

        // Calculate the date two days after today
        const twoDaysLater = new Date();
        twoDaysLater.setDate(today.getDate() + 2); // Add 2 days
        const toDate = formatDate(twoDaysLater); // Date in 'YYYY-MM-DD'


        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${fromDate}/${toDate}?unitGroup=metric&key=${apiKey}&contentType=json`
        const getReport = await fetch(url, {"method": "GET", "headers": {}});

        console.log(getReport.body)

        return getReport.body
    },
    getCities: (city) => {
        const cities = ['Abuja', 'Lagos', 'Aba', 'Capetown'];
        const filtered = cities.filter(c => c.match(city));
        if (city && !filtered.includes(city)) filtered.unshift(city);
        return filtered;
    }
}

export default function (fastify, options, done) {
    fastify.post('/weather-report', async (request, reply) => {
        const {city} = request.body;
        const cityKey = `${city}_response`;
        const {redis} = fastify;

        return reply.send(await externalWeatherApi.getWeatherReport(city));
        try {
            // Try to get the cached data from Redis
            let result = await redis.get(cityKey);

            if (!result) {
                // If no result in Redis, fetch from external API
                result = await externalWeatherApi.getWeatherReport(city);

                // Cache the new data in Redis
                await redis.set(cityKey, JSON.stringify(result));
                console.log({status: 'ok'});
            } else {
                // Parse the cached result from Redis
                result = JSON.parse(result);
            }

            // Send the result to the client
            reply.send(result);
        } catch (err) {
            // Handle any errors that occur
            console.error(err);
            reply.status(500).send({error: 'Internal Server Error'});
        }
    });

    fastify.post('/city-suggestions', async (request, reply) => {
        reply.send(externalWeatherApi.getCities(request.body.city));
    });

    done();
}

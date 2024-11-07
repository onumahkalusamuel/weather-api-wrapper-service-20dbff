import BaseService from "./base.service.ts";

export const apiGetWeatherReport = async (city: string) => {
    return (await BaseService.post('/weather-report', {city})).data;
}

export const apiGetCitySuggestions = async (city: string) => {
    return (await BaseService.post('/city-suggestions', {city})).data;
}
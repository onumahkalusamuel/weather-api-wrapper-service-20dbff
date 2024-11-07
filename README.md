# to-do-list-api-20dbff
Day 3 of 20 days backend for fun

## Project Overview
Weather API Wrapper Service saw the use of docker! Check out LinkedIn post.

## Project Structure
The project (monorepo) has two folders:
* `backend`: Contains the code for the backend api.
* `frontend`: Contains the code for the user-facing webapp.

## Setup
To run the project, kindly clone the repository.
* At the root folder, run `yarn install` to install all dependencies.
* Create `.env` files at the root, and the `backend` folders of the project.
* Create a free account on [https://www.visualcrossing.com/](https://www.visualcrossing.com/) to get your API key.
* Save the API key in the .env as `WEATHER_API_KEY=your_api_key`. Replace your_api_key accordingly. 
* Then `yarn dev` to load the app in dev mode.
* To run the dev and production modes effectively, you need a redis installation running. You can use the `docker-compose.yml` file instead to simply things.
* The API is live at http://localhost:3000, while the frontend can be accessed at http://localhost:5173.
* To load the app in production mode, run `yarn start`. The whole app will be available at http://localhost:3000.

## Recommendations for update
* Add loading indicators to show when app is loading.

# Front End Developer, Client Solutions - Hiring Challenge

Movable Ink is a software company that provides marketers with technology to create personalized experiences. This often means we are reaching out to different API's, applying business logic to the data, and generating an image in real-time.

In this code challenge, you will be in charge of creating a view that renders the forecast for a specific location. Please, use plain HTML, CSS, and JS.

**Don't spend more than two hours on this.** The goal of this challenge is to get a sense for how you reason about a problem and structure your code _not_ if you can finish it.

## Challenge details

Requirements for the challenge:

1. Create a project that consume the **geolocation endpoint**.
1. Use the data from the geolocation endpoint to make a second call to the **forecast endpoint**.
1. Use the data from both endpoints to generate the creative found [here.](/img/creative_mock_up.gif)
1. Your code should be as maintainable and extensible as possible.
1. Please timebox this exercise to 2 hours.

## Get Started

- Run `npm run start` to start your local dev environment
- Run `npm run pack` to package your code and send to us

## Geolocation endpoint

```sh
https://se-weather-api.herokuapp.com/api/v1/geo
```

This is the endpoint for retrieving the geo data associated with a given zip code. This endpoint should be called with `GET` and accepts a single query string parameter (`zip_code`).

Example:

```sh
https://se-weather-api.herokuapp.com/api/v1/geo?zip_code=90210
https://se-weather-api.herokuapp.com/api/v1/geo?zip_code=10019
```

## Forecast endpoint

```
https://se-weather-api.herokuapp.com/api/v1/forecast
```

This is the endpoint for retrieving the weather forecast data associated with at a lat/lon. This endpoint should be called with `GET` and accepts three query string parameters (`latitude`, `longitude`, `date`).

Example:

```
https://se-weather-api.herokuapp.com/api/v1/forecast?latitude=34.09&longitude=-104.2&date=01/24/2020
https://se-weather-api.herokuapp.com/api/v1/forecast?latitude=32.05&longitude=-94.1&date=01/24/2020
```

import { convertDate } from "./utils";
import moment from "moment";

const cloudy = require("../img/cloudy.png");
const rain = require("../img/rain.png");
const snow = require("../img/snow.png");
const sunny = require("../img/sunny.png");

const images = {
  cloudy,
  rain,
  snow,
  sunny
};

const descriptions = {
  sunny: 'Clear',
  rain: 'Rainy',
  snow: 'Snowy',
  cloudy: 'Cloudy'
};

const form = document.querySelector("#zipForm");
const input = document.querySelector("#zipInput");
const errorMsg = document.querySelector("#errorMsg");
const forecast = document.querySelector("#forecast");

form.addEventListener("submit", getData);

const geoUrl = "https://se-weather-api.herokuapp.com/api/v1/geo";
const forecastUrl = "https://se-weather-api.herokuapp.com/api/v1/forecast";

let city = "";

function getData(e) {
  e.preventDefault();
  if (!validateZip(input.value)) {
    invalidZip();
    return;
  }
  getGeoData(input.value).then(data => {
    errorMsg.style.display = "none";
    city = data.city; 
    const lat = data.latitude;
    const long = data.longitude;
    const curDate = getCurDate();
    return getForecast(lat, long, curDate);
  }).then(forecast => {
    renderForecast(city, forecast);
  }).catch(err => {
    renderError(err.message);
  });
}

function validateZip(input) {
  return /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(input);
}

function getCurDate() {
  return moment().format("MM/DD/YYYY");
}

function invalidZip() {
  const error = "Invalid zipcode<br>Must be 6-digit integer from 00001-99950";
  renderError(error);
}

function renderError(err) {
  forecast.innerHTML = "";
  errorMsg.style.display = "block";
  errorMsg.innerHTML = err;
}

function renderForecast(city, data) {
  const title = document.createElement("h1");
  title.innerHTML = `weather forecast for ${city}`;
  forecast.appendChild(title);
  const cardContainer = document.createElement("div");
  cardContainer.setAttribute("id", "cardContainer");
  for (let i = 0; i < 3; i++) {
    const curr = data.daily.data[i];
    const card = document.createElement("div");
    card.setAttribute("class", "card");
    const day = document.createElement("h2");
    day.setAttribute("class", "day");
    day.innerHTML = `${i == 0 ? "Today" : getDay(curr.time)}:`;
    const innerCard = document.createElement("div");
    innerCard.setAttribute("class", "innerCard");
    const icon = document.createElement("img");
    icon.src = images[curr.icon];
    const innerWeather = document.createElement("div");
    innerWeather.setAttribute("class", "innerWeather");
    const description = document.createElement("p");
    description.innerHTML = descriptions[curr.icon];
    const highLow = document.createElement("p");
    highLow.innerHTML = `<strong>${Math.round(curr.temperatureHigh)}&#176</strong> / ${Math.round(curr.temperatureLow)}&#176 F`;
    card.appendChild(day);
    card.appendChild(innerCard);
    innerCard.appendChild(icon);
    innerCard.appendChild(innerWeather);
    innerWeather.appendChild(description);
    innerWeather.appendChild(highLow);
    cardContainer.appendChild(card);
  }
  forecast.appendChild(cardContainer);
  console.log(data.daily.data);
}

function getDay(unixDate) {
  return moment(convertDate(1623542400)).format("dddd");
}

function getGeoData(zip) {
  const url = `${geoUrl}?zip_code=${zip}`;
  return new Promise((resolve, reject) => {
    fetch(url).then(response => {
      return response.json();
    }).then(data => {
      if (Object.keys(data).length === 0) {
        throw new Error("no location found");
      }
      resolve(data);
    }).catch(err => {
      reject(err);
    });
  });
}

function getForecast(lat, long, date) {
  const url = `${forecastUrl}?latitude=${lat}&longitude=${long}&date=${date}`
  return new Promise((resolve, reject) => {
    fetch(url).then(response => {
      return response.json();
    }).then(data => {
      if (data.error) {
        throw new Error("no forecast found");
      }
      resolve(data);
    }).catch(err => {
      reject(err);
    });
  });
}
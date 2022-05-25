function showCity(event) {
  event.preventDefault();

  let inputEl = document.querySelector(".input-el");

  let city = document.querySelector("h1.current_city");

  city.innerHTML = inputEl.value;

  let apiKey = "92f4874947fcb51fea9f55c63fd5c925";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputEl.value}&appid=${apiKey}&units=metric`;

  axios.get(url).then(displayCurrentTemp);
}

let search = document.querySelector(".search");
search.addEventListener("submit", showCity);

let searchBtn = document.querySelector(".search button");
searchBtn.addEventListener("click", showCity);

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}, ${hours}:${minutes}`;
}

function getShortDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastEl = document.querySelector(".weather");

  let forecastHTML = `<div class="weekdays">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
        <div class="daygroup">
          <div class="day-of-week">${getShortDate(forecastDay.dt)}</div>
          <img
            class="weather-image"
            src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png"
            alt=""
            width="42"
          />
          <div class="degrees">
            <span class="day-temp">${Math.round(forecastDay.temp.max)}°</span>
            /
            <span class="night-temp">${Math.round(forecastDay.temp.min)}°</span>
          </div>
        </div>
      `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastEl.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "92f4874947fcb51fea9f55c63fd5c925";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayCurrentTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;

  let tempDegree = document.querySelector("p.temp-degree");
  let currentCity = document.querySelector("h1.current_city");
  let descriptionEl = document.querySelector(".description");
  let humidityEl = document.querySelector(".humidity");
  let windEl = document.querySelector(".wind");
  let weatherIcon = document.querySelector(".image");
  let dateEl = document.querySelector(".date");

  tempDegree.innerHTML = `${temperature}`;
  currentCity.innerHTML = `${city}`;
  descriptionEl.innerHTML = response.data.weather[0].description;
  humidityEl.innerHTML = response.data.main.humidity;
  windEl.innerHTML = Math.round(response.data.wind.speed);
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].descriptionremoved);
  dateEl.innerHTML = formatDate(response.data.dt * 1000);

  getForecast(response.data.coord);
}

function displayCurrentPosition(position) {
  let apiKey = "92f4874947fcb51fea9f55c63fd5c925";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayCurrentTemp);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(displayCurrentPosition);
}

getCurrentPosition();

function celsiusHandler() {
  let tempDegree = document.querySelector("p.temp-degree");
  const temp = parseInt(tempDegree.innerHTML, 10);
  tempDegree.innerHTML = temp;
}

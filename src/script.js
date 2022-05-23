function currentTime() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  let hours = now.getHours();
  let minutes = now.getMinutes();

  return `${day}, ${hours}:${minutes}`;
}

let time = document.querySelector("p.current-time");
time.innerHTML = currentTime();

function showCity(event) {
  event.preventDefault();

  let inputEl = document.querySelector(".input-el");

  let city = document.querySelector("h1.current_city");

  city.innerHTML = inputEl.value;

  let apiKey = "92f4874947fcb51fea9f55c63fd5c925";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputEl.value}&appid=${apiKey}&&units=metric`;

  axios.get(url).then(displayCurrentTemp);
}

let search = document.querySelector(".search");
search.addEventListener("submit", showCity);

let searchBtn = document.querySelector(".search button");
searchBtn.addEventListener("click", showCity);

function displayCurrentTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let tempDegree = document.querySelector("p.temp-degree");
  tempDegree.innerHTML = `${temperature}`;
  let currentCity = document.querySelector("h1.current_city");
  currentCity.innerHTML = `${city}`;
}

function displayCurrentPosition(position) {
  let apiKey = "92f4874947fcb51fea9f55c63fd5c925";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayCurrentTemp);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(displayCurrentPosition);
}

let currentBtn = document.querySelector(".btn-current");
currentBtn.addEventListener("click", getCurrentPosition);

function convertToCelsius(temp) {
  return Math.round((5 / 9) * (temp - 32));
}

function convertToFahrenheight(temp) {
  return Math.round(temp * 1.8 + 32);
}

let isCelsius = true;

function celsiusHandler() {
  if (isCelsius) {
    return;
  }

  let tempDegree = document.querySelector("p.temp-degree");
  const temp = parseInt(tempDegree.innerHTML, 10);
  tempDegree.innerHTML = convertToCelsius(temp);
  isCelsius = true;
}

function fahrenheightHandler() {
  if (!isCelsius) {
    return;
  }

  let tempDegree = document.querySelector("p.temp-degree");
  const temp = parseInt(tempDegree.innerHTML, 10);
  tempDegree.innerHTML = convertToFahrenheight(temp);
  isCelsius = false;
}

let celsius = document.querySelector("a.celsiusD");
celsius.addEventListener("click", celsiusHandler);

let fahrenheit = document.querySelector("a.fahrenheightD");
fahrenheit.addEventListener("click", fahrenheightHandler);

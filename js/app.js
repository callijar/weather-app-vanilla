//set current date
function formatDate(date) {
  var hours = date.getHours();
  if (hours < 10) {
      hours = `0${hours}`;
  }
  var minutes = date.getMinutes();
  if (minutes < 10) {
      minutes = `0${minutes}`;
  }
  var day = date.getDay();
  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var today = days[day];
  return `${today} ${hours}:${minutes}`;
}

function displayWeatherCondition(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#description").innerHTML = response.data.weather[0].main;
  document.querySelector("#current-feel").innerHTML = Math.round(response.data.main.feels_like);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
}

function searchCity(city) {
  var tempUnit = "metric";
  let apiKey = "2513f3c728b1b5ff4f4347e1a6af22b8";
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${tempUnit}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  var city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  var tempUnit = "metric";
  let apiKey = "2513f3c728b1b5ff4f4347e1a6af22b8";
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${tempUnit}`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 66;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 19;
}

var dateElement = document.querySelector("#date");
var currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

var searchForm = document.querySelector("form");
searchForm.addEventListener("submit", handleSubmit);

var locationButton = document.querySelector("#current-location-button");
locationButton.addEventListener("click", getCurrentLocation);

searchCity("London"); //initial display


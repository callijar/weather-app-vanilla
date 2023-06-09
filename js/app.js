//set current date and background
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
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var today = days[day];
  var month = date.getMonth();

  let seasons = ["spring", "summer", "autumn", "winter"];
  if (month === 2||month === 3||month === 4) {
    var season = seasons[0];
  } else if (month === 5||month === 6||month === 7) {
    var season = seasons[1];
  } else if (month === 8||month === 9||month === 10) {
    var season = seasons[2];
  } else if (month === 11||month === 0||month === 1) {
    var season = seasons[3];
  }

  var videoElement = document.querySelector("#background-video");
  videoElement.setAttribute("src", `media/videos/${season}.mp4`);
  videoElement.setAttribute("alt", season);

  return `${today} ${hours}:${minutes}`;
}

function randomQuote() {
  var quoteNumber = Math.floor(Math.random() * 17);
  let quoteNameList = ["breathe", "change", "chill", "coffee", "explore", "fearless", "feather", "hike", "print1", "print2", "smile", "stars", "strong", "sunflower", "tea", "thanks", "today", "write"];
  var quote = quoteNameList[quoteNumber];
  var quoteElement = document.querySelector("#quote-img");
  quoteElement.setAttribute("src", `media/images/${quote}.svg`);
  quoteElement.setAttribute("alt", quote);
}

function displayWeatherCondition(response) {
  document.querySelector("#current-city").innerHTML = response.data.city;
  document.querySelector("#description").innerHTML = response.data.condition.description;
  document.querySelector("#current-feel").innerHTML = Math.round(response.data.temperature.feels_like);
  document.querySelector("#humidity").innerHTML = response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  var iconElement = document.querySelector("#current-emoji");
  iconElement.setAttribute("src", response.data.condition.icon_url);
  iconElement.setAttribute("alt", response.data.condition.icon);
}

function convertTemperatureUnit() {
  unitElement = document.getElementById('temp-unit-button').innerText;
  if (unitElement === '°C') {
    document.getElementById('temp-unit').innerText = '°C';
    document.getElementById('temp-unit-button').innerText = '°F';
    var tempUnit = "metric";
  } else if (unitElement === '°F') {
    document.getElementById('temp-unit').innerText = '°F';
    document.getElementById('temp-unit-button').innerText = '°C';
    var tempUnit = "imperial";
  }
  var sameCity = document.getElementById('current-city').innerText;
  var apiUrl = `https://api.shecodes.io/weather/v1/current?query=${sameCity}&key=${apiKey}&units=${tempUnit}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}


function searchCity(city) {
  var apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  var city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  var apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=${apiKey}&units=metric`
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}


let apiKey = "45t979b41003aof20ffaaa7143e5db63";

var dateElement = document.querySelector("#date");
var currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

var searchForm = document.querySelector("form");
searchForm.addEventListener("submit", handleSubmit);

var locationButton = document.querySelector("#current-location-button");
locationButton.addEventListener("click", getCurrentLocation);

randomQuote();
searchCity("Mashhad"); //initial display

var unitButton = document.querySelector("#temp-unit-button");
unitButton.addEventListener("click", convertTemperatureUnit);



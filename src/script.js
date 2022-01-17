//Show Todays Date and Time

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

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

let date = now.getDate();
let hours = now.getHours();
let month = months[now.getMonth()];
let day = days[now.getDay()];
let year = now.getFullYear();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let dayNow = document.querySelector("#todays-day");
dayNow.innerHTML = `${day}`;

let dateNow = document.querySelector("#todays-date");
dateNow.innerHTML = `${date} / ${month} / ${year}`;

let timeNow = document.querySelector("#todays-time");
timeNow.innerHTML = `${hours}:${minutes}`;

// Get Current Location

function getStats(response) {
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;

  let temperature = Math.round(response.data.main.temp);
  let actualTemp = document.querySelector("#todays-temp");
  actualTemp.innerHTML = `${temperature}℃`;

  let weatherDesc = document.querySelector("#desc-01");
  weatherDesc.innerHTML = response.data.weather[0].description;

  let humidity = document.querySelector("#humid-01");
  humidity.innerHTML = ` Humidity: ${response.data.main.humidity}%`;

  let wind = Math.round(response.data.wind.speed);
  document.querySelector("#wind-01").innerHTML = `Wind: ${wind} m/s`;
}

// Search City

function searchCity(event) {
  event.preventDefault();
  let enterCity = document.querySelector("#city-input").value;
  if(enterCity.length > 0){
    let units = "metric";
    let apiKey = "c99e3c63db4b771cf4a3162ff97bc69c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${enterCity}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(getStats);
  }else{
    alert("Enter in a City");
  }
  return false;
}


// Geo location Search

function geoLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "c99e3c63db4b771cf4a3162ff97bc69c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(getStats);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(geoLocation);
}

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", searchCity);

let currentPostition = document.querySelector("#current-button");
currentPostition.addEventListener("click", getCurrentLocation);

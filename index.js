function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = searchInputElement.value;

  let city = searchInputElement.value;
  let apiKey = "b30b76f38a21608034fc384fba6ot0fc";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);

function showWeather(response) {
  let temperatureElement = document.querySelector(".current-temperature-value");
  let temperature = Math.round(response.data.temperature.current);
  temperatureElement.innerHTML = temperature;

  let descriptionElement = document.querySelector("#current-description");
  let humidityElement = document.querySelector("#current-humidity");
  let windSpeedElement = document.querySelector("#current-speed");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  temperatureElement.innerHTML = Math.round(temperature);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
  getForecast(response.data.city);
}

function getForecast(city) {
  let apiKey = "b30b76f38a21608034fc384fba6ot0fc";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query={query}&key={key}&units=metric`;
  console.log(apiUrl);
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);

  let days = ["Tue", "Wed", "Thur", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
        <div class="week-container">
          <div class="forecast-day">${day}</div>
          <div class="weather-icon">🌤️</div>
          <div class="forecast-temperatures">
            <div class="forecast-temperature">
              <strong>30&deg</strong>
            </div>
            <div class="forecast-temperature">20&deg</div>
          </div>
        </div>
      `;
  });

  let forecastElement = document.querySelector("#forecast-days");
  forecastElement.innerHTML = forecastHtml;
}

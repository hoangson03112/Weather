const API_key = "297f25c3c735ea24c5a2a9a2383ebe9c";
const DEFAULT_VALUE = "--";

const searchInput = document.querySelector("#search-input");
const list = document.querySelector(".cardContainer");

const cityName = document.querySelector(".city");
const weatherState = document.querySelector(".weather");

const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temp");
const minTemp = document.querySelector(".minTemp");
const maxTemp = document.querySelector(".maxTemp");
const form = document.querySelector("#search-form");

const Sunrise = document.querySelector(".Sunrise");
const Sunset = document.querySelector(".Sunset");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const InputValue = searchInput.value;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${InputValue}&appid=${API_key}&units=metric&lang=vi`
  )   
    .then(async (res) => {
      const data = await res.json();

      const content = ` <div class="card">
      <p class="city">${data.name} (${data.sys.country})</p>
      <p class="weather">${data.weather[0].description}</p>
        <img
          class="weather-icon"
          src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"
        />
      <p class="temp">${Math.round(data.main.temp)}°</p>
      <div class="minmaxContainer">
        <div class="min">
          <p class="minHeading">Humidity</p>
          <p class="minTemp">${Math.round(data.main.temp)}°</p>
        </div>
        <div class="max">
          <p class="maxHeading">Speed</p>
          <p class="maxTemp">${(data.wind.speed * 3.6).toFixed(1)} km/h</p>
        </div>
        <div class="sunrise">
          <p class="maxHeading">Sunrise</p>
          <p class="Sunrise">${moment.unix(data.sys.sunrise).format("H:mm")}</p>
        </div>
        <div class="sunset">
          <p class="maxHeading">Sunset</p>
          <p class="Sunset">${moment.unix(data.sys.sunset).format("H:mm")}</p>
        </div>
      </div>
    </div> `;
      list.innerHTML = content;
      form.reset();
    })
    .catch((e) => {
      alert(` ${e.message}`);
      form.reset();
    });
});

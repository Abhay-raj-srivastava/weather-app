const searchButton = document.querySelector("button");

const cityInput = document.querySelector("input");

const cityElement = document.querySelector(".city-name");

const temperatureElement = document.querySelector(".temperature");

const conditionElement = document.querySelector(".weather-condition");

const humidityElement = document.querySelector(".humidity");

const windElement = document.querySelector(".wind-speed");

const weatherIcon = document.querySelector(".weather-icon");

const loadingText = document.querySelector(".loading-text");

console.log(cityElement);

console.log(temperatureElement);

console.log(conditionElement);

console.log(humidityElement);

console.log(windElement);

searchButton.addEventListener("click", async () => {

    const cityName = cityInput.value.trim();

    if(cityName === "") {
        alert("Please enter a city name");
        return;
    }

    const apiKey = "3145f28d55299c71a42d941fea5979fd";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    try {
    loadingText.innerText = "Loading...";

    const response = await fetch(url);

    const data = await response.json();

    console.log(data);

    cityElement.innerText = data.name;

    temperatureElement.innerText = `${Math.round(data.main.temp)}°C`;

    conditionElement.innerText = data.weather[0].main;

    humidityElement.innerText = `Humidity: ${data.main.humidity}%`;

    windElement.innerText = `Wind Speed: ${data.wind.speed} km/h`;

    if(!response.ok) {
        throw new Error("City not found or API issue");
    }

    console.log(data.main.temp);

    console.log(data.weather[0].main);

    const iconCode = data.weather[0].icon;

    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    cityInput.value = "";

    loadingText.innerText = "";

} catch(error) {

    console.log(error);

    loadingText.innerText = "";

    alert(error.message);

}
});

cityInput.addEventListener("keypress", (event) => {

    if(event.key === "Enter") {
        searchButton.click();
    }



});
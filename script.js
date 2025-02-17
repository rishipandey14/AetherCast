document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById("city-input");
    const getWeatherbtn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityNameDisplay = document.getElementById("city-name");
    const temperatureDisplay = document.getElementById("temperature");
    const descriptionDisplay = document.getElementById("description");
    const errorMessage = document.getElementById("error-message");

    const API_KEY = "068c754a6358098b264b1cadae2b9798";   // env variables

    getWeatherbtn.addEventListener('click', async () => {
        const city = cityInput.value.trim();
        if(!city) return "";

        // it may throw an error
        // server/database is always in another continent

        try {
            const weatherData = await fetchWeatherData(city);
            DisplayWeatherData(weatherData);
        } catch (error) {
            showError();
        }
    })

    async function fetchWeatherData(city){
        // gets the data
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`

        const respones = await fetch(url);
        console.log(typeof respones);
        console.log(respones);

        if(!respones.ok){
            throw new Error("City not found");
        }

        const data = await respones.json();
        return data;
        
    }
    function DisplayWeatherData(data){
        // display the data
        console.log(data);
        const {name, main, weather} = data;
        cityNameDisplay.textContent = name;
        temperatureDisplay.textContent = `Temperature : ${main.temp} , Feels like : ${main.feels_like}, Humidity : ${main.humidity}`
        descriptionDisplay.textContent = `Weather : ${weather[0].description}`
        

        // unlock the display
        weatherInfo.classList.remove('hidden')
        errorMessage.classList.add('hidden')
        
    }
    function showError(){
        // shows error
        weatherInfo.classList.add('hidden');
        errorMessage.classList.remove('hidden');
    }
})

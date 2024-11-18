const inputBox=document.querySelector('.input-box');
const searchBtn=document.getElementById('searchBtn');
const weather_img=document.querySelector('.weather-img');
const temperature=document.querySelector('.temperature');
const description=document.querySelector('.description');


async function checkWeather(city) {
    try {
        const api_key = "6daee3fc9704b0f86082993f9645e5e9";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error("City not found");
        }

        const weather_data = await response.json();

        
        temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
        description.innerHTML = `${weather_data.weather[0].description}`;
        
        
        const iconCode = weather_data.weather[0].icon;
        weather_img.src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

    } catch (error) {
        
        alert(error.message);
        temperature.innerHTML = "--";
        description.innerHTML = "Error fetching data";
    }
}

searchBtn.addEventListener('click', () => {
    const city = inputBox.value.trim();
    if (city) {
        checkWeather(city);
    } else {
        alert("Please enter a city name");
    }
});

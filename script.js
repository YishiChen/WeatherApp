const apiKey = 'be9190778886cefda610d7b0a8d403a6';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');

const units = 'lol'

searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        /* Fetch coordinates for the location
        fetchCords(location).then(cords => {
            fetchWeather(cords);
        })
        */
        (async () => {
            const cords = await fetchCords(location);
            fetchWeather(cords);
        })();

    }    
});


async function fetchCords(location) {
    let city = location.split(',')[0];
    let country = location.split(',')[1];
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        cords = { lat: data[0].lat, lon: data[0].lon };
        return cords;
    } catch (error) {
        console.error('Error fetching coordinates:', error);
    }
};


function fetchWeather(cords) {
    
    let lat = cords.lat;
    let lon = cords.lon;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            locationElement.textContent = data.name;
            temperatureElement.textContent = `${Math.round(data.main.temp-272.15)}°C`;
            descriptionElement.textContent = data.weather[0].description;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
};

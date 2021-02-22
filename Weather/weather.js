// SELECT ELEMENTS
// const elements = document.querySelector(".nameSelect");
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");
const windElement = document.querySelector(".windpersec p");
const KELVIN = 273;



// API key, taken from openweatherapi's
const key = "cb13ede4e8fe3380748287f582204941";
// App data
const weather = {};
// sets the unit of temp (could also be set in fharenheit)
weather.temperature = {
    unit : "celsius"
}


const KELVIN = 273;

//sends request of users position
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition);
}

// position of set weather
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}



// Gets weather from position from api openweathermap
function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${59.23705}&lon=${17.98192}&appid=${key}`;

    fetch(api) //Gets the links information and puts it out in a json
        .then(function(response){
            let data = response.json();
            return data;
        })
//function which gets the data from openweatherapi
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN); // temp data (rounds up to the lowest number as a whole number instead of actual temp which could be 20 symbols long)
            weather.speed = data.wind.speed; // was thinking of using Math.floor to round up but as it's quite short already it's good to display the actual m/s
            weather.description = data.weather[0].description; // GETS description of weather from openweather
            weather.iconId = data.weather[0].icon; // the correct icond id for the correct data.weather
            weather.city = data.name; // the lat + lon = 59.23705, 17.98192 which is central of huddinge
            weather.country = data.sys.country; // which country is the coordinates located SE = Sweden
        })
        .then(function(){
            displayWeather(); //which then sends over to function displayweather which display weather UI like img, temp,city/country id etc..
        });
}

// popup event display
tempElement.addEventListener("click", function(){
});

// shows the weather UI
// Sends to the HTML page and removes the white block and put these lists in there instead.
function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`; //replace the block placeholder with approperiate background icon
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`; //sets the value from weather.temperature.value in place
    descElement.innerHTML = weather.description; //sets the description type of the weather from weather.description in place
    locationElement.innerHTML = `${weather.city}, ${weather.country}`; // sets the city id + country id in place of location p
    windElement.innerHTML = `${weather.speed}<span>m/s</span>`; //sets the wind speed from weather.speed in the location of windpersec p
}

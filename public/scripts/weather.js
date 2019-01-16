
var humidity;
var weatherIcon;
var temperature;
var temperatureIcon
var windSpeed;
var weatherSummary;

  humidity = document.getElementById("current-humidity");
  weatherIcon = document.getElementById("current-icon");
  temperature = document.getElementById("current-temperature");
  temperatureIcon = document.getElementById("temperature-icon");
  windSpeed = document.getElementById("current-wind-speed");
  weatherSummary = document.getElementById("weather-summary");

function farenheitToCelsius(k) {
  return Math.round((k - 32) * 0.5556 );
}

function humidityPercentage(h) {
  return Math.round(h * 100);
}


function knotsToKilometres(knot) {
  return Math.round( knot * 1.852);
}

var weatherImages = {
  "clear-day": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Sun_icon.svg/252px-Sun_icon.svg.png",
  "clear-night": "http://www.clker.com/cliparts/f/S/2/p/7/u/gold-matte-moon.svg",
  "rain": "https://cdn3.iconfinder.com/data/icons/weather-16/256/Rainy_Day-512.png",
  "snow": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Nuvola_weather_snow.svg/1000px-Nuvola_weather_snow.svg.png",
  "sleet": "http://www.clker.com/cliparts/f/6/7/4/1206565674431593790Anonymous_simple_weather_symbols_10.svg.hi.png",
  "wind": "http://www.haotu.net/up/4233/128/216-wind.png",
  "fog": "http://www.iconninja.com/files/81/344/943/fog-cloud-hiding-the-sun-weather-interface-symbol-icon.svg",
  "cloudy": "https://image.flaticon.com/icons/svg/53/53934.svg",
  "partly-cloudy-day": "http://meteo.cw/images_www/weather_icons1/weather_icon_03.png",
  "partly-cloudy-night": "http://icon-park.com/imagefiles/simple_weather_icons_cloudy_night.png",
  "hail": "http://icons.iconarchive.com/icons/icons8/ios7/256/Weather-Hail-icon.png",
  "thunderstorm": "http://findicons.com/files/icons/2613/android_weather_extended/480/thunderstorms.png",
  "tornado": "http://hddfhm.com/images/clipart-of-a-tornado-11.png"
}

function getWeather() {
  console.log("a");
    if(navigator.geolocation){
      console.log("true");
      
      navigator.geolocation.getCurrentPosition(function(position){
        console.log("test");
        
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        showWeather(lat, long)
      });
      console.log("fuck");
    }
       else {
        console.log("false");
        
            window.alert("Could not get location");
      }
  }
 
  function showWeather(lat, long) {
    var url = `https://api.darksky.net/forecast/8acbb680d99836baca7e3d3deebe5ed5/${lat},${long}` + `?format=jsonp&callback=displayWeather`;
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
    displayWeather(object)   
  }


 function displayWeather(object) {
    humidity.innerHTML = "Humidity: " + humidityPercentage(object.currently.humidity) + "% ";
    weatherIcon.src = weatherImages[object.currently.icon];
    temperature.innerHTML = farenheitToCelsius(object.currently.temperature) + " C" + " / " + object.currently.temperature + " F";
    windSpeed.innerHTML = "Wind Speed: " + knotsToKilometres(object.currently.windSpeed) + " km/h";
    weatherSummary.innerHTML =object.timezone + " <br/> <br/>" + object.currently.summary;
    document.getElementById("current-icon").style.backgroundColor = "hsl(216, 100%, 60%)"; 
    document.getElementById("weather-summary").style.backgroundColor = "hsl(216, 100%, 60%)"; 
    console.log(object);
 }

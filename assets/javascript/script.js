
// searchLoc = $("#search").val()
// apiKey = '20f82cbfb698e805cd598e366c3108b2'
// fetchAPI = '"http://api.openweathermap.org/data/2.5/forecast?q='+searchLoc+'&units=imperial&appid='+apiKey+'"'
//LIVE API
// fetch(fetchAPI)
dailyForecast = [];
//TEST API
fetch("./assets/test.JSON")

.then (response => response.json())
.then (function (data) {
    dailyForecast.push(data.city.name);
    makeWeatherObj(data,0);
    dailyForecast.push(weather);
    startHour=moment(dailyForecast[1].dateTxt,"YYYY-MM-DD HH:mm:ss").local().format("HH")
    startT=8-(Math.floor((startHour-12)/3))
    for (t=startT; t<40; t+=8) 
        { 
        makeWeatherObj(data,t);
        dailyForecast.push(weather);
        }
    if (startHour<15)
    {
        makeWeatherObj(data,39);
        dailyForecast.push(weather);
    }
    
    function makeWeatherObj(data, pos)  
        {
        weather = {
        temp: data.list[pos].main.temp,
        weather: data.list[pos].weather[0].main,
        weatherIcon: data.list[pos].weather[0].icon,
        weatherDtl: data.list[pos].weather[0].description,
        humidity: data.list[pos].main.humidity,
        heatIndex: data.list[pos].main.feels_like,
        low: data.list[pos].main.temp_min,
        high: data.list[pos].main.temp_max,
        wind: data.list[pos].wind.speed,
        date: data.list[pos].dt,
        dateTxt: data.list[pos].dt_txt
        }
        return weather;
        }
   
console.log (dailyForecast);

let cityLoc = dailyForecast[0];
console.log(cityLoc);
var todayDt = moment(dailyForecast[1].dateTxt,"YYYY-MM-DD HH:mm:ss").format("dddd MMMM, Do YYYY")
var nowIcon = dailyForecast[1].weatherIcon
var nowTemp = dailyForecast[1].temp
var nowFeelsLike = dailyForecast[1].heatIndex
var nowHumidity = dailyForecast[1].humidity
var nowWind = dailyForecast[1].wind
var nowLowTemp = dailyForecast[1].low
var nowHighTemp = dailyForecast[1].high
var nowDetails = dailyForecast[1].weatherDtl


var cityDt = cityLoc+' forecast: '+todayDt
console.log(cityDt)
$("#city-name").append('<h2>'+cityDt+'<h2>');




}
)
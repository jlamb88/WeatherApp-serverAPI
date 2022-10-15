
// searchLoc = $("#search").val()
// apiKey = '20f82cbfb698e805cd598e366c3108b2'
// fetchAPI = '"http://api.openweathermap.org/data/2.5/forecast?q='+searchLoc+'&units=imperial&appid='+apiKey+'"'
//LIVE API
// fetch(fetchAPI)
dailyForecast = [];
//TEST API
fetch("./assets/test.JSON")

.then ((response) => response.json())
.then (function (data) {
    console.log(data);
    for (t=0; t<=40; t+=8) 
    {
        weather = {
            day: t,
            temp: data.list[t].main.temp,
            weather: data.list[t].weather[0].main,
            weatherIcon: data.list[t].weather[0].icon,
            weatherDtl: data.list[t].weather[0].description,
            humidity: data.list[t].main.humidity,
            heatIndex: data.list[t].main.feels_like,
            low: data.list[t].main.temp_min,
            high: data.list[t].main.temp_max,
            wind: data.list[t].wind.speed
            }
    dailyForecast.push(weather);
    }
    return dailyForecast;}
)
console.log(dailyForecast)

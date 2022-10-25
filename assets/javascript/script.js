
// searchLoc = $("#search").val()
// apiKey = '20f82cbfb698e805cd598e366c3108b2'
// fetchAPI = '"http://api.openweathermap.org/data/2.5/forecast?q='+searchLoc+'&units=imperial&appid='+apiKey+'"'
//LIVE API
// fetch(fetchAPI)
//TEST API
fetch("./assets/test.JSON")

.then (response => response.json())
.then (function (data) {
    dailyForecast = [];
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
var nowDetails = dailyForecast[1].weatherDtl


var cityDt = cityLoc+' forecast: '+todayDt;
console.log(cityDt)
$("#city-name").append('<h2>'+cityDt+'<h2>');

for (i=2;i<=6;i++) {
d=i-2;
dayWkday=moment(dailyForecast[1].dateTxt,"YYYY-MM-DD HH:mm:ss").format("dddd")
dayTemp=dailyForecast[i].temp
dayIcon=dailyForecast[i].weatherIcon
dayHumidity=dailyForecast[i].humidity
dayWind=dailyForecast[i].wind
newCard=$('<card>',{class: 'col card m-2', id: 'day'+d,style: "height:30rem", innerHTML: '<div class="card-body"><h4 class="card-title">'+dayWkday+'</h4></br><img src="'+dayIcon+'"class="card-img" id="card-icon" alt="weather icon"><ul class="card-text" id="day-dtls"><li>Temperature: '+dayTemp+'</li><li>Humidity: '+dayHumidity+'</li><li>Wind: '+dayWind+'</li></ul></div>'})

console.log(newCard);
futureEl = $("<future>")
futureEl.append(newCard)
$("<future>").text("This is a TEST")
// $('<future>').append('<div>').addClass("col card m-2").attr("id",'day'+d).attr("style","height:30rem").innerHTML('<div class="card-body"><h4 class="card-title">'+dayWkday+'</h4></br><img src="'+dayIcon+'"class="card-img" id="card-icon" alt="weather icon"><ul class="card-text" id="day-dtls"><li>Temperature: '+dayTemp+'</li><li>Humidity: '+dayHumidity+'</li><li>Wind: '+dayWind+'</li></ul></div>')
}
return;
}
)
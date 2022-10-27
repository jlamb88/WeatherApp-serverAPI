$("#search").click(weatherSearch($("#searchBtn").val()))

weatherSearch = (loc)=>{


apiKey = '20f82cbfb698e805cd598e366c3108b2'
//LIVE API
fetchAPI = '"http://api.openweathermap.org/data/2.5/forecast?q='+loc+'&units=imperial&appid='+apiKey+'"'
fetch(fetchAPI)

//TEST API
// fetch("./assets/test.JSON")

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
   
    let cityLoc = dailyForecast[0];
    var todayDt = moment(dailyForecast[1].dateTxt,"YYYY-MM-DD HH:mm:ss").format("dddd MMMM, Do YYYY")
    var nowIcon = dailyForecast[1].weatherIcon;
    var nowTemp = dailyForecast[1].temp;
    var nowFeelsLike = dailyForecast[1].heatIndex;
    var nowHumidity = dailyForecast[1].humidity;
    var nowWind = dailyForecast[1].wind;
    var nowDetails = dailyForecast[1].weatherDtl;

    $("#city-date").append('<h3 id="city-loc">'+cityLoc+'</h3>')
    $('#city-date').append('<img src="http://openweathermap.org/img/wn/'+nowIcon+'@2x.png" id="now-icon" alt="weather now icon"></br>')
    $('#city-date').append('<today>'+todayDt+'</today>')
    $('#data').append('<li>'+nowTemp+'<sup>o</sup></li><li>'+nowHumidity+'%</li><li>'+nowFeelsLike+'<sup>o</sup></li><li>'+nowWind+' mph</li>')

    for (i=2;i<=6;i++) {
        d=i-1;
        dayWkday=moment(dailyForecast[i].dateTxt,"YYYY-MM-DD HH:mm:ss").format("dddd")
        dayTemp=dailyForecast[i].temp
        dayIcon=dailyForecast[i].weatherIcon
        dayHumidity=dailyForecast[i].humidity
        dayWind=dailyForecast[i].wind
        newCard=$('<card>',{
            class: 'col card m-2', 
            id: 'day'+d,
            style: "height: 20rem",
            html: '<div class="card-body"><h5 class="card-title">'+dayWkday+'</h5><img src="http://openweathermap.org/img/wn/'+dayIcon+'@2x.png "class="card-img" id="card-icon" alt="weather icon"><ul class="card-text" id="day-dtls"><li>Temp: '+dayTemp+'<sup>o</sup></li><li>Humidity: '+dayHumidity+'%</li><li>Wind: '+dayWind+' mph</li></ul></div>'
            }
            )
        $("future").append(newCard)
        }
    return;
}
)





}
)
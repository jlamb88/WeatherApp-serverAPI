

//LIVE API
// fetch("http://api.openweathermap.org/data/2.5/forecast?q="+searchLoc+"&units=imperial&appid=20f82cbfb698e805cd598e366c3108b2")

//TEST API
fetch("./assets/test.JSON")

.then ((response) => response.json())
.then (data => {
    console.log(data);
    var nowTemp
    var nowWeather
    var nowWeatherIcon
    var nowHumidity
    var nowClouds
    var nowDateTm
    
})

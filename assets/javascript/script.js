
$("#search-btn").click(() =>
  weatherSearch($("#search-box").val())
)


function weatherSearch(loc) {
  const apiKey = "20f82cbfb698e805cd598e366c3108b2";
  if ($.isNumeric(loc)) {
    fetchAPI =
      'https://api.openweathermap.org/data/2.5/forecast?zip=' + loc + '&units=imperial&appid=' + apiKey;
  } else {
    if (loc.includes(",")) {
      stateChk = loc.slice(-2)
      if (checkState(stateChk)) {
        loc = loc + ", US";
      }
    }
    fetchAPI =
      'https://api.openweathermap.org/data/2.5/forecast?q=' + loc + '&units=imperial&appid=' + apiKey;
  }

  $('#data').empty()
  $('future').empty()
  $('#city-icon').empty()
  $('today-date').empty()
  $('#srch-list').empty()

  fetch(fetchAPI) //test JSON: "./assets/test.JSON"
    .then((response) => response.json())
    .then(function (data) {
      let pos = 0
      function createWeatherObj(obj) {
        let {
          dt_txt: date,
          main: {
            temp,
            feels_like: heatIndex,
            temp_min: low,
            temp_max: high,
            humidity
          },
          weather: [
            {
              description: details,
              icon
            }],
          wind: {
            speed: wind
          },
          city
        } = obj

        return { date, temp, heatIndex, low, high, humidity, details, icon, wind, city }
      }
      weather = createWeatherObj({ ...data.list[pos], city: data.city.name })
      formatDt = moment.utc(weather.date).local().format("dddd MMMM Do, YYYY")
      temp = Math.round(weather.temp)
      wind = Math.round(weather.wind)
      heatIndex = Math.round(weather.heatIndex)

      $('#city-icon').append(`<h3 id="city-loc"> ${weather.city} </h3><div class="mb-3"><img src="http://openweathermap.org/img/wn/${weather.icon}@2x.png" id="now-icon" alt="weather now icon"></div><h1>${weather.details}</h1>`)
      $('today-date').append(`<strong>${formatDt}</strong>`)
      $('#data').append(
        `<li>${temp}<sup>o</sup></li><li>${weather.humidity}%</li><li>${heatIndex}<sup>o</sup></li><li>${wind} mph</li>`
      );


      let startDt = moment.utc(weather.date, "YYYY-MM-DD HH:mm:ss").local()
      let startHour = moment.utc(weather.date)
        .local()
        .format("HH");
      let startT = 9 - Math.floor((startHour - 12) / 3);
      console.log(startDt, startHour, startT)
      console.log(data)
      for (pos = startT; pos < 40; pos += 8) {
        let weather = createWeatherObj({ ...data.list[pos], location: data.city.name })
        let weekday = moment.utc(weather.date, "YYYY-MM-DD HH:mm:ss").local().format("ddd");
        let temp = Math.round(weather.temp)
        let wind = Math.round(weather.wind)
        var newCard = $("<card>", {
          class: "col card m-2",
          style: "height: 20rem",
          html:
            `<div class="card-body"><h5 class="card-title">${weekday}</h5><div class="mb-4" id="card-icon"><img src="http://openweathermap.org/img/wn/${weather.icon}@2x.png" class="card-img" alt="weather icon"></div><ul class="card-text" id="day-dtls"><li>Temp: ${temp}<sup>o</sup></li><li>Humidity: ${weather.humidity}%</li><li>Wind: ${wind} mph</li></ul></div>`,
        });
        $("future").append(newCard);
      }
      if (startHour < 20) {
        let weather = createWeatherObj({ ...data.list[39], location: data.city.name })
        let weekday = moment.utc(weather.date, "YYYY-MM-DD HH:mm:ss").local().format("ddd");
        let temp = Math.round(weather.temp)
        let wind = Math.round(weather.wind)
        var newCard = $("<card>", {
          class: "col card m-2",
          style: "height: 20rem",
          html:
            `<div class="card-body"><h5 class="card-title">${weekday}</h5><div class="mb-4" id="card-icon"><img src="http://openweathermap.org/img/wn/${weather.icon}@2x.png" class="card-img" id="card-icon" alt="weather icon"></div><ul class="card-text" id="day-dtls"><li>Temp: ${temp}<sup>o</sup></li><li>Humidity: ${weather.humidity}%</li><li>Wind: ${wind} mph</li></ul></div>`,
        });
        $("future").append(newCard);

      }

      let srchHist = localStorage.getItem("history") || "[]"
      srchHist = JSON.parse(srchHist)
      if (!srchHist.includes(weather.city)) {
        srchHist.unshift(weather.city)
      }
      localStorage.setItem("history", JSON.stringify(srchHist));
      console.log(srchHist)

      for (const history of srchHist) {
        console.log(history)
        list = $("<li>", {
          html: `${history}`
        })
        $('#srch-list').append(list)
      }
      return;
    });
}

function checkState(test) {
  stateArr = [
    'AL', 'AK', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI', 'IL', 'IN', 'IA', 'ID', 'KS', 'KY', 'LA', 'ME', 'MA', 'MD', 'MI', 'MN', 'MS', 'MO', 'NC', 'NE', 'ND', 'NV', 'NM', 'NJ', 'NY', 'NH', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WY', 'WA', 'WI', 'WV'];
  test = test.toUpperCase()
  return stateArr.includes(test);
};
// http://openweathermap.org/current
// http://openweathermap.org/weather-conditions

//navigator.geolocation.getCurrentPosition(success, error);

document.getElementById("city").value = "New York, NY";
load();

function load() {
  var city = document.getElementById("city").value;

  showResults("loading...");

  var appid = '283c9e6bf83b94af28ba236b75807434';
  var weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appid}&units=imperial`;
  var fiveDayUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${appid}&units=imperial`;

  console.log("1")
  var weatherRequest = new XMLHttpRequest();
  weatherRequest.onload = weatherSuccess;
  weatherRequest.onerror = failure;
  weatherRequest.open('get', weatherUrl, true);
  weatherRequest.send();

  console.log("2")

  let fiveDayRequest = new XMLHttpRequest();
  fiveDayRequest.onload = fiveDaySuccess;
  fiveDayRequest.onerror = failure;
  fiveDayRequest.open('get', fiveDayUrl, true);
  fiveDayRequest.send();
  console.log("3")

  // code

  function weatherSuccess() {
    let data = JSON.parse(this.responseText);
    console.log("current weather", data);
    showResults(buildCurrentSummary(data));
  }

  function fiveDaySuccess() {
    var data = JSON.parse(this.responseText);
    console.log("five day", data);
    appendResults(buildForecastTable(data));
  }

  function failure(error) {
    showResults("<h2 style='color:red'>Oh no, something bad happened!</h2>");
    console.error(error);
  }
}

function showResults(results) {
  document.getElementById("results").innerHTML = results;
}

function appendResults(results) {
  document.getElementById("results").innerHTML += results;
}

function buildCurrentSummary(current) {
  var weather = current.weather[0];
  var result = `
    <h2>Current weather in ${current.name}</h2>
    
    <p>
      <img src="http://openweathermap.org/img/w/${weather.icon}.png"/>
      ${weather.description}
    </p>
    <p>
      ${Date(current.dt)}
    </p>
    <p> ${current.main.temp}°F, ${current.main.humidity}% humidity</p>
    <p> Wind: ${current.wind.speed} miles/hr </p>
    <p> ${current.clouds.all}% cloudy </p>
    `;
  return result;
}

function buildForecastTable(fiveDay) {
  var result = `
      <h2>5 day forecast</h2>
      <table><tbody>`;

  let previous;
  for (let record of fiveDay.list) {
    let weather = record.weather[0];
    let time = record.dt_txt.substring(11, 16)
    let newDay = !previous || record.dt_txt.substring(0, 10) !== previous.dt_txt.substring(0, 10);
    if (newDay) {
      result += `<tr><td colspan=4><h3>${record.dt_txt.substring(0, 10)}</h3></td></tr>`;
    }
    result +=
      `<tr>
        <td>${time}</td>
        <td><img src="http://openweathermap.org/img/w/${weather.icon}.png"/></td>
        <td>${record.main.temp}</td>
        <td>${weather.description}</td>
      </tr>`
    previous = record;
  }
  result += "</tbody></table>";
  return result;
}
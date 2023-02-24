// app.js
const API_KEY = "179ceeb11c23a912fefd41421f453ea0";
let city_name = "seoul";
let API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_KEY}`;

// 서버에서 불러오는 작업은 비동기 처리(async)
function getWeatherData(cityname = "seoul") {
  city_name = cityname;
  API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_KEY}`;
  fetch(API_URL)
    .then(function (응답데이터) {
      return 응답데이터.json();
    })
    .then(function (data) {
      console.log(data);
      showWeather(data);
    });
}
console.log(API_URL);
function showWeather(data) {
  let desc = data.weather[0].main; // 날씨상태 설명
  // const weather_icon = data.weather[0].icon; // 아이콘
  const temp = parseInt(data.main.temp - 273.15); // 현재온도,섭씨
  const name = data.name; // 도시명
  // console.log(name, desc, weather_icon, temp);
  const bgimgDesc = document.querySelector("#app");

  console.log(desc);
  if (
    desc == "Clear" ||
    desc == "Clouds" ||
    desc == "Dust" ||
    desc == "Rain" ||
    desc == "Snow" ||
    desc == "Thunderstorm"
  ) {
    desc = desc;
  } else {
    desc = "Dust";
  }
  bgimgDesc.style.backgroundImage = `url(./imges/${desc}.gif)`;

  // UI 출력(DOM)
  const citynameEl = document.querySelector(".cityname");

  const tempEl = document.querySelector(".temp");
  const descEl = document.querySelector(".desc");

  citynameEl.textContent = name;

  // iconEl.innerHTML = `<img src='http://openweathermap.org/img/wn/${weather_icon}@2x.png' alt='아이콘'/>`;
  tempEl.innerHTML = `${temp}&deg;`;
  descEl.textContent = desc;
}

//날씨 함수 호출
getWeatherData();

//선택목록(도시명) 변경 이벤트
const select = document.getElementById("select");
select.addEventListener("change", function (e) {
  //console.log("목록변경", this.value);
  console.log(e.target.value);
  const cityname = e.target.value;
  getWeatherData(cityname);
  let container = document.querySelector(".container");
  container.style.backgroundImage = `url(./imges/${cityname}.jpg)`;
});

//지역에 맞춰 시계표현
function times() {
  const time = new Date();
  let hours = time.getHours(); // 시
  let minutes = time.getMinutes() * 6; //분
  let seconds = (time.getSeconds() + 1) * 6; //초
  let sLine = document.querySelector(".sLine");
  let mLine = document.querySelector(".mLine");
  let hLine = document.querySelector(".hLine");
  let city = document.querySelector(".cityname").innerHTML;
  if (city == "Boston") {
    hours = hours - 14;
  } else if (city == "Barcelona") {
    hours = hours - 8;
  } else if (city == "Berlin") {
    hours = hours - 8;
  } else if (city == "Moscow") {
    hours = hours - 6;
  } else if (city == "Algiers") {
    hours = hours - 8;
  } else if (city == "Sydney") {
    hours = hours - 2;
  } else if (city == "Reykjavik") {
    hours = hours - 9;
  }
  sLine.style.transform = `rotate(${seconds}deg)`;
  mLine.style.transform = `rotate(${minutes}deg)`;
  hLine.style.transform = `rotate(${hours * 30}deg)`;
}
setInterval(times, 1000);

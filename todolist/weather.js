const weather = document.querySelector(".js-weather");

const COORDS = "coords";
const API_KEY = "bdf021debe3cc94befadf195cd1235fa";

function getWeather(lat, lng) {
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
    //fetch를 사용해 해당 좌표의 날씨의 정보를 request한다.
    //then은 위의 request가 끝났을때 실행되게하는 것을 의미한다. 만약 then을 안쓰면 request가 끝날때까지
    //프로그램은 아무일도 하지 않는다. 매우 비효율적이다.
    //다음 행동을 해서 오류가 날 확률이 크다.
    .then(function(response) {
      //console.log(response);
      //console.log(response.json());
      //-> promise(프로미스)값을 받는데 이는 자바스크립트의 비동기 처리에 활용되는 객체이다.
      //비동기시 처리는 fetch를 통해 날씨정보를 request했을때 다른일을 하면서 기다리는 것이다
      //동기는 프로그램이 끝날 때까지 다른 일은 하지 않는 것이다.
      return response.json();
    })
    //request의 response을 기다려 응답의 json을 리턴한다.
    .then(function(json) {
      //console.log(json);
      //-> 객체 json의 정보가 나열된다. 이것을 보고 어느부분을 출력할지 정하면된다.
      const temp = json.main.temp;
      const place = json.name;
      weather.innerText = `${temp} @ ${place}`;
      //then을 사용해 reponse의 json이 리턴될때까지 기다려야한다.
      //필요한 부분만 출력시킨다.
    });
}
function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}
function success(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude: latitude,
    longitude: longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}
function error() {
  console.log("Can't access geo location");
}
function askForCoords() {
  navigator.geolocation.getCurrentPosition(success, error);
  //좌표값 불러오는 함수
}
function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}
function init() {
  loadCoords();
}
init();

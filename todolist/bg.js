const body = document.querySelector("body");

const IMG_NUMBER = 3;

function paintImage(num) {
  const image = new Image();
  //이미지 객체 생성
  image.src = `images/${num + 1}.jpg`;
  image.classList.add("bgImage");
  body.prepend(image);
}

function genRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}
function init() {
  const randomNumber = genRandom();
  paintImage(randomNumber);
}
init();

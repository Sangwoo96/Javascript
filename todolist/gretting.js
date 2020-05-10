const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings"),
  question = document.querySelector(".js-question"),
  toForm = document.querySelector(".js-ToDoForm"),
  formSpan = document.querySelector(".form-question");

const USER_ID = "currentUser",
  SHOWING_ON = "showing";
function saveName(text) {
  localStorage.setItem(USER_ID, text);
}
function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}
function paintGreeting(text) {
  form.classList.remove(SHOWING_ON);
  formSpan.classList.remove("form-span");
  greeting.classList.add(SHOWING_ON);
  question.classList.add("todo-question");
  toForm.classList.add("center-below-below");
  question.innerHTML = "What is your main focus for today?";
  greeting.innerText = `Good evening, ${text}.`;
}
function askForName() {
  form.classList.add(SHOWING_ON);
  form.addEventListener("submit", handleSubmit);
}
function loadName() {
  const currentUser = localStorage.getItem(USER_ID);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();

const toDoForm = document.querySelector(".js-ToDoForm");
const toDoInput = toDoForm.querySelector("input");
const todo = document.querySelector(".js-ToDoList");
const TODOS_LS = "toDos";
let toDos = [];
//let Num = 0;
//let idNum = 0;
let divIdNum = 0;

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function deleteToDo() {
  let a = 0;
  const btn = event.target;
  const parent = btn.parentNode;
  todo.removeChild(parent);
  const cleanToDos = toDos.filter(function(toDo) {
    //console.log(toDo.id, del.id);
    return toDo.id !== parseInt(parent.id);
  });
  toDos.splice(0, toDos.length);
  cleanToDos.forEach(function(toDo) {
    toDo.id = a;
    a++;
  });
  toDos = cleanToDos;
  saveToDos();
  toDoView();
}
function toDoView() {
  if (!todo.hasChildNodes()) {
    if (toDos.length !== 0) {
      const view = toDos[divIdNum];
      const div = document.createElement("div");
      const delBtn = document.createElement("i");
      const nextBtn = document.createElement("i");
      const backBtn = document.createElement("i");
      delBtn.className = `far fa-square`;
      nextBtn.className = `fas fa-arrow-right`;
      backBtn.className = `fas fa-arrow-left`;
      const span = document.createElement("span");
      span.innerText = view.text;
      if (divIdNum === 0) {
        div.appendChild(delBtn);
        div.appendChild(span);
        div.appendChild(nextBtn);
      } else if (divIdNum === toDos.length - 1) {
        div.appendChild(backBtn);
        div.appendChild(delBtn);
        div.appendChild(span);
      } else {
        div.appendChild(backBtn);
        div.appendChild(delBtn);
        div.appendChild(span);
        div.appendChild(nextBtn);
      }
      todo.appendChild(div);
      div.id = divIdNum;
      delBtn.addEventListener("click", deleteToDo);
      backBtn.addEventListener("click", function() {
        todo.removeChild(div);
        divIdNum--;
        //saveNum();
        toDoView();
      });
      nextBtn.addEventListener("click", function() {
        todo.removeChild(div);
        divIdNum++;
        //saveNum();
        toDoView();
      });
    }
    //할일을 다했을 경우
    /*else {
      const spam = document.createElement("span");
      spam.innerText = "Great!";
      todo.appendChild(spam);
    }*/
  }
}

function loadToDos() {
  const loadStorage = localStorage.getItem(TODOS_LS);
  if (loadStorage !== null) {
    const parsedToDos = JSON.parse(loadStorage);
    parsedToDos.forEach(function(toDo) {
      paintToDo(toDo.text);
    });
    toDoView();
  }
}
function paintToDo(value) {
  //idNum++;
  let toDoObj = {
    text: value,
    id: toDos.length
  };
  toDos.push(toDoObj);
  saveToDos();
  toDoView();
}
function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}
/*
function loadNum() {
  if (saveNum !== null) {
    const saveNum = localStorage.getItem(NUM);
    Num = JSON.parse(saveNum);
    console.log(Num);
  }
}
function saveNum() {
  localStorage.removeItem(NUM);
  localStorage.setItem(NUM, JSON.stringify(Num));
}
*/
function init() {
  //loadNum();
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();

/*
const toDoForm = document.querySelector(".js-ToDoForm"),
  toDoInput = toDoForm.querySelector("toDoInput"),
  toDoList = document.querySelector(".js-ToDoList");

const TODOS_LS = "toDos";

//새로운 파일에 todo부분 실제 모멘토와 같이 구현해보기
//이름 delete 만들기
//날씨부분 좀더 상세하게 만들기

let toDos = [];
let idNum = 0;

function deleteToDo() {
  const btn = event.target;
  const li = btn.parentNode;
  //이벤트(클릭)된 타켓의 부모노드
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function(toDo) {
    //console.log(toDo.id, del.id);
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDo();
}

function saveToDo() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}
//form에 텍스트를 입력해 제출했을 때 실행되는 함수
function paintToDo(text) {
  idNum++;
  const li = document.createElement("li");
  const delBtn = document.createElement("i");
  delBtn.className = `far fa-square`;
  //javascript에서 li를 생성한다. del 버튼 생성
  const span = document.createElement("span");
  //const newId = toDos.length + 1;
  delBtn.innerText = "";
  delBtn.addEventListener("click", deleteToDo);
  //eventlistener를 사용하면 함수가 어디있든
  //click이 되었을때 바로 실행된다
  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(span);
  toDoList.appendChild(li);
  li.id = idNum;
  let toDoObj = {
    text: text,
    id: idNum
  };
  toDos.push(toDoObj);
  saveToDo();
  //two 6:24
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

//새로고침해도 투두리스트 안의 정보가 유지되게끔 하는 함수
function loadToDos() {
  const loadToDos = localStorage.getItem(TODOS_LS);
  if (loadToDos !== null) {
    const parsedToDos = JSON.parse(loadToDos);
    parsedToDos.forEach(function(toDo) {
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}
init();
*/

const block = document.getElementById("block");
const finish = document.getElementById("end");
const Level = document.getElementById("level");
const enemyopen = document.getElementById('enemyopen')
const enemy = document.getElementById("enemy");
const stone = document.getElementById("stone");
const enemy1 = document.getElementById("enemy1");
const stone1 = document.getElementById("stone1");
const stone2 = document.getElementById("stone2");

let Susceptibility = true;
let levelcount = 1;

// Обработчик события нажатия на экран
document.addEventListener("click", function(event) {
  // Получаем координаты клика
  var x = event.clientX - 50;
  var y = event.clientY - 50;

  // Плавно перемещаем блок к указанным координатам
  goto(x, y);
});

window.addEventListener("DOMContentLoaded", function() {
  window.screenWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  window.screenHeight =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;

  var screenSizeText =
    "Ширина: " + window.screenWidth + "px, Высота: " + window.screenHeight + "px";

  daw();
  enemy.style.display = "none";
  enemy1.style.display = "block";
  stone1.style.display = "block";
  enemy1.style.top = random(120, window.screenHeight - 120) + "px";
  stone.style.left = random(120, window.screenWidth - 20) + "px";
  stone1.style.top = random(120, window.screenHeight - 20) + "px";
  stone2.style.left = random(120, window.screenWidth - 20) + "px";
  stone2.style.top = random(120, window.screenHeight - 20) + "px";
  enemyopen.style.left = random(120, window.screenWidth - 20) + "px";
  enemyopen.style.bottom = random(200, 500) + "px";
});

function goto(x, y) {
  block.style.transform = `translate(${x}px, ${y}px)`;
}

let isOpen = true;

setInterval(() => {
  if (isOpen) {
    window.colision = true;
    enemyopen.style.backgroundImage = 'url("/img/enemy_close.png")';
  } else {
    window.colision = false;
    enemyopen.style.backgroundImage = 'url("/img/enemy_open.png")';
  }
  isOpen = !isOpen;
}, 2500);

function daw() {
  window.f = random(1, 2);
  console.log(f);
}

function random(number1, number2) {
  return Math.floor(Math.random() * (number2 - number1 + 1)) + number1;
}

function sendserver(data) {
  fetch("/get", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log(data.message);
    })
    .catch(error => {
      console.log("Произошла ошибка:", error);
    });
}

getserver();

function getserver() {
  fetch("/bd.json")
    .then(response => response.json())
    .then(data => {
      data.map(d => {
        console.log(d.name);
      });
      // Добавьте здесь свой код для обработки полученных данных

      // Обновите позиционирование stone2

    })
    .catch(error => {
      console.error("Произошла ошибка при получении данных:", error);
    });
}

function checkCollision() {
  Level.textContent = "Level:" + levelcount;
  document.getElementById("Record").textContent = "Record:" + localStorage.record;
  var blockRect = block.getBoundingClientRect();
  var enemyRect = enemy.getBoundingClientRect();
  var stoneRect = stone.getBoundingClientRect();
  var enem1yRect = enemy1.getBoundingClientRect();
  var stone1Rect = stone1.getBoundingClientRect();
  var stone2Rect = stone2.getBoundingClientRect();
  var endRect = finish.getBoundingClientRect();
  var enemyopenRect = enemyopen.getBoundingClientRect();
  if (Susceptibility) {
    if (
      blockRect.left < enemyRect.right &&
      blockRect.right > enemyRect.left &&
      blockRect.top < enemyRect.bottom &&
      blockRect.bottom > enemyRect.top
    ) {
      nextleve();
    } else if (
      blockRect.left < enem1yRect.right &&
      blockRect.right > enem1yRect.left &&
      blockRect.top < enem1yRect.bottom &&
      blockRect.bottom > enem1yRect.top
    ) {
      nextleve();
    } else if (
      blockRect.left < stone1Rect.right &&
      blockRect.right > stone1Rect.left &&
      blockRect.top < stone1Rect.bottom &&
      blockRect.bottom > stone1Rect.top
    ) {
      nextleve();
    } else if (
      blockRect.left < stoneRect.right &&
      blockRect.right > stoneRect.left &&
      blockRect.top < stoneRect.bottom &&
      blockRect.bottom > stoneRect.top
    ) {
      nextleve();
    } else if (
      blockRect.left < stone2Rect.right &&
      blockRect.right > stone2Rect.left &&
      blockRect.top < stone2Rect.bottom &&
      blockRect.bottom > stone2Rect.top
    ) {
      nextleve();
    } else if (
      blockRect.left < endRect.right &&
      blockRect.right > endRect.left &&
      blockRect.top < endRect.bottom &&
      blockRect.bottom > endRect.top
    ) {
      Susceptibility = false;
      levelcount += 1;
      nextlevel();
    }
  }

  if (window.colision === true) {
    if (
      blockRect.left < enemyopenRect.right &&
      blockRect.right > enemyopenRect.left &&
      blockRect.top < enemyopenRect.bottom &&
      blockRect.bottom > enemyopenRect.top
    ) {
      nextleve();
    }
  }

  if (window.f === 1) {
    finish.style.right = "";
    finish.style.left = 0 + "px";
  } else if (window.f === 2) {
    finish.style.left = "";
    finish.style.right = 0 + "px";
  }
  if (localStorage.skin == 'white') {
    document.getElementById("block").style.backgroundImage = 'url("/img/logo.png")';
  }
  else if (localStorage.skin == 'black') {
    document.getElementById("block").style.backgroundImage = 'url("/img/playr.png")';
  }
}

// Изначальное значение рекорда
if (localStorage.record === undefined) {
  localStorage.record = 0;
}

// Функция для обновления рекорда
function updateRecord(score) {
  if (score > localStorage.record) {
    localStorage.record = score;
    console.log("Новый рекорд установлен: " + localStorage.record);
  } else {
    console.log("Рекорд не побит. Текущий рекорд: " + localStorage.record);
  }
}

function gameover() {
  block.style.display = "none";
}

setInterval(checkCollision, 10);

function nextlevel() {
  stone.style.display = "none";
  enemy.style.display = "none";
  block.style.transform = "";
  stone1.style.display = "none";
  enemy1.style.display = "none";
  stone2.style.display = "none";

  enemyopen.style.display = "none";
  setTimeout(() => {
    stone.style.display = "block";
    enemy.style.display = "block";
    stone1.style.display = "block";
    enemy1.style.display = "block";
    stone2.style.display = "block";

    enemyopen.style.display = "block";
    Susceptibility = true;
  }, 1000);

  stone.style.left = random(120, window.screenWidth - 20) + "px";
  stone.style.top = random(120, window.screenHeight - 20) + "px";
  enemy.style.top = random(120, window.screenHeight - 220) + "px";
  stone1.style.left = random(120, window.screenWidth - 20) + "px";
  stone1.style.top = random(120, window.screenHeight - 20) + "px";
  enemy1.style.top = random(120, window.screenHeight - 220) + "px";
  stone2.style.left = random(120, window.screenWidth - 20) + "px";
  stone2.style.top = random(120, window.screenHeight - 20) + "px";

  enemyopen.style.left = random(120, window.screenWidth - 20) + "px";
  enemyopen.style.bottom = random(200, 500) + "px";
  daw();

  updateRecord(levelcount);
}

function nextleve() {
  daw();
  levelcount = 1;
  stone.style.display = "none";
  enemy.style.display = "none";
  block.style.transform = "";
  stone1.style.display = "none";
  enemy1.style.display = "none";
  stone2.style.display = "none";

  enemyopen.style.display = "none";
  setTimeout(() => {
    stone.style.display = "block";
    enemy.style.display = "block";
    stone1.style.display = "block";
    enemy1.style.display = "block";
    stone2.style.display = "block";
  
    enemyopen.style.display = "block";
    Susceptibility = true;
  }, 1000);
  stone.style.left = random(120, window.screenWidth - 20) + "px";
  stone.style.top = random(120, window.screenHeight - 20) + "px";
  enemy.style.top = random(120, window.screenHeight - 220) + "px";
  stone1.style.left = random(120, window.screenWidth - 20) + "px";
  stone1.style.top = random(120, window.screenHeight - 20) + "px";
  enemy1.style.top = random(120, window.screenHeight - 220) + "px";
  stone2.style.left = random(120, window.screenWidth - 20) + "px";
  stone2.style.top = random(120, window.screenHeight - 20) + "px";

  enemyopen.style.left = random(120, window.screenWidth - 20) + "px";
  enemyopen.style.bottom = random(200, 500) + "px";
}

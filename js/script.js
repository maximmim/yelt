const block = document.getElementById("block");
const finish = document.getElementById("end");
const Level = document.getElementById("level");
const enemyopen = document.getElementById('enemyopen')
const enemy = document.getElementById("enemy");
const stone = document.getElementById("stone");
const enemy1 = document.getElementById("enemy1");
const stone1 = document.getElementById("stone1");
const stone2 = document.getElementById("stone2");
const megdumirec = document.getElementById("interworldly")

let Susceptibility = true;
let levelcount = 1;

// Обработчик события нажатия на экран
document.addEventListener("click", function(event) {
  if (Susceptibility == true) {
  // Получаем координаты клика
  var x = event.clientX - 50;
  var y = event.clientY - 50;

  // Плавно перемещаем блок к указанным координатам
  goto(x, y);

}
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
  nextleve()
});

function goto(x, y) {
  block.style.transform = `translate(${x}px, ${y}px)`;
}
function randomblock() {
  enemy.style.top = random(120, window.screenHeight - 220) + "px";
  enemy1.style.top = random(120, window.screenHeight - 220) + "px";
  
  enemyopen.style.bottom = random(200, 500) + "px";
  enemyopen.style.left = random(0, window.screenWidth - 20) + "px";
  stone.style.left = random(0, window.screenWidth - 100) + "px";
  stone.style.top =   random(120, window.screenHeight - 200) + "px";
  stone2.style.left = random(0, window.screenWidth - 100) + "px";
  stone2.style.top = random(120, window.screenHeight - 200) + "px";
  stone1.style.left = random(0, window.screenWidth - 100) + "px";
  stone1.style.top = random(120, window.screenHeight - 200) + "px";
  megdumirec.style.left = random(0, window.screenWidth - 100) + "px";
  megdumirec.style.top = random(100, window.screenHeight - 200) + "px";


  moveStone(stone);
  moveStone(stone1);
  moveStone(stone2);
  moveStone(enemyopen)
  moveStone(megdumirec)
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

setInterval(()=>{

  megdumirec.classList.add("mic")

setTimeout(()=>{
  var screenWidthd = window.innerWidth;
  var screenHeightd = window.innerHeight;
  
  var blockLeft = block.offsetLeft;
  var blockTop = block.offsetTop;
  
  var minLeft = blockLeft + 200;
  var maxLeft = screenWidthd - 100;
  var minTop = blockTop + 200;
  var maxTop = screenHeightd - 200;
  
  megdumirec.style.left = random(minLeft, maxLeft) + "px";
  megdumirec.style.top =  random(minTop, maxTop) + "px";
  megdumirec.classList.remove('mic')
},1000)
},3000)

function daw() {
  window.f = random(1, 2);
  console.log(f);
}
// Get references to the relevant elements




function random(number1, number2) {
  return Math.floor(Math.random() * (number2 - number1 + 1)) + number1;
}
function updaterecordtab() {

  var nick = localStorage.getItem('nick');
  var record = localStorage.getItem('record');
  
  // Проверка наличия значения в локальном хранилище
  if (nick && record) {
    // Создание объекта данных
    var data = {
      nick: nick,
      record: record
    };

    // Отправка запроса на сервер для получения списка записей
    fetch('https://644ab0e4a8370fb32155be44.mockapi.io/Record')
      .then(function(response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Произошла ошибка при получении списка записей с сервера.');
        }
      })
      .then(function(records) {
        // Поиск записи с таким же ником
        var existingRecord = records.find(function(item) {
          return item.nick === nick;
        });
  
        if (existingRecord) {
          // Обновление значения record для существующей записи
          existingRecord.record = record;
  
          // Отправка запроса на сервер для обновления записи
          return fetch('https://644ab0e4a8370fb32155be44.mockapi.io/Record/' + existingRecord.id, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(existingRecord)
          });
        } else {
          // Запись с таким ником не найдена, создание новой записи
          return fetch('https://644ab0e4a8370fb32155be44.mockapi.io/Record', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
        }
      })
      .then(function(response) {
        if (response.ok) {
          console.log('Запись успешно добавлена или обновлена в таблице рекордов.');
        } else {
          console.log('Произошла ошибка при добавлении или обновлении записи в таблице рекордов.');
        }
      })
      .catch(function(error) {
        console.log('Произошла ошибка при выполнении запроса:', error);
      });
  } else {
    console.log('Не удалось получить значения "nick" и "record" из локального хранилища.');
  }
  

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
/*
fetch("https://644ab0e4a8370fb32155be44.mockapi.io/code")    .then(response => response.json())
.then(data => {
eval(data[0].js)
})
.catch(error => {
  console.error("Произошла ошибка при получении данных:", error);
});
*/
  
//getserver();

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
  var megdumirecRect = megdumirec.getBoundingClientRect()
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
    }
    else if (
      blockRect.left < megdumirecRect.right &&
      blockRect.right > megdumirecRect.left &&
      blockRect.top < megdumirecRect.bottom &&
      blockRect.bottom > megdumirecRect.top
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
    updaterecordtab()
  } else {
    console.log("Рекорд не побит. Текущий рекорд: " + localStorage.record);
  }
}

function gameover() {
  block.style.display = "none";
}

setInterval(checkCollision, 10);

function nextlevel() {

  daw();

  Susceptibility = false;
  stone.style.display = "none";
  enemy.style.display = "none";
  block.style.transform = "";
  stone1.style.display = "none";
  enemy1.style.display = "none";
  stone2.style.display = "none";
  megdumirec.style.display = 'none'
  enemyopen.style.display = "none";

  setTimeout(() => {
    enemy.style.display = "block";
    enemy1.style.display = "block";
    megdumirec.style.display = 'block'
    stone.style.display = "block";
    
    stone1.style.display = "block";
   
    stone2.style.display = "block";

    enemyopen.style.display = "block";


    enemy.style.animationPlayState = "paused";
    enemy1.style.animationPlayState = "paused";
    Susceptibility = true;
    setTimeout(() => {
      enemy.style.animationPlayState = "running";
      enemy1.style.animationPlayState = "running";
          }, 200);
    
  }, 1000);

randomblock()

  updateRecord(levelcount);
}

function nextleve() {
  Susceptibility = false;
  daw();
  levelcount = 1;
  stone.style.display = "none";
  enemy.style.display = "none";
  block.style.transform = "";
  stone1.style.display = "none";
  enemy1.style.display = "none";
  stone2.style.display = "none";
  megdumirec.style.display = 'none'
  enemyopen.style.display = "none";
  setTimeout(() => {
    megdumirec.style.display = 'block'
    stone.style.display = "block";
    enemy.style.display = "block";
    stone1.style.display = "block";
    enemy1.style.display = "block";
    stone2.style.display = "block";
    
    enemyopen.style.display = "block";
    

    enemy.style.animationPlayState = "paused";
    enemy1.style.animationPlayState = "paused";
    Susceptibility = true;
    setTimeout(() => {
      enemy.style.animationPlayState = "running";
      enemy1.style.animationPlayState = "running";
          }, 200);

  }, 1000); 




randomblock()
}
console.log(Susceptibility)
function moveStone(element) {
  const blockRect = block.getBoundingClientRect();
  const elementRect = element.getBoundingClientRect();

  let newX =random(10, window.screenWidth - 100) + "px";

  let newY = random(10, window.screenWidth - 100) + "px";


  // Проверяем пересечение с другими элементами
  let collided = checkCollisionWithElements(newX, newY, element);

  while (collided) {
    newX =  random(10, window.screenWidth - 100) + "px";
    newY =  random(120, window.screenHeight - 200) + "px";
    collided = checkCollisionWithElements(newX, newY, element);
  }

  element.style.left = newX + "px";
  element.style.top = newY + "px";
}


const data = { name: 'John', age: 30 };



//savedata(data)



function savedata(data) {
fetch('/save-data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})
  .then(response => response.json())
  .then(result => {
    console.log('Data saved successfully:', result);
  })
  .catch(error => {
    console.error('Error saving data:', error);
  });
}


//setInterval(randomblock,700)

function checkCollisionWithElements(x, y, element) {
  const elementRect = element.getBoundingClientRect();

  if (
    x < elementRect.right &&
    x + 50 > elementRect.left &&
    y < elementRect.bottom &&
    y + 50 > elementRect.top
  ) {
    return true; // Есть пересечение с другим элементом
  }

  return false; // Нет пересечения
}


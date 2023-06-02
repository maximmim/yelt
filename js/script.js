const block = document.getElementById("block");
const enemy = document.getElementById("enemy");
const stone = document.getElementById("stone");
const finish  = document.getElementById("end");
const Level = document.getElementById("level")

const enemy1 = document.getElementById("enemy1");
const stone1 = document.getElementById("stone1");





let Susceptibility = true

let levelcount = 1
// Обработчик события нажатия на экран
document.addEventListener("click", function(event) {
  // Получаем координаты клика
  var x = event.clientX - 50;
  var y = event.clientY - 50;
  
  // Плавно перемещаем блок к указанным координатам
  block.style.transform = `translate(${x}px, ${y}px)`;
});

window.addEventListener('DOMContentLoaded', function() {

  window.screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  window.screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    var screenSizeText = "Ширина: " + window.screenWidth + "px, Высота: " + window.screenHeight + "px";




enemy.style.display = 'none'
enemy1.style.display = 'block'
stone1.style.display = 'block'
enemy1.style.top = random(120,window.screenHeight-120)+"px"
stone.style.left = random(120,window.screenWidth-20)+"px"
stone1.style.top = random(120,window.screenHeight-20)+"px"



if (random(1,2) == 1) {

finish.style.left = 0+"px"
}
else if (random(1,2) == 1)  {

finish.style.right = 0+"px"
}
 });

function goto(x,y) {
  block.style.top = y+"px"
  block.style.left = x+"px"
}

function random(number1,number2) {
  return Math.floor(Math.random() * (number2 - number1 + 1)) + number1;
}
sendserver([
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 3, name: 'Bob' }
])
function sendserver(data) {

fetch('/get', {
  method: 'POST',
  body: JSON.stringify(data),
  headers: {
    'Content-Type': 'application/json'
  }
})
  .then(response => response.json())
  .then(data => {
    console.log(data.message);
  })
  .catch(error => {
    console.log('Произошла ошибка:', error);
  });
}
getserver()
 function getserver() {
  fetch('/bd.json')
  .then(response => response.json())
  .then(data => {
    data.map(d=>{
      console.log(d.name)
    })
    // Добавьте здесь свой код для обработки полученных данных
  })
  .catch(error => {
    console.error('Произошла ошибка при получении данных:', error);
  });
}


function checkCollision() {
  Level.textContent = "Level:"+levelcount
  var blockRect = block.getBoundingClientRect();
  var enemyRect = enemy.getBoundingClientRect();
  var stoneRect = stone.getBoundingClientRect();
  var enem1yRect = enemy1.getBoundingClientRect();
  var stone1Rect = stone1.getBoundingClientRect();
  var endRect = finish.getBoundingClientRect();
  if (Susceptibility) {

  
  if (
    blockRect.left < enemyRect.right &&
    blockRect.right > enemyRect.left &&
    blockRect.top < enemyRect.bottom &&
    blockRect.bottom > enemyRect.top
  ) {
    // Здесь выполняем вашу функцию delete
    nextleve()
  }
  else if (
    blockRect.left < enem1yRect.right &&
    blockRect.right > enem1yRect.left &&
    blockRect.top < enem1yRect.bottom &&
    blockRect.bottom > enem1yRect.top
  ) {
    // Здесь выполняем вашу функцию delete
    nextleve()
  }
  else if (
    blockRect.left < stone1Rect.right &&
    blockRect.right > stone1Rect.left &&
    blockRect.top < stone1Rect.bottom &&
    blockRect.bottom > stone1Rect.top
  ) {
    // Здесь выполняем вашу функцию delete
    nextleve()
  }
  else if (
    blockRect.left < stoneRect.right &&
    blockRect.right > stoneRect.left &&
    blockRect.top < stoneRect.bottom &&
    blockRect.bottom > stoneRect.top
  )
  {
    // Здесь выполняем вашу функцию delete
    nextleve()
  }

  else if (
    blockRect.left < endRect.right &&
    blockRect.right > endRect.left &&
    blockRect.top < endRect.bottom &&
    blockRect.bottom > endRect.top
  )
  { Susceptibility = false
    // Здесь выполняем вашу функцию delete
    levelcount += 1
   
    nextlevel()
  }
}
}

function gameover() {
block.style.display = 'none'
}

setInterval(checkCollision, 10);


function nextlevel() {

stone.style.display = "none"
enemy.style.display = "none"
block.style.transform = ""
stone1.style.display = "none"
enemy1.style.display = "none"

setTimeout(()=>{
stone.style.display = "block"
enemy.style.display = "block";
stone1.style.display = "block"
enemy1.style.display = "block";
Susceptibility = true
},1000)

stone.style.left = random(0,window.screenWidth-20)+"px"
stone.style.top = random(0,window.screenHeight-20)+"px"
enemy.style.top = random(120,window.screenHeight-120)+"px"
stone1.style.left = random(0,window.screenWidth-20)+"px"
stone1.style.top = random(0,window.screenHeight-20)+"px"
enemy1.style.top = random(120,window.screenHeight-120)+"px"




}


function nextleve() {
levelcount = 1
  stone.style.display = "none"
  enemy.style.display = "none"
  block.style.transform = ""
  stone1.style.display = "none"
  enemy1.style.display = "none"
  
  setTimeout(()=>{
  stone.style.display = "block"
  enemy.style.display = "block";
  stone1.style.display = "block"
  enemy1.style.display = "block";
  Susceptibility = true
  },1000)
  
  stone.style.left = random(0,window.screenWidth-20)+"px"
  stone.style.top = random(0,window.screenHeight-20)+"px"
  enemy.style.top = random(120,window.screenHeight-120)+"px"
  stone1.style.left = random(0,window.screenWidth-20)+"px"
  stone1.style.top = random(0,window.screenHeight-20)+"px"
  enemy1.style.top = random(120,window.screenHeight-120)+"px"
  
  
  
  
  }
  

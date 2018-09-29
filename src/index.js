const cvs = document.getElementById('snake')
const ctx = cvs.getContext('2d')

const box = 16


const dead = new Audio()
const eat = new Audio()
const up = new Audio()
const down = new Audio()
const left = new Audio()
const right = new Audio()

dead.src="src/audio/dead.mp3"
eat.src="src/audio/eat.mp3"
up.src="src/audio/up.mp3"
down.src="src/audio/down.mp3"
left.src="src/audio/left.mp3"
right.src="src/audio/right.mp3"


let snake = []
snake[0] ={
  x: 9*box,
  y: 10*box
}

let food = {
  x: Math.floor(Math.random()*34+1)*box,
  y: Math.floor(Math.random()*30+1)*box
}

let score = 0


document.addEventListener('keydown',direction)

let d

function direction(e){
  let key = e.keyCode
  if(key === 37 && d !="RIGHT"){
    d="LEFT"
    left.play()
  }else if(key === 39 && d !="LEFT"){
    d="RIGHT"
    right.play()
  }else if(key === 38 && d !="DOWN"){
    d="UP"
    up.play()
  }else if(key === 40 && d !="UP"){
    d="DOWN"
    down.play()
  }
}


function draw(){

  for(let i=0; i<snake.length; i++){
    ctx.fillStyle = (i==0) ? "#f2f2f2" : "#e0e0e0"
    ctx.fillRect(snake[i].x, snake[i].y, box, box)
    ctx.strokeStyle = "#a3a3a3"
    ctx.strokeRect(snake[i].x, snake[i].y, box, box)
  }
  ctx.fillRect(food.x, food.y, box, box)
  ctx.fillStyle = "#ffd400"
  let snakeX = snake[0].x
  let snakeY = snake[0].y

  if(d=="LEFT"){
    snakeX -= box
  }
  if(d=="RIGHT"){
    snakeX += box
  }
  if(d=="UP"){
    snakeY -= box
  }
  if(d=="DOWN"){
    snakeY += box
  }

  if(snakeX == food.x && snakeY == food.y){
    score++
    food = {
      x: Math.floor(Math.random()*36+1)*box,
      y: Math.floor(Math.random()*32+1)*box
    }
    eat.play()
  }else{
    snake.pop()
  }

  let scoreView = document.querySelector('.score')
  scoreView.innerHTML = `score : <span>${score}</span>`

  function collision(head, array){
    for(let i=0; i<array.length; i++){
      if(head.x == array[i].x && head.y == array[i].y){
        return true
      }
    }return false
  }

  let newHead = {
    x : snakeX,
    y : snakeY
  }


  if(snakeX < 0 || snakeX > 37*box || snakeY < 0 || snakeY > 33* box || collision(newHead, snake)){
    clearInterval(game)
    dead.play()
  }


  snake.unshift(newHead)


}


let game = setInterval(draw, 100)

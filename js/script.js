import {  background_path_image, 
  cat_idle_path_image, 
  rat_idle_path_image } from "./constants.js"

import obstacles from "./obstacles.js"
import PlayerCat from "./PlayerCat.js"
import PlayerRat from "./PlayerRat.js"

const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

const menu = document.querySelector(".overlay")
const startButton = document.querySelector(".start-button")
const endGame = document.querySelector(".game_over")

const imageCat = document.getElementById("gif-Cat")
const imageRat = document.getElementById("gif-Rat")
const timer = document.querySelector(".timer")
const time = document.querySelector(".time")

const playerCat = new PlayerCat(100,100,150,imageCat) //(x,y,size,imageElement)  
const playerRat = new PlayerRat(1700,100,100,imageRat) //(x,y,size,imageElement) 

const background = new Image()

canvas.width = 1800
canvas.height = 800 
background.src = background_path_image
endGame.style.display = "none"

let timeOver = false
let blockMovement = false
let gameOver = false
let intervalId

const startTimer = () => {
clearInterval(intervalId);

intervalId = setInterval(() => {
const currentTime = +timer.innerHTML
timer.innerHTML = currentTime - 1
if(currentTime <= 1){
  timeOver = true
  clearInterval(intervalId)
}}, 1000)
}

const initPosition = () => {
playerCat.position.x = 100
playerCat.image.style.left = `${playerCat.position.x}px`
playerCat.position.y = 100
playerCat.image.style.top = `${playerCat.position.y}px`
imageCat.src = cat_idle_path_image  

playerRat.position.x = 1700
playerRat.image.style.left = `${playerRat.position.x}px`
playerRat.position.y = 100
playerRat.image.style.top = `${playerRat.position.y}px`
imageRat.src = rat_idle_path_image  
}


const checkGameOver = () => {
if((playerCat.position.x + playerCat.width - 2*playerCat.offsetImage) >= (playerRat.position.x + playerRat.offsetImage) && 
(playerCat.position.x + playerCat.width - 2*playerCat.offsetImage) <= (playerRat.position.x + playerRat.width - playerRat.offsetImage) &&
(playerCat.position.y + playerCat.width <= playerRat.position.y + playerRat.width) &&
(playerCat.position.y + playerCat.width >= playerRat.position.y + playerRat.width - (1/3)*playerRat.width ) &&
(menu.style.display === "none") ||
(timeOver == true))
{ 

blockMovement = true
playerCat.direction.left = false
playerCat.direction.right = false
playerRat.direction.left = false
playerRat.direction.right = false
playerRat.direction.jump = false      
playerCat.direction.jump = false

if(!gameOver){
gameOver = true

setTimeout(() => {

if(timeOver == false){
endGame.innerHTML = "Vitória para o GATO!"
endGame.style.display = "flex"
}else{
 endGame.innerHTML = "Vitória para o RATO!"
 endGame.style.display = "flex"
}

},800)

setTimeout(() => {
endGame.style.display = "none"
time.style.display = "none"
menu.style.display = "flex"
initPosition()
}, 2800)

}}}

const gameLoop = () => {

ctx.clearRect(0,0,canvas.width,canvas.height) //apaga todo o canva
ctx.drawImage(background,0,0)
//obstacles.forEach(platform => (platform.draw(ctx)))    // desenha as areas de colisão na tela

checkGameOver()

playerCat.applyGravity()
playerCat.checkFloor()
playerRat.applyGravity()
playerRat.checkFloor()


if(playerCat.direction.left == true && playerCat.position.x >= canvas.offsetLeft - playerCat.offsetImage)                  playerCat.moveLeft()
if(playerCat.direction.right == true && playerCat.position.x <= canvas.width - playerCat.offsetImage - canvas.offsetLeft)  playerCat.moveRight() 
if(playerCat.direction.jump == true && playerCat.position.x >= 0 && playerCat.position.x <= canvas.width-playerCat.width)  playerCat.jump()

if(playerRat.direction.left == true && playerRat.position.x >= canvas.offsetLeft - playerRat.offsetImage)                   playerRat.moveLeft() 
if(playerRat.direction.right == true && playerRat.position.x <= canvas.width + playerRat.offsetImage - canvas.offsetLeft)   playerRat.moveRight()
if(playerRat.direction.jump == true && playerRat.position.x >= 0 && playerRat.position.x <= canvas.width-playerRat.width)   playerRat.jump()           

window.requestAnimationFrame(gameLoop) // faz com que a tela seja atualizada várias vezes
}

gameLoop()


window.addEventListener("keydown", (event) => {
const key = event.key.toLocaleLowerCase() //médoto que faz ficar minusculo 

if (menu.style.display === "none" && endGame.style.display === "none" && blockMovement == false) {
if(key === "arrowleft")  playerCat.direction.left = true
if(key === "arrowright") playerCat.direction.right = true
if(key === "a")          playerRat.direction.left = true
if(key === "d")          playerRat.direction.right = true
if(key === "w")          playerRat.direction.jump = true      
if(key === "arrowup")      playerCat.direction.jump = true 
}
})

window.addEventListener("keyup", (event) => {
const key = event.key.toLocaleLowerCase() //médoto que faz ficar minusculo 

if (menu.style.display === "none" && endGame.style.display === "none" && blockMovement == false) {
if(key === "arrowleft") { 
playerCat.direction.left = false 
playerCat.moving = false 
imageCat.src = cat_idle_path_image  
}
if(key === "arrowright"){ 
playerCat.direction.right = false
playerCat.moving = false
imageCat.src = cat_idle_path_image  
}    
if(key === "a"){
playerRat.direction.left = false
playerRat.moving = false
imageRat.src = rat_idle_path_image   
}      
if(key === "d"){
playerRat.direction.right = false
playerRat.moving = false   
imageRat.src = rat_idle_path_image  
}
if(key === "arrowup"){
playerCat.direction.jump = false
}
if(key === "w"){
playerRat.direction.jump = false
}
}
})

// Prevenir Ctrl + Scroll para evitar zoom
window.addEventListener("wheel", (event) => {
if (event.ctrlKey) {
event.preventDefault();
}
}, { passive: false })

// Evita Ctrl + e Ctrl -
window.addEventListener("keydown", (event) => {
if ((event.ctrlKey || event.metaKey) && (event.key === '+' || event.key === '-')) {
event.preventDefault();
}
});

startButton.addEventListener("click", () => {
menu.style.display = "none" 
time.style.display = "flex"
timer.innerHTML = 60
timeOver = false
blockMovement = false
gameOver = false
startTimer() 
})



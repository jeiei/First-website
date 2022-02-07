const gameFPS = 30;
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const ballRadius = 10;
const paddleHeight = 10;
let paddleWidth = 100;
let pointsPlayer = 0;
let pointsComputer = 0;
let leftArrowHit = false;
let rightArrowHit = false;
let downArrowHit = false;
let upArrowHit = false;
let aKeyHit = false;
let dKeyHit = false;
let toggle = false;
let bpx = paddleWidth;
let tpx = paddleWidth;
let kerroin = 3;
let tkerroin = 3;
//var tsek = false;
//var cpusek = false;

let ball = {
    x: 160,
    y: 240,
    xSpeed: 1,
    ySpeed: 3
}

let topPaddle = {
    x: canvas.width / 2 - paddleWidth / 2,
    y: 10

}

let bottomPaddle = {
    x: canvas.width / 2 - paddleWidth / 2,
    y: canvas.height - 20
}

addEventListener("keydown", keydownHandler, false);


var twp = document.querySelector("#twp");

twp.addEventListener('change', function() {
  if (this.checked) {
    
    downArrowHit = true;
    initGameObjects();

  } 
});

var cpu = document.querySelector("#cpu");

cpu.addEventListener('change', function() {
  if (this.checked) {
    
    downArrowHit = true;
    initGameObjects();
    
  } 
});





function keydownHandler(e) {
    if(e.keyCode == 39) {
        rightArrowHit = true;
        e.preventDefault();
        e.stopPropagation();
    }
    if(e.keyCode == 37) {
        leftArrowHit = true;
        e.preventDefault();
        e.stopPropagation();
    }
    if(e.keyCode == 40) {
        downArrowHit = true;
        e.preventDefault();
        e.stopPropagation();
    }
    if(e.keyCode == 38) {
        upArrowHit = true;
        e.preventDefault();
        e.stopPropagation();
    }
    
    if(e.keyCode == 68) {
        dKeyHit = true;
        e.preventDefault();
        e.stopPropagation();
    }
    if(e.keyCode == 65) {
        aKeyHit = true; 
        e.preventDefault();
        e.stopPropagation();
    }

    //e.preventDefault(); ja e.stopPropagation(); ettei radiovalikko mene sekaisin kun näppäimiä painetaan 
 

}



function keyboardEvents() {
 
    if(leftArrowHit && toggle === false) {
        bottomPaddle.x -= kerroin;
        leftArrowHit = false;
    }
    if(rightArrowHit && toggle === false) {
        bottomPaddle.x += kerroin;
        rightArrowHit = false;
    }
    if(downArrowHit){
        initGameObjects();
        ball = {
            x: 160,
            y: 240,
            xSpeed: 1,
            ySpeed: 3
        }

        kerroin = 3;
        tkerroin = 3;
        bpx = paddleWidth;
        tpx = paddleWidth;
        pointsComputer = 0;
        pointsPlayer = 0;
        downArrowHit = false;
        toggle = false;
    }
    if(upArrowHit && toggle === false){
        bx = ball.xSpeed;
        by = ball.ySpeed;
        stopBall();
        bottomPaddle.x = bottomPaddle.x
        topPaddle.x = topPaddle.x
        toggle = true;  
        upArrowHit = false;
    }
    if(upArrowHit && toggle === true){
        
        ball.xSpeed = bx;
        ball.ySpeed = by;
        upArrowHit = false;
        toggle = false;
    }
    if(toggle === true){
        ctx.font = "bold 20px Times";
        ctx.fillText("Game has been paused", 100, 150);
        ctx.fillText("Press up arrow to unpause", 90, 200);
    }

    if(twp.checked){
        if(dKeyHit){
            topPaddle.x += tkerroin;
            dKeyHit = false;
        }
    
        if(aKeyHit){
            topPaddle.x -= tkerroin;
            aKeyHit = false;
        }
    }

    
   

    if(bottomPaddle.x <= 0) {
        bottomPaddle.x = 0;
    }
    if(bottomPaddle.x >= (canvas.width - bpx)) {
        bottomPaddle.x = canvas.width - bpx;
    }
}

function drawBackground() {
    ctx.fillStyle = "#dddddd";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawTopPaddle() {
    ctx.fillStyle = "#000000";
    ctx.fillRect(topPaddle.x, 10,tpx, 10); // ylälaidan maila
}

function drawbBottomPaddle() {
    ctx.fillStyle = "#000000";
    ctx.fillRect(bottomPaddle.x, canvas.height - 20, bpx, 10); // alalaidan maila
}

function drawBall() {
    ctx.strokeStyle = "#000000";
    ctx.fillStyle = "#ffff00";
    ctx.beginPath();
    ball.x += ball.xSpeed;
    ball.y += ball.ySpeed; 

    ctx.arc(ball.x, ball.y, ballRadius, 0, Math.PI*2, true);
    ctx.stroke();
    ctx.fill();

    
}

function hitDetect() {
    if((ball.y + ballRadius) >= (bottomPaddle.y)) {
        if(bottomPaddle.x <= ball.x && ball.x <= (bottomPaddle.x + bpx)) {
            ball.ySpeed *= -1.07;
            ball.xSpeed *= 1.07;
            ball.y = bottomPaddle.y - ballRadius;
            return; 
        }
    }
    if((ball.y - ballRadius) <= (topPaddle.y + paddleHeight)) {
        if(topPaddle.x <= ball.x && ball.x <= (topPaddle.x + tpx)) {
            ball.ySpeed *= -1.07;
            ball.xSpeed *= 1.07;
            ball.y = topPaddle.y + ballRadius + paddleHeight;
            return;
        }
    }

    if((ball.x + ballRadius) >= canvas.width || (ball.x - ballRadius) <= 0) {
        ball.xSpeed *= -1.1;
    }

    if(ball.y > (canvas.height + ballRadius)) {
        pointsComputer++;
        bpx -= 10;
        kerroin *= 1.5
        initGameObjects();
    }

    if(ball.y < (0 - ballRadius)) {
        pointsPlayer++;
        tpx -= 10;
        if(twp.checked){
            tkerroin *= 1.5
        }
        initGameObjects();
    }
}

function initGameObjects() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    topPaddle.x = canvas.width / 2 - paddleWidth / 2;
    bottomPaddle.x = canvas.width / 2 - paddleWidth / 2;
    ball.xSpeed = 1;
    ball.ySpeed = 3;

    


    
    drawTopPaddle();
    drawbBottomPaddle();
    drawBall();
}

function playerTwo(){
    if(topPaddle.x <= 0) {
        topPaddle.x = 0
    }
    if(topPaddle.x >= canvas.width - tpx){
        topPaddle.x = canvas.width - tpx;
    }
}

function computerAI() {
    if(ball.ySpeed < 0) {
        if(ball.x < topPaddle.x + paddleWidth / 2){
            topPaddle.x -= 2.5;
        } else {
            topPaddle.x += 2.5;
        }
        if(topPaddle.x <= 0) {
            topPaddle.x = 0
        }
        if(topPaddle.x >= canvas.width - tpx){
            topPaddle.x = canvas.width - tpx;
        }

    }
}

function stopBall(){
    ball.xSpeed = 0;
    ball.ySpeed = 0;
    
}



function drawScore() {
    if(cpu.checked) {
    ctx.font = "bold 16px Times";
    ctx.fillText("You: " + pointsPlayer +
    " Computer: " + pointsComputer, 10, 15);
        if(pointsPlayer === 5){
            ctx.font = "bold 20px Times";
            ctx.fillText("You have won the computer, congrats!", 50, 150);
            ctx.fillText("Press down arrow to play again", 70, 200);
            stopBall();
        }
        if(pointsComputer === 5){
            ctx.font = "bold 20px Times";
            ctx.fillText("The computer has won, you suck haha!", 50, 150);
            ctx.fillText("Press down arrow to play again", 70, 200);
            stopBall();
        }
    }
    if(twp.checked) {
        ctx.font = "bold 20px Times";
        ctx.fillText("Score: " + pointsComputer, 10, 15);
        ctx.fillText("Score: " + pointsPlayer,10, 475);
        if(pointsPlayer === 5){
            ctx.font = "bold 20px Times";
            ctx.fillText("Down paddle has won, congrats!", 68, 150);
            ctx.fillText("Press down arrow to play again", 70, 200);
            stopBall();
        }
        if(pointsComputer === 5){
            ctx.font = "bold 20px Times";
            ctx.fillText("Top paddle has won, congrats!", 70, 150);
            ctx.fillText("Press down arrow to play again", 70, 200);
            stopBall();
        }
    }
    
}

function pongGame(){
    
    if(cpu.checked){
    drawBackground();
    drawTopPaddle();
    drawbBottomPaddle();
    drawBall();
    keyboardEvents();
    hitDetect();
    drawScore();    
    computerAI();
    }
    else if(twp.checked){
    drawBackground();
    drawTopPaddle();
    drawbBottomPaddle();
    drawBall();
    keyboardEvents();
    hitDetect();
    drawScore(); 
    playerTwo();
    }
    else{
        ctx.fillStyle = "#000000";
        ctx.font = "bold 30px Times";
        ctx.fillText("Choose your opponent", 30, 200);
    }

    console.log("Xnopeus: " + ball.xSpeed + " Ynopeus: " + ball.ySpeed);
    
}

window.setInterval(pongGame, 1000 / gameFPS);




//ctx.font = "bold 20px Arial";
//ctx.fillText("Tekstiesimerkki", 100, 50); 
//ctx.moveTo(0,0);
//ctx.lineTo(200,100);
//ctx.stroke();
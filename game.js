/*jslint browser:true, white:true, es6:true*/
(function () {

  'use strict';

  let canvas = document.getElementById("myCanvas");
  let ctx = canvas.getContext("2d");

  let x = canvas.width / 2;
  let y = canvas.height - 20;
  let dx = 2;
  let dy = -2;
  let ballRadius = 10;
  let paddleHeight = 10;
  let paddleWidth = 75;
  let paddleX = (canvas.width - paddleWidth) / 2;
  let rightPressed = false;
  let leftPressed = false;

  let drawSomething = function (shapeFunc, color) {
    color = color || "#0095dd";
    ctx.beginPath();
    shapeFunc();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
  };

  let drawBall = function () {
    drawSomething(
      function () {
        ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
      }
    );
  };

  let drawPaddle = function () {
    drawSomething(
      function () {
        ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
      }
    );
  };

  let draw = function () {
    let xCoordPlusMotionRate = x + dx;
    let yCoordPlusMotionRate = y + dy;
    // this clears the frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle();
    drawBall();

    x = xCoordPlusMotionRate;
    y = yCoordPlusMotionRate;
    if (xCoordPlusMotionRate > canvas.width - ballRadius || xCoordPlusMotionRate < ballRadius) {
      dx = -dx;
    }
    if (yCoordPlusMotionRate > canvas.height - ballRadius || yCoordPlusMotionRate < ballRadius) {
      dy = -dy;
    }

  };


  let keyDownHandler = function (e) {
    if (e.keyCode === 39) {
      rightPressed = true;
    } else if (e.keyCode === 37) {
      leftPressed = true;
    }
  };

  let keyUpHandler = function (e) {
    if (e.keyCode === 39) {
      rightPressed = false;
    } else if (e.keyCode === 37) {
      leftPressed = false;
    }
  };

  document.addEventListener('keydown', keyDownHandler, false);
  document.addEventListener('keyup', keyUpHandler, false);

  setInterval(draw, 10);

}());

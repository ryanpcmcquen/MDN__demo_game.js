/*global alert*/
/*jslint browser:true, white:true, es6:true, devel:true*/
(function () {

  'use strict';

  let canvas = document.getElementById("myCanvas");
  let ctx = canvas.getContext("2d");

  // coordinates
  let x = canvas.width / 2;
  let y = canvas.height - 20;
  let dx = 2;
  let dy = -2;

  // ball stuff
  let ballRadius = 10;

  // paddle stuff
  let paddleHeight = 10;
  let paddleWidth = 75;
  let paddleX = (canvas.width - paddleWidth) / 2;

  // control stuff
  let rightPressed = false;
  let leftPressed = false;

  // bricks!
  let brickRowCount = 3;
  let brickColumnCount = 5;
  let brickWidth = 75;
  let brickHeight = 20;
  let brickPadding = 10;
  let brickOffsetTop = 30;
  let brickOffsetLeft = 30;
  let bricks = [];
  console.log(bricks);
  bricks.map(function (c) {
    c.push([]);
    console.log('somethin');
    c.map(function (r) {
      r = {
        x: 0,
        y: 0
      };
    });
  });

  let drawSomething = function (shapeFunc, color) {
    color = color || "#0095dd";
    ctx.beginPath();
    shapeFunc();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
  };

  let drawBricks = function () {
    bricks.map(function (c) {
      c.map(function (r) {
        let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
        let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
        r.x = brickX;
        r.y = brickY;
        drawSomething(function () {
          ctx.rect(brickX, brickY, brickWidth, brickHeight);
        });
      });
    });
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
    drawBricks();
    drawBall();
    drawPaddle();

    x = xCoordPlusMotionRate;
    y = yCoordPlusMotionRate;
    if (xCoordPlusMotionRate > canvas.width - ballRadius || xCoordPlusMotionRate < ballRadius) {
      dx = -dx;
    }
    if (yCoordPlusMotionRate < ballRadius) {
      dy = -dy;
    } else if (yCoordPlusMotionRate > canvas.height - ballRadius) {
      if (x > paddleX && x < paddleX + paddleWidth) {
        dy = -dy;
      } else {
        alert("GAME OVER");
        document.location.reload();
      }
    }

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
      paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
      paddleX -= 7;
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

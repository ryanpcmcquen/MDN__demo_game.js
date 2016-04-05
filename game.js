/*jslint browser:true, white:true, es6:true*/

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

  bricks.length = (brickColumnCount * brickRowCount);
  bricks.map(function (i) {
    i = {
      x: 0,
      y: 0,
      status: 1
    };
    return i;
  });

  let drawSomething = function (shapeFunc, color) {
    color = color || "#0095dd";
    ctx.beginPath();
    shapeFunc();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
  };

  let brickInteractions = function (brickIterateFunc) {
    bricks.map(function (brickValue, brickIndex) {
      brickIterateFunc(brickValue, brickIndex);
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

  // collisionDetection
  let collisionDetection = function (b) {
    if ((x > b.x) && (x < b.x + brickWidth) && (y > b.y) && (y < b.y + brickHeight)) {
      dy = -dy;
      b.status = 0;
      return b;
    }
  };

  console.log(bricks, bricks.length);
  let drawBricks = function () {
    // brickInteractions(
    // function (brickValue, brickIndex) {
    bricks.map(function (brickValue, brickIndex) {
      let b = brickValue;
      console.log(b);
      if (b.status === 1) {
        let columnIndex = Math.floor(brickIndex / brickRowCount);
        let rowIndex = Math.floor(brickIndex / brickColumnCount);
        console.log(columnIndex, rowIndex);
        let brickX = (columnIndex * (brickWidth + brickPadding)) + brickOffsetLeft;
        let brickY = (rowIndex * (brickHeight + brickPadding)) + brickOffsetTop;
        b.x = brickX;
        b.y = brickY;
        drawSomething(function () {
          ctx.rect(brickX, brickY, brickWidth, brickHeight);
        });
        collisionDetection(b);
      }
    });
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
        document.body.innerHTML = "<h1 style='text-align: center;'>GAME OVER</h1>";
        setTimeout(function () {
          document.location.reload();
        }, 700);
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

  setInterval(
    function () {
      draw();
    },
    10
  );
  //draw();

}());

/*jshint esversion:6*/

(() => {

  'use strict';

  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");

  const mainColor = "#0095dd";

  // Coordinates!
  let x = canvas.width / 2;
  let y = canvas.height - 20;
  let dx = 2;
  let dy = -2;

  // Ball stuff.
  let ballRadius = 10;

  // Paddle stuff.
  let paddleHeight = 10;
  let paddleWidth = 75;
  let paddleX = (canvas.width - paddleWidth) / 2;

  // Control stuff.
  let rightPressed = false;
  let leftPressed = false;

  // Bricks!
  let brickRowCount = 3;
  let brickColumnCount = 5;
  let brickWidth = 75;
  let brickHeight = 20;
  let brickPadding = 10;
  let brickOffsetTop = 30;
  let brickOffsetLeft = 30;

  const bricks = [];
  // Construct the 2D array:
  while (bricks.push([]) < brickColumnCount);
  bricks.map((ignore, i) => {
    while (bricks[i].push({
        x: 0,
        y: 0,
        status: 1
      }) < brickRowCount);
  });

  const drawSomething = (shapeFunc, color) => {
    color = color || mainColor;
    ctx.beginPath();
    shapeFunc();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
  };

  const brickInteractions = (brickIterateFunc) => {
    bricks.map((c, columnIndex) => {
      c.map((r, rowIndex) => {
        brickIterateFunc(c, columnIndex, r, rowIndex);
      });
    });
  };

  const drawBall = () => {
    drawSomething(
      () => {
        ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
      }
    );
  };

  const drawPaddle = () => {
    drawSomething(
      () => {
        ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
      }
    );
  };

  const collisionDetection = (b) => {
    if ((x > b.x) && (x < b.x + brickWidth) && (y > b.y) && (y < b.y + brickHeight)) {
      dy = -dy;
      b.status = 0;
      score = score + 1;
      if (score === brickRowCount * brickColumnCount) {
        alert("You won!");
        document.location.reload();
      }
    }
  };

  let score = 0;
  const drawScore = () => {
    ctx.font = "16px Georgia";
    ctx.fillStyle = mainColor;
    ctx.fillText("Score: " + score, 8, 20);
  }

  const drawBricks = () => {
    brickInteractions(
      (ignore, columnIndex, r, rowIndex) => {
        let b = bricks[columnIndex][rowIndex];
        if (b.status === 1) {
          let brickX = (columnIndex * (brickWidth + brickPadding)) + brickOffsetLeft;
          let brickY = (rowIndex * (brickHeight + brickPadding)) + brickOffsetTop;
          r.x = brickX;
          r.y = brickY;
          drawSomething(() => {
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
          });
          collisionDetection(bricks[columnIndex][rowIndex]);
        }
      });
  };

  const draw = () => {
    const xCoordPlusMotionRate = x + dx;
    const yCoordPlusMotionRate = y + dy;
    // This clears the frame.
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();

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
        setTimeout(() => {
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

  const keyDownHandler = (e) => {
    if (e.keyCode === 39) {
      rightPressed = true;
    } else if (e.keyCode === 37) {
      leftPressed = true;
    }
  };

  const keyUpHandler = (e) => {
    if (e.keyCode === 39) {
      rightPressed = false;
    } else if (e.keyCode === 37) {
      leftPressed = false;
    }
  };


  document.addEventListener('keydown', keyDownHandler, false);
  document.addEventListener('keyup', keyUpHandler, false);

  setInterval(
    () => {
      draw();
    },
    10
  );
  //draw();

})();

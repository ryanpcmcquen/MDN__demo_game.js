/*jslint browser:true, white:true*/
(function () {
  'use strict';

  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");

  var x = canvas.width / 2;
  var y = canvas.height - 20;
  var dx = 2;
  var dy = -2;

  var drawBall = function () {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fillStyle = "#0095dd";
    ctx.fill();
    ctx.closePath();
  };

  var draw = function () {
    // this clears the frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    x += dx;
    y += dy;
  };

  setInterval(draw, 10);

}());

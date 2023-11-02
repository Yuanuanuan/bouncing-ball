const c = document.getElementById("myCanvas");
const canvasHeight = c.height;
const canvasWidth = c.width;
const ctx = c.getContext("2d");
let circle_x = 160,
  circle_y = 60,
  radius = 20,
  xSpeed = 20,
  ySpeed = 20;

function drawCircle() {
  // 更動圓的座標
  circle_x += xSpeed;
  circle_y += ySpeed;

  if (circle_y >= canvasHeight - radius) ySpeed *= -1;
  if (circle_y <= radius) ySpeed *= -1;
  if (circle_x >= canvasWidth - radius) xSpeed *= -1;
  if (circle_x <= radius) xSpeed *= -1;

  // 畫出黑色背景
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // 畫出圓球
  ctx.beginPath();
  ctx.arc(circle_x, circle_y, radius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fillStyle = "yellow";
  ctx.fill();
}

let game = setInterval(drawCircle, 25);

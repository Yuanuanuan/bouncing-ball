const c = document.getElementById("myCanvas");
const canvasHeight = c.height;
const canvasWidth = c.width;
const ctx = c.getContext("2d");
let circle_x = 160,
  circle_y = 60,
  radius = 20,
  xSpeed = 20,
  ySpeed = 20,
  ground_x = 100,
  ground_y = 500,
  ground_h = 5;

c.addEventListener("mousemove", (e) => {
  ground_x = e.clientX - 100;
});

function drawCircle() {
  // 更動圓的座標
  circle_x += xSpeed;
  circle_y += ySpeed;

  // 確認球有沒有打到地板
  if (
    circle_x >= ground_x - radius &&
    circle_x <= ground_x + 200 + radius &&
    circle_y >= ground_y - radius &&
    circle_y <= ground_y + radius
  ) {
    if (ySpeed > 0) {
      circle_y -= 40;
    } else {
      circle_y += 40;
    }
    ySpeed *= -1;
  }

  // 確認球有沒有打到邊界
  if (circle_y >= canvasHeight - radius) ySpeed *= -1;
  if (circle_y <= radius) ySpeed *= -1;
  if (circle_x >= canvasWidth - radius) xSpeed *= -1;
  if (circle_x <= radius) xSpeed *= -1;

  // 畫出黑色背景
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // 畫出地板
  ctx.fillStyle = "white";
  ctx.fillRect(ground_x, ground_y, 200, ground_h);

  // 畫出圓球
  ctx.beginPath();
  ctx.arc(circle_x, circle_y, radius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fillStyle = "yellow";
  ctx.fill();
}

let game = setInterval(drawCircle, 25);

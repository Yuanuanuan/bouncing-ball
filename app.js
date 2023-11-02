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
  ground_h = 5,
  brickArray = [];

function getRandom(min, max) {
  return min + Math.floor(Math.random() * (max - min));
}

class Brick {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    brickArray.push(this);
  }

  drawBrick() {
    ctx.fillStyle = "lightgreen";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  touchBall(x, y) {
    return (
      x >= this.x - radius &&
      x <= this.x + this.width + radius &&
      y <= this.y + radius + this.height &&
      y >= this.y - radius
    );
  }
}

// 製作所有的brick
for (let i = 0; i < 10; i++) {
  new Brick(getRandom(0, 950), getRandom(0, 550));
}

c.addEventListener("mousemove", (e) => {
  ground_x = e.clientX - 100;
});

function drawCircle() {
  // 確認球是否碰到磚塊
  brickArray.forEach((brick, index) => {
    if (brick.touchBall(circle_x, circle_y)) {
      if (circle_y >= brick.y + brick.height || circle_y <= brick.y) {
        ySpeed *= -1;
      }
      if (circle_x >= brick.x + brick.width || circle_x <= brick.x) {
        xSpeed *= -1;
      }

      brickArray.splice(index, 1);
      if (brickArray.length == 0) {
        alert("遊戲結束!");
        clearInterval(game);
      }
    }
  });

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

  // 畫出所有的brick
  brickArray.forEach((brick) => {
    brick.drawBrick();
  });

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

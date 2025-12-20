const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const scale = 20;
const rows = canvas.height / scale;
const cols = canvas.width / scale;

let snake;
let food;
let direction = { x: 0, y: 0 };
let gameInterval;

function setup() {
  snake = new Snake();
  food = new Food();
  food.pickLocation();

  direction = { x: 1, y: 0 }; // start moving right
  clearInterval(gameInterval);
  gameInterval = setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    food.draw();
    snake.update();
    snake.draw();

    if (snake.eat(food)) {
      food.pickLocation();
    }

    if (snake.checkCollision()) {
      alert('Game Over! Press OK to restart.');
      setup();
    }
  }, 100);
}

window.addEventListener('keydown', e => {
  const key = e.key.toLowerCase();
  if (key === 'w' && direction.y !== 1) {
    direction = { x: 0, y: -1 };
  } else if (key === 's' && direction.y !== -1) {
    direction = { x: 0, y: 1 };
  } else if (key === 'a' && direction.x !== 1) {
    direction = { x: -1, y: 0 };
  } else if (key === 'd' && direction.x !== -1) {
    direction = { x: 1, y: 0 };
  }
});

function Snake() {
  this.body = [{ x: 0, y: 0 }];
  this.length = 1;

  this.draw = function() {
    ctx.fillStyle = '#2a5d34'; // green
    for (let part of this.body) {
      ctx.fillRect(part.x, part.y, scale, scale);
    }
  };

  this.update = function() {
    const head = { x: this.body[0].x + direction.x * scale, y: this.body[0].y + direction.y * scale };

    // Wrap around edges
    if (head.x >= canvas.width) head.x = 0;
    if (head.x < 0) head.x = canvas.width - scale;
    if (head.y >= canvas.height) head.y = 0;
    if (head.y < 0) head.y = canvas.height - scale;

    this.body.unshift(head);

    if (this.body.length > this.length) {
      this.body.pop();
    }
  };

  this.eat = function(food) {
    const head = this.body[0];
    if (head.x === food.x && head.y === food.y) {
      this.length++;
      return true;
    }
    return false;
  };

  this.checkCollision = function() {
    const head = this.body[0];
    // Check collision with self
    for (let i = 1; i < this.body.length; i++) {
      if (head.x === this.body[i].x && head.y === this.body[i].y) {
        return true;
      }
    }
    return false;
  };
}

function Food() {
  this.x = 0;
  this.y = 0;

  this.pickLocation = function() {
    this.x = Math.floor(Math.random() * cols) * scale;
    this.y = Math.floor(Math.random() * rows) * scale;
  };

  this.draw = function() {
    ctx.fillStyle = '#c9b037'; // gold
    ctx.fillRect(this.x, this.y, scale, scale);
  };
}

// Initialize canvas size and start game
function init() {
  canvas.width = 600;
  canvas.height = 400;
  setup();
}

init();

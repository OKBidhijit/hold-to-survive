const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Player settings
let player = { x: canvas.width / 2, y: canvas.height / 2, radius: 30, color: 'blue' };

// Score
let score = 0;

// Obstacles array
let obstacles = [];

// Touch position
let touchX = player.x, touchY = player.y;

// Handle touch or mouse input
let isTouching = false;
let gameOver = false;

// Create obstacle class
class Obstacle {
    constructor(x, y, size, speed) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speed = speed;
    }

    move() {
        this.x -= this.speed;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.closePath();
    }

    // Check for collision with the player
    checkCollision() {
        const dist = Math.hypot(this.x - player.x, this.y - player.y);
        if (dist < this.size + player.radius) {
            gameOver = true;
        }
    }
}

// Update score
function updateScore() {
    document.getElementById('score').innerText = `Score: ${score}`;
}

// Main game logic
function gameLoop() {
    if (gameOver) {
        alert('Game Over!');
        return;
    }

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update player position
    if (isTouching) {
        player.x = touchX;
        player.y = touchY;
    }

    // Draw player
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
    ctx.fillStyle = player.color;
    ctx.fill();
    ctx.closePath();

    // Update obstacles
    if (Math.random() < 0.02) {
        const size = Math.random() * 30 + 20;
        const yPos = Math.random() * canvas.height;
        const speed = Math.random() * 2 + 2;
        obstacles.push(new Obstacle(canvas.width, yPos, size, speed));
    }

    obstacles.forEach((obstacle, index) => {
        obstacle.move();
        obstacle.draw();
        obstacle.checkCollision();

        // Remove obstacles that go off-screen
        if (obstacle.x + obstacle.size < 0) {
            obstacles.splice(index, 1);
            score++;
            updateScore();
        }
    });

    // Request next frame
    requestAnimationFrame(gameLoop);
}

// Touch or mouse event listeners
canvas.addEventListener('touchmove', (e) => {
    touchX = e.touches[0].clientX;
    touchY = e.touches[0].clientY;
    isTouching = true;
});

canvas.addEventListener('touchend', () => {
    isTouching = false;
    gameOver = true;
});

canvas.addEventListener('mousedown', (e) => {
    touchX = e.clientX;
    touchY = e.clientY;
    isTouching = true;
});

canvas.addEventListener('mouseup', () => {
    isTouching = false;
    gameOver = true;
});

// Start game loop
gameLoop();
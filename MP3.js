// Preload the sounds
const moveSound = new Audio('move.mp3');      // Move sound
const collisionSound = new Audio('collision.mp3'); // Collision sound
const gameOverSound = new Audio('gameover.mp3'); // Game over sound

// Play sound when player moves
canvas.addEventListener('touchmove', (e) => {
    touchX = e.touches[0].clientX;
    touchY = e.touches[0].clientY;
    isTouching = true;
    moveSound.play(); // Play move sound
});

// Play sound on collision
function checkCollisions() {
    obstacles.forEach(obstacle => {
        const dist = Math.hypot(obstacle.x - player.x, obstacle.y - player.y);
        if (dist < obstacle.size + player.radius) {
            collisionSound.play(); // Play collision sound
            gameOver = true;
        }
    });
}

// Play game over sound
function gameOverSequence() {
    gameOverSound.play(); // Play game over sound
    alert('Game Over!');
}

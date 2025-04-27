function checkCollisions() {
    obstacles.forEach((obstacle, index) => {
        const dist = Math.hypot(obstacle.x - player.x, obstacle.y - player.y);
        if (dist < obstacle.size + player.radius) {
            collisionSound.play(); // Play collision sound
            triggerExplosion(obstacle.x, obstacle.y); // Trigger explosion effect
            gameOver = true; // End the game
            obstacles.splice(index, 1); // Remove the obstacle
        }
    });
}
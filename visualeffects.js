// Create explosion class for visual effect
class Explosion {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 10 + 5;
        this.alpha = 1;
        this.speed = Math.random() * 3 + 2;
    }

    // Update explosion (shrink and fade)
    update() {
        this.size *= 0.95; // Shrinks over time
        this.alpha -= 0.05; // Fade effect
        this.x += Math.random() * 5 - 2.5; // Random drift
        this.y += Math.random() * 5 - 2.5;
    }

    // Draw explosion
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 0, 0, ${this.alpha})`; // Red explosion with fading
        ctx.fill();
        ctx.closePath();
    }
}

// Store explosions
let explosions = [];

// Trigger explosion on collision
function triggerExplosion(x, y) {
    explosions.push(new Explosion(x, y)); // Create explosion at collision point
}

// Update and draw explosions
function updateExplosions() {
    for (let i = explosions.length - 1; i >= 0; i--) {
        explosions[i].update();
        explosions[i].draw();
        if (explosions[i].alpha <= 0) {
            explosions.splice(i, 1); // Remove dead explosions
        }
    }
}
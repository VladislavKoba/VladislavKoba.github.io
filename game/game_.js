const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Constants
const TILE_SIZE = 50;
const MAP_WIDTH = 150 * TILE_SIZE; // Width based on number of columns
const MAP_HEIGHT = 6 * TILE_SIZE; // Height based on number of rows

// Map matrix with floor (1 = platform, 2 = enemy, 3 = player start)
const mapMatrix = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];




// Variables
let platforms = [];
let enemies = [];
let camera = { x: 0 }; // Camera offset
let player = {
    x: 0,
    y: 0,
    width: 40,
    height: 40,
    color: "lime",
    speed: 5,
    dx: 0,
    dy: 0,
    jump: false
};

const keys = { left: false, right: false, jump: false, shoot: false };

// Mobile controls
document.getElementById("left").addEventListener("touchstart", () => (keys.left = true));
document.getElementById("left").addEventListener("touchend", () => (keys.left = false));

document.getElementById("right").addEventListener("touchstart", () => (keys.right = true));
document.getElementById("right").addEventListener("touchend", () => (keys.right = false));

document.getElementById("jump").addEventListener("touchstart", () => (keys.jump = true));
document.getElementById("jump").addEventListener("touchend", () => (keys.jump = false));

document.getElementById("shoot").addEventListener("touchstart", () => (keys.shoot = true));
document.getElementById("shoot").addEventListener("touchend", () => (keys.shoot = false));

// Keyboard controls
window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") keys.left = true;
    if (e.key === "ArrowRight") keys.right = true;
    if (e.key === " ") keys.jump = true;
    if (e.key === "x") keys.shoot = true;
});
window.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft") keys.left = false;
    if (e.key === "ArrowRight") keys.right = false;
    if (e.key === " ") keys.jump = false;
    if (e.key === "x") keys.shoot = false;
});

// Initialize platforms, enemies, and player position
function initializeMap() {
    platforms = [];
    enemies = [];
    mapMatrix.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const x = colIndex * TILE_SIZE;
            const y = rowIndex * TILE_SIZE;

            if (cell === 1) {
                platforms.push({ x, y, width: TILE_SIZE, height: TILE_SIZE });
            } else if (cell === 2) {
                enemies.push({ x, y, width: TILE_SIZE, height: TILE_SIZE, speed: 2 });
            } else if (cell === 3) {
                player.x = x;
                player.y = y;
            }
        });
    });
}

// Player movement
function movePlayer() {
    player.dy += 0.5; // Gravity

    if (keys.right) player.dx = player.speed;
    else if (keys.left) player.dx = -player.speed;
    else player.dx = 0;

    if (keys.jump && !player.jump) {
        player.dy = -10;
        player.jump = true;
    }

    player.x += player.dx;
    player.y += player.dy;

    // Platform collision
    platforms.forEach((platform) => {
        if (
            player.x < platform.x + platform.width &&
            player.x + player.width > platform.x &&
            player.y < platform.y + platform.height &&
            player.y + player.height > platform.y
        ) {
            if (player.dy > 0) {
                player.y = platform.y - player.height; // Stand on top of platform
                player.dy = 0;
                player.jump = false;
            }
        }
    });

    // Keep player within map bounds
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > MAP_WIDTH) player.x = MAP_WIDTH - player.width;

    // Collision with ground
    if (player.y + player.height > MAP_HEIGHT) {
        player.y = MAP_HEIGHT - player.height;
        player.dy = 0;
        player.jump = false;
    }

    // Camera follows player
    camera.x = Math.max(0, Math.min(player.x - canvas.width / 2, MAP_WIDTH - canvas.width));
}

// Draw functions
function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x - camera.x, player.y, player.width, player.height);
}

function drawPlatforms() {
    platforms.forEach((platform) => {
        ctx.fillStyle = "gray";
        ctx.fillRect(platform.x - camera.x, platform.y, platform.width, platform.height);
    });
}

function drawEnemies() {
    enemies.forEach((enemy) => {
        ctx.fillStyle = "red";
        ctx.fillRect(enemy.x - camera.x, enemy.y, enemy.width, enemy.height);
    });
}

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    movePlayer();

    drawPlatforms();
    drawEnemies();
    drawPlayer();

    requestAnimationFrame(gameLoop);
}

// Initialize the game
initializeMap();
gameLoop();

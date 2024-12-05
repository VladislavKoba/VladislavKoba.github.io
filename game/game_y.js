const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const backgroundImage = new Image();
backgroundImage.src = "./img/background_dark.png";
//2
const playerImage = new Image();
playerImage.src = "./img/player_y.png";
//3
const enemyImage = new Image();
enemyImage.src = "./img/enemy_l.png";
//1
const platformImage = new Image();
platformImage.src = "./img/platform.png";
//4
const wallImage = new Image();
wallImage.src = "./img/wall.png";
//5
const ladderImage = new Image();
ladderImage.src = "./img/ladder.png";
//6
const barrellImage = new Image();
barrellImage.src = "./img/barrell.png";
//7
const sevenImage = new Image();
sevenImage.src = "./img/7.png";
//8
const twoImage = new Image();
twoImage.src = "./img/2.png";



// Constants
const TILE_SIZE = 50;
const MAP_WIDTH = 150 * TILE_SIZE; // Width based on number of columns
const MAP_HEIGHT = 8 * TILE_SIZE; // Height based on number of rows

// Map matrix (to be defined separately)
const mapMatrix = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 7, 8, 7, 7, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 5, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [3, 0, 0, 0, 0, 0, 6, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 2, 0, 2, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 6, 6, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 6, 6, 6, 6, 6, 6, 6, 6, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

let platforms = [];
let enemies = [];
let playerBullets = [];
let enemyBullets = [];
let camera = { x: 0 }; // Camera offset
let playerHp = 10;
let playerScore = 0;
let lastPlayerShot = 0;
let lastEnemyShots = {};
const SHOOT_COOLDOWN = 300;

let player = {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    color: "lime",
    speed: 3,
    dx: 0,
    dy: 0,
    jump: false,
};

const keys = { left: false, right: false, jump: false, shoot: false };

// Mobile Controls
document.getElementById("left").addEventListener("touchstart", () => (keys.left = true));
document.getElementById("left").addEventListener("touchend", () => (keys.left = false));

document.getElementById("right").addEventListener("touchstart", () => (keys.right = true));
document.getElementById("right").addEventListener("touchend", () => (keys.right = false));

document.getElementById("jump").addEventListener("touchstart", () => (keys.jump = true));
document.getElementById("jump").addEventListener("touchend", () => (keys.jump = false));

document.getElementById("shoot").addEventListener("touchstart", () => (keys.shoot = true));
document.getElementById("shoot").addEventListener("touchend", () => (keys.shoot = false));

// Keyboard Controls
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

            if ([1,4,5,6,7,8].includes(cell)) {
                platforms.push({ x, y, width: TILE_SIZE, height: TILE_SIZE, type: cell });
            } else if (cell === 2) {
                enemies.push({ x, y, width: player.width, height: player.height, hp: 1 });
            } else if (cell === 3) {
                player.x = x;
                player.y = y;
            }
        });
    });
}

// Shooting
function shoot(bulletsArray, shooter, direction) {
    bulletsArray.push({
        x: shooter.x + (direction > 0 ? shooter.width : 0),
        y: shooter.y + shooter.height / 2 - 25,
        width: 10,
        height: 5,
        speed: 7 * direction,
    });
}

// Handle Player Shooting
function handlePlayerShooting() {
    const now = Date.now();
    if (keys.shoot && now - lastPlayerShot > SHOOT_COOLDOWN) {
        shoot(playerBullets, player, 1);
        lastPlayerShot = now;
    }
}

// Handle Enemy Shooting
function handleEnemyShooting() {
    const now = Date.now();
    enemies.forEach((enemy, index) => {
        if (!lastEnemyShots[index]) lastEnemyShots[index] = 0;
        if (now - lastEnemyShots[index] > SHOOT_COOLDOWN * 6) {
            shoot(enemyBullets, enemy, -1);
            lastEnemyShots[index] = now;
        }
    });
}

// Move Bullets
function moveBullets(bulletsArray) {
    bulletsArray.forEach((bullet, index) => {
        bullet.x += bullet.speed;
        if (bullet.x < 0 || bullet.x > MAP_WIDTH) bulletsArray.splice(index, 1); // Remove bullets out of bounds
    });
}

// Check Bullet Collisions
function checkBulletCollisions() {
    // Player bullets hitting enemies
    playerBullets.forEach((bullet, bIndex) => {
        enemies.forEach((enemy, eIndex) => {
            if (
                bullet.x < enemy.x + enemy.width &&
                bullet.x + bullet.width > enemy.x &&
                bullet.y < enemy.y + enemy.height &&
                bullet.y + bullet.height > enemy.y
            ) {
                playerBullets.splice(bIndex, 1);
                enemy.hp--;
                if (enemy.hp <= 0){
                    enemies.splice(eIndex, 1);
                    playerScore++;
                }
            }
        });
        platforms.forEach((platform, eIndex) => {
            if (
                bullet.x < platform.x + platform.width &&
                bullet.x + bullet.width > platform.x &&
                bullet.y < platform.y + platform.height &&
                bullet.y + bullet.height > platform.y
            ) {
                playerBullets.splice(bIndex, 1);
            }
        });
    });

    // Enemy bullets hitting player
    enemyBullets.forEach((bullet, bIndex) => {
        if (
            bullet.x < player.x + player.width &&
            bullet.x + bullet.width > player.x &&
            bullet.y < player.y + player.height &&
            bullet.y + bullet.height > player.y
        ) {
            enemyBullets.splice(bIndex, 1);
            playerHp--;
            if (playerHp <= 0) {
                alert("Game Over!");
                initializeMap();
                // window.location.href ='/';
            }
        }
        platforms.forEach((platform, eIndex) => {
            if (
                bullet.x < platform.x + platform.width &&
                bullet.x + bullet.width > platform.x &&
                bullet.y < platform.y + platform.height &&
                bullet.y + bullet.height > platform.y
            ) {
                enemyBullets.splice(bIndex, 1);
            }
        });
    });
}

// Draw the background
function drawBackground() {
    ctx.drawImage(
        backgroundImage,
        -camera.x * 0.1, // Move the background slower
        -100,
        2250,
        500
    );
}

// Draw Functions
function drawBullets(bulletsArray, color) {
    ctx.fillStyle = color;
    bulletsArray.forEach((bullet) => {
        ctx.fillRect(bullet.x - camera.x, bullet.y, bullet.width, bullet.height);
    });
}

function drawHP() {
    ctx.fillStyle = "orange";
    ctx.font = "20px Arial";
    ctx.fillText(`HP: ${playerHp}`, 10, 30);
}

function drawScore() {
    ctx.fillStyle = "orange";
    ctx.font = "20px Arial";
    ctx.fillText(`Score: ${playerScore}`, 10, 60);
}

// Draw player with image
function drawPlayer() {
    ctx.drawImage(playerImage, player.x - camera.x, player.y, player.width, player.height);
}

// Draw enemies with image
function drawEnemies() {
    enemies.forEach((enemy) => {
        ctx.drawImage(enemyImage, enemy.x - camera.x, enemy.y, enemy.width, enemy.height);
    });
}

// Draw platforms with image
function drawPlatforms() {
    platforms.forEach((platform) => {
        switch (platform.type) {
            case 1:
                ctx.drawImage(platformImage, platform.x - camera.x, platform.y, platform.width, platform.height);
                break;
            case 4:
                ctx.drawImage(wallImage, platform.x - camera.x, platform.y, platform.width, platform.height);
                break;
            case 5:
                ctx.drawImage(ladderImage, platform.x - camera.x, platform.y, platform.width, platform.height);
                break;
            case 6:
                ctx.drawImage(barrellImage, platform.x - camera.x, platform.y, platform.width, platform.height);
                break;
            case 7:
                ctx.drawImage(sevenImage, platform.x - camera.x, platform.y, platform.width, platform.height);
                break;
            case 8:
                ctx.drawImage(twoImage, platform.x - camera.x, platform.y, platform.width, platform.height);
                break;
            default:
                console.warn(`Unknown platform type: ${platform.type}`);
        }
    });
}



// Player Movement
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
                player.y = platform.y - player.height;
                player.dy = 0;
                player.jump = false;
            }
        }
    });

    // Map bounds
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > MAP_WIDTH) player.x = MAP_WIDTH - player.width;
    if (player.y + player.height > MAP_HEIGHT) {
        player.y = MAP_HEIGHT - player.height;
        player.dy = 0;
        player.jump = false;
    }

    // Camera
    camera.x = Math.max(0, Math.min(player.x - canvas.width / 2, MAP_WIDTH - canvas.width));
}

// Game Loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBackground();

    movePlayer();
    handlePlayerShooting();
    handleEnemyShooting();

    moveBullets(playerBullets);
    moveBullets(enemyBullets);
    checkBulletCollisions();

    drawPlatforms();
    drawBullets(playerBullets, "yellow");
    drawBullets(enemyBullets, "yellow");
    drawEnemies();
    drawPlayer();
    drawHP();
    drawScore();

    requestAnimationFrame(gameLoop);
}

// Initialize and Start
initializeMap();
gameLoop();

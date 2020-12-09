var ship, gameState, enemyship, score, laser, enemyShipGroup, lives, extraLife;
var ship_img, enemyship_img, laser_img, background_img, explosionSound, laserSound;
function preload() {
  ship_img = loadImage("sprites/ship.png");
  enemyship_img = loadImage("sprites/enemyship.png");
  laser_img = loadImage("sprites/laser.png");
  background_img = loadImage("sprites/background.jpg");
  explosionSound = loadSound("sprites/explosion.wav");
  laserSound = loadSound("sprites/tir.mp3");
}

function setup() {
  createCanvas(1600,800);
  gameState = "play";
  ship = createSprite(800,750,50,50);
  ship.addImage("ship",ship_img);
  ship.scale = 1.25;
  enemyShipGroup = createGroup();
  score = 0;
  lives = 3;
  //background_img
}

function draw() {
  background(background_img);
  if (gameState === "play") {


  if (keyDown(LEFT_ARROW)) {
    ship.x -= 5;
  } 
  if(keyDown(RIGHT_ARROW)) {
    ship.x += 5;
  }
  if (keyWentDown(UP_ARROW)) {
    laser = createSprite(ship.x,ship.y - 50,10,50);
    laser.addImage("laser", laser_img);
    laser.velocityY = -5;
    laser.scale = 0.5;
    laser.lifetime = 100;
    laserSound.play();
    
  }
  createEnemy();
  
  if(enemyShipGroup.isTouching(laser)) {
    enemyShipGroup.destroyEach();
    score += 100;
    explosionSound.play();
    extraLife = Math.round(random(1,10));
    if (extraLife === 10) {
      lives += 1;
    }
  }
  

  if (enemyShipGroup.isTouching(ship)) { 
      lives -= 1; 
      ship.destroy();
      explosionSound.play();
      ship = createSprite(800,750,50,50);
      ship.addImage("ship",ship_img);
      ship.scale = 1.25;
      
    //console.log(lives); 
  } 
  if (lives === 0) {
    gameState = "end"
  }
  drawSprites();

}

if (gameState === "end") {
  textSize(80);
  fill("yellow");
  text("Game Over", 650, 400);
  text("Total score: " + score, 650, 300);
}
  
    textSize(40);
    fill("red");
    text("lives: " + lives,width - 300, 50);
    text("score: " + score, width - 300,100);
}

function createEnemy() {

  if (frameCount%60 === 0 && gameState === "play") {
    enemyship = createSprite(random(50,750),0,20,20)
    enemyship.addImage("enemy",enemyship_img);
    enemyship.velocityY = 8 + score/500;
    console.log(enemyship.velocityY);
    enemyship.lifetime = 100;
    enemyShipGroup.add(enemyship);
  }
}
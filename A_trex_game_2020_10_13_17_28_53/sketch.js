var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud4me 
var cloud_image
var lonelyCactus
var c1 ,c2, c3, c4, c5, c6
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var obstaclesGroup, cloudsGroup 
var score = 0;
var whyRU
var running
var whyRU1, running1   
var jump, die, checkpoint;

function preload(){
    trex_running =              loadAnimation("trex1.png","trex2.png","trex3.png");
    trex_collided = loadImage("trex_collided.png");

    groundImage = loadImage("ground2.png");
  cloud_image=loadImage("cloud.png")
  
  c1 = loadImage("obstacle1.png");
  c2 = loadImage("obstacle2.png");
  c3 = loadImage("obstacle3.png");
  c4 = loadImage("obstacle4.png");
  c5 = loadImage("obstacle5.png");
  c6 = loadImage("obstacle6.png");
  whyRU = loadImage("Game-over and die.png");
  running = loadImage("restart.png")
  jump = loadSound("jump.mp3") 
  die = loadSound("die.mp3")
  checkpoint = loadSound("checkPoint.mp3")

}

function setup() {
  
  background(220)
  createCanvas(600,200)  
  
  //create a trex sprite
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5; 
  
  //create a ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -5-1;
  
  //creating invisible ground
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  // create Obstacles and Cloud groups
  obstaclesGroup = new Group();
  cloudsGroup = new Group();
  
  trex.setCollider("rectangle", 0, 0, 80, trex.height);
  
  whyRU1 = createSprite(200, 130, 400, 10);
  
  whyRU1.addImage(whyRU);
  
  running1 = createSprite(300, 140);
  
  running1.addImage(running)
  
  running1.scale = .5
  
  whyRU1.scale = .2
  //generate random numbers
  var rand =  Math.round(random(1,100))
  console.log(rand)
  whyRU1.visible = false
  running1.visible = false
}
 
function draw() {
  //set background color 
  background("white");
  
  text("score: "+ score, 370, 20);
  if(gameState === PLAY){
    //move the ground
    ground.velocityX = -(5 + score / 150);
    score = score + Math.round(getFrameRate()/60); 
  // jump when the space key is pressed
  if(keyDown("space")&& trex.y >= 161) {
    trex.velocityY = -18;
    jump.play();
  }
  trex.velocityY = trex.velocityY + 0.8
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  //Spawn and delete Clouds 
  clouds()
  cactus()  
  if(trex.isTouching(obstaclesGroup)){
  gameState = END  
  die.play();
  //trex.velocityY = -8;
  //jump.play();
  }
    if(score % 100 === 0 && score>0){
    checkpoint.play()
    }
  }
  else if(gameState === END){
    //stop the ground
    ground.velocityX = 0
    
    obstaclesGroup.setVelocityXEach(0)
    
    cloudsGroup.setVelocityXEach(0)
    
    obstaclesGroup.setLifetimeEach(-1);
    
    cloudsGroup.setLifetimeEach(-1);
  whyRU1.visible = true
  
  running1.visible = true
  
  if(mousePressedOver(running1) ){
  
  gameState = PLAY  
  
  cloudsGroup.setLifetimeEach(0);
  
  obstaclesGroup.setLifetimeEach(0);
  
  score = 0
  
  whyRU1.visible = false
  
  running1.visible = false
  }
  }
  
  
  
  
  
  
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  
  drawSprites();
  
  
}

  //function to spawn the clouds
  
function clouds(){
  
    if(frameCount%60 === 0){
    cloud4me = createSprite (600, Math.round(random(50, 90)), 40, 10);
    cloud4me.addImage (cloud_image)  
    cloud4me.velocityX = -(5 + score / 150);   
    cloud4me.scale = .7
    cloud4me.depth = trex.depth
    trex.depth = trex.depth+1
    cloud4me.lifetime = 170 
    cloudsGroup.add(cloud4me) 
    }
  
  }

function cactus () {
if(frameCount%60 === 0){
lonelyCactus = createSprite (600, 160,40,40); 
lonelyCactus.velocityX = -(5 + score / 150);  
lonelyCactus.lifetime = 170 
switch (Math.round(random(1,6))) {
  case 1: lonelyCactus.addImage (c1);
  break;
  case 2: lonelyCactus.addImage (c2);
  break;
  case 3: lonelyCactus.addImage (c3);
  break;
  case 4: lonelyCactus.addImage (c4);
  break;
  case 5: lonelyCactus.addImage (c5);
  break;
  case 6: lonelyCactus.addImage (c6);
  break;
  default: break;  
  
}
lonelyCactus.scale = .5
obstaclesGroup.add(lonelyCactus)
}
  
}

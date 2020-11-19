//variables
var knife,knifeImage;

var fruit1,fruit1Image,
    fruit2,fruit2Image,
    fruit3,fruit3Image,
    fruit4,fruit4Image,
    fruitsGroup;

var monster,monsterImage,monstersGroup;

var PLAY = 1
var END = 0
var gameState = PLAY;

var score = 0;

var gameOverImage;

var restartImage;


//functon to load image and sounds
function preload(){
  
  knifeImage = loadAnimation("sword.png");
  
  fruit1Image = loadImage("fruit1.png");
  fruit2Image = loadImage("fruit2.png");
  fruit3Image = loadImage("fruit3.png");
  fruit4Image = loadImage("fruit4.png");
  
  monsterImage = loadAnimation("alien1.png","alien2.png");
  
  gameOverImage = loadAnimation("gameover.png");
  
  swooshSound = loadSound("knifeSwooshSound.mp3");
  overSound = loadSound("gameover.mp3");
  
  restartImage = loadImage("restart.png");
  
}


//function setup
function setup() {
  
  //to make canvas
  createCanvas(600, 600);
  
  //to draw knife
  knife = createSprite(300,300,10,10)
  knife.addAnimation("sword",knifeImage)
  knife.scale = 0.8;
  knife.addAnimation("gameover",gameOverImage);
  knife.debug = false;
  knife.setCollider("circle",40,-40,30);
  
  //to make groups
  monstersGroup = new Group();
  fruitsGroup = new Group();
  
  restart = createSprite(300,350);
  restart.addImage(restartImage);
  restart.scale = 0.5;
  
}
  
  
//function
function draw(){
  
  //to set background color
  background("lightBlue");
  
  //game state play
  if(gameState === PLAY ){
    
    //to make restart invisible
    restart.visible = false;
    
    //to move the knife with mouse
    knife.y = World.mouseY;
    knife.x = World.mouseX;
    
    //to call enemy function
    enemy();  
    
    //to call fruits function
    fruits();
    
    //to assign what to do after touching knife
    if (fruitsGroup.isTouching(knife)){
       fruitsGroup.destroyEach();
       swooshSound.play();
       score = score + 1;
    }
    if (monstersGroup.isTouching(knife)){
       monstersGroup.destroyEach();
       overSound.play();
       gameState = END;
    }
  }
  
  //to switch to game state end
  else if (gameState === END){
     monstersGroup.setVelocityXEach(0);
     fruitsGroup.setVelocityXEach(0);
    fruitsGroup.destroyEach();
   //to change the animation
     knife.changeAnimation("gameover",gameOverImage);
     knife.y = 300;
     knife.x = 300;
     knife.scale = 2;
    restart.visible = true;
  }
  
  //to reset the game
  if(mousePressedOver(restart)) {
    reset();
    }
  
//to draw the sprites  
drawSprites();

//to display text
textSize(20);
text ("Score : " + score,500,30);
  
}


//function to create enemy
function enemy(){
  
  if(World.frameCount % 200 === 0){
    monster = createSprite(570,30,20,20);
    monster.addAnimation("m1",monsterImage);
    monster.y = Math.round(random(30,570));
    monster.velocityX = -(8+Math.round(score/10));
    monster.lifetime = 70;
    
    monstersGroup.add(monster);
  }
  
}


//function to create fruits
function fruits(){
  
  if (World.frameCount % 80 === 0){
    
    var position = Math.round(random(1,2))
    var fruit = createSprite(570,30,20,20);
    fruit.scale =0.2;
    fruit.debug = false;
    var r = Math.round(random(1,4));
    if(r == 1){
      fruit.addImage("f1",fruit1Image);
    }
    else if (r == 2){
      fruit.addImage("f2",fruit2Image);
    }
    else if (r == 3){
      fruit.addImage("f3",fruit3Image);
    }
    else if (r == 4){
      fruit.addImage("f4",fruit4Image);
    }
    if(position == 1){
      fruit.x = 600;
      fruit.velocityX = -(7+Math.round(score/4));
      }
    else if (position == 2){
      fruit.x = 0;
      fruit.velocityX = (7+Math.round(score/4));
    }
   
    fruit.y = Math.round(random(30,570));
    
    fruit.lifetime = 80;
    fruitsGroup.add(fruit);
  }
  
}


//function reset
function reset(){
  
  gameState = PLAY;
  restart.visible = false;
  score = 0;
  knife.changeAnimation("sword",knifeImage);
  knife.scale = 0.8;
  
  
}
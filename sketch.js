
var player, box, x, y, blockx, blocky, moveY, moveX, dir;

var walls, objects, enemies;

var score, nballs, level;

var map, m;

var bg;

function setup() {

	bg = loadImage('assets/bg.png');
  createCanvas(1000, 600);
	x=100;
	y=150;
	blockx=25;
	blocky=25;
	moveY=2;
	moveX=0;
	score = 0;
	nballs=0;
	level=0;
	m=0;
	
	map=loadJSON("map.json",drawMap);

 
  player = createSprite(75, 75);
  player.addAnimation('normal', 'assets/sprite0.png', 'assets/sprite3.png');

 

  walls = new Group();
	objects = new Group();
	enemies = new Group();


	createEnemies();
}


function draw() {

	
	background(bg);

	if (score == nballs){
		level+=1;
		player.position.x=75;
		player.position.y=75;
		for(var i=0; i < enemies.length; i++){
			enemies[i].remove();
		}
		drawObjects();
		createEnemies();
		//score=0;
	}

  if(keyDown('w'))
    player.position.y-=5;
  if(keyDown('a'))
    player.position.x-=5;
  if(keyDown('s'))
    player.position.y+=5;
  if(keyDown('d'))
    player.position.x+=5;

  player.collide(walls);
  player.collide(objects,catchBall);
  enemies.collide(walls,changeDir);

	drawSprites();
	
	textSize(50);
	fill(0);
	text('Score: '+str(score), 50, 42);
	text('Level: '+str(level),800, 42);
}
  
  
function catchBall(spritea, spriteb){
	score+=1;	
	spriteb.remove();
}
	
function changeDir(spritea, spriteb){
	dir = Math.floor(Math.random() * (0 - 4)) + 4;
	if(dir==0){
		spritea.setSpeed(5,0);
	}else if(dir == 1){
		spritea.setSpeed(5,90);
	}else if(dir == 2){
		spritea.setSpeed(5,180);
	}else if(dir == 3){
		spritea.setSpeed(5,-90);
	}
}

function drawMap(m){
	blockx=25;
	blocky=25;
	for (var i = 0; i < 240; i++){
		if(map[i] == "x"){
			var newSprite = createSprite(blockx, blocky);
			newSprite.addAnimation('normal', 'assets/squarew.png');
			newSprite.addToGroup(walls);
		}else if(map[i] == "-"){
			var newObject = createSprite(blockx, blocky);
			newObject.addAnimation('normal', 'assets/ball.png');
			newObject.depth = 1;
			newObject.addToGroup(objects);
			nballs+=1;
		}
		blockx += 50;
		if ((i+1)%20 == 0 && i!=0){
		  blockx = 25;
		  blocky += 50;
		}   
	}

}

function drawObjects(){
	blockx=25;
	blocky=25;
	nballs+=1;
	for (var j = 0; j < 240; j++){
		if(map[j] == "-"){
			var newObject = createSprite(blockx, blocky);
			newObject.addAnimation('normal', 'assets/ball.png');
			newObject.depth = 1;
			newObject.addToGroup(objects);
			nballs+=1;
		}
		blockx += 50;
		if ((j+1)%20 == 0 && j!=0){
		  blockx = 25;
		  blocky += 50;
		}   
	}
	nballs-=1;
}

function createEnemies(){
	for (var ii = 0; ii < level; ii++){
		var enemy = createSprite(500, 300);
  	enemy.addAnimation('normal', 'assets/sprite0.png', 'assets/sprite3.png');
		enemy.depth = 10;
		enemy.setSpeed(3,90);
		enemy.addToGroup(enemies);
	}
}
	
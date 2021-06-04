var spaceship, spaceshipImg, astronaut, explosion;
var obstaclesGroup, obstacles, comet1Img, comet2Img, meteorImg, debrisGroup, debris, debrisImg;
var coinGroup, coin, coinImg, battery, batteryImg;
var waterPlanet, waterPlanetImg;
var BG, spaceImg;
var score = 0;
var gameState = 0;

function preload()
{
	storyBG = loadImage("images/intro BG.png");
	spaceImg = loadImage("images/space BG.png");
	spaceshipImg = loadImage("images/spaceship.png");
	comet1Img = loadImage("images/fireComet.png");
	comet2Img = loadImage("images/iceComet.png");
	meteorImg = loadImage("images/meteor.png");
	debrisImg = loadImage("images/space debris.png");
	coinImg = loadImage("images/coin.png");
	explosion = loadImage("images/explosion.png");
	waterPlanetImg = loadImage("images/water planet.png");
}

function setup() {
	createCanvas(1200, 800);

	edges = createEdgeSprites();

	BG = createSprite(600, 400, 1200, 800);
	BG.addImage(storyBG);
	BG.scale = 1.4;
	
	//BG.velocityX = -7;
	
	spaceship = createSprite(170, 400);
	spaceship.scale = 0.65;
	spaceship.addImage(spaceshipImg);

	obstaclesGroup = new Group();
	debrisGroup = new Group();
	coinGroup = new Group();
	
}


function draw() {
	background(0);

	
	if(BG.x < 300){
		BG.x = width/2;
	}

	if(keyDown(UP_ARROW) && spaceship.y >= 150){
		spaceship.y = spaceship.y - 10;
		
	}

	if(keyDown(DOWN_ARROW) && spaceship.y <= 650){
		spaceship.y = spaceship.y + 10;
	
	}

	if(gameState === 0){
		//spaceship.visible = false;
		BG.addImage(storyBG);
		if(keyDown("space")){
		  gameState = 1;
		}
	}

	if(gameState === 1){
		BG.addImage(spaceImg);
		BG.velocityX = -7;
		spaceship.bounceOff(edges);
		spaceship.visible = true;

		spawnObstacles();
		spawnDebris();
		spawnCoins();

		if(coinGroup.isTouching(spaceship)){
			coinGroup.destroyEach();
			score++;
		}

		if(obstaclesGroup.isTouching(spaceship)){
			spaceship.addImage(explosion);
			gameState = 4;
		}

		if(debrisGroup.isTouching(spaceship)){
			spaceship.addImage(explosion);
			gameState = 4;
		}

		drawSprites();

		textSize(30);
		fill(180);
		strokeWeight(4)
		text("SCORE: " + score, 1000, 60);
	}

	else if(gameState === 4) {
		BG.velocityX = 0;
		
		spaceship.bounceOff(edges);

		//spawnObstacles();
		//spawnCoins();

		

		drawSprites();

		textSize(30);
		fill(180);
		strokeWeight(4)
		text("SCORE: " + score, 1000, 60);
	}
 
}

function spawnObstacles() {
	if(frameCount % 200 === 0){
		obstacles = createSprite(1200, random(100, 650), 15, 15);
		obstacles.scale = 0.8;
		obstacles.velocityX = -15;
		obstaclesGroup.add(obstacles);
		var rand = Math.round(random(1, 3));
		switch(rand){
		  case 1: obstacles.addImage(comet1Img);
				  break;
		  case 2: obstacles.addImage(comet2Img);
				  break;
		  case 3: obstacles.addImage(meteorImg);
				  break;
		  
		}
	}
}

function spawnDebris() {
	if(frameCount % 550 === 0) {
		debris = createSprite(1200, random(100, 650), 15, 15);
		debris.velocityX = -15;
		debris.addImage(debrisImg);
		debris.scale = 1.25;
		debrisGroup.add(debris);
	}
}

function spawnCoins() {
	if(frameCount % 100 === 0) {
	  coin = createSprite(1200, random(150, 600));
	  coin.velocityX = -10;
	  coin.addImage(coinImg)
	  coin.scale = 0.35;
	  coinGroup.add(coin);
	}
}
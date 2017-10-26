//Collisions 
//Collision between groups
//function called upon collision

var obstacles;
var collectibles;
var ball;
var wallCoords = [];
var scrWidth;
var scrHeight;
var initialRotationX;
var initialRotationY;
//var goalSound;


//These vars below could be consts, but we might want to make them variables later.
var nCellsX = 10;
var nCellsY = 10;  //note aspect ratio of an iphone screen is 3:2 or 1.5:1 but playing this game in portrait orientation is a more consistent experience.
var speed = 2;     //speed of ball when device is rotated
var dish = 0.01;   //tendency of ball to return to centre of screen
//var maxSpeed = 200; //maximum ball velocity
var boundaryThickness = 10;

function preload() {
	//pre-load sound and image files for speed of execution
  hedgeImg = loadImage('assets/hedge1.png');
  hedgeWall = loadImage('assets/hedgewall.png');
  hedgeWallHoriz = loadImage('assets/hedgewallH.png');
  ballImg = loadImage('assets/ball.png');
 
  soundFormats('mp3');
  goalSound = loadSound('assets/laughing.mp3');

}

function setup() {
  scrWidth = windowWidth;  
  scrHeight = windowHeight; //Assigned here because we will use this a lot, and this will make it easier to change
  							 // if we want to change these values later to windowWidth or a constant	
  
  var cellSize = (scrWidth - 2 * boundaryThickness) / nCellsX; 
  
  hedgeImg.resize(cellSize, 0); //using 0 as one argument scales the image proportionally.
  hedgeWall.resize(boundaryThickness, scrHeight); //this img is a long vertical boundary for the edge of the maze
  hedgeWallHoriz.resize(scrWidth, boundaryThickness); //this img is a long vertical boundary for the edge of the maze
  ballImg.resize(cellSize, 0);
  
  createCanvas(scrWidth, scrHeight); 

  //create a user controlled sprite
  ball = createSprite(cellSize, cellSize);
  ball.addImage(ballImg); 

  initialRotationX = rotationX; //read the inital state of the gyroscope - used for calibration later
  initialRotationY = rotationY;
  
  //create 2 groups
  obstacles = new Group();
  collectibles = new Group();
/*  
  for(var i=0; i<10; i++)
    {
    var dot = createSprite(wallCoords[i].x * cellSize + cellSize/2, );
    dot.addAnimation("normal", "assets/small_circle0001.png", "assets/small_circle0003.png");
    collectibles.add(dot);
    }
  */

//maze design here: https://docs.google.com/spreadsheets/d/1SKKese8kbNkeflwlneKild5kFzzvcOqVfF47qkBcdxs/edit#gid=0
	wallCoords.push({x: 1, y: 0});
	wallCoords.push({x: 4, y: 0});
	wallCoords.push({x: 9, y: 0}); 
	wallCoords.push({x: 2, y: 1});
	wallCoords.push({x: 4, y: 1});
	wallCoords.push({x: 5, y: 1});
	wallCoords.push({x: 6, y: 1});
	wallCoords.push({x: 8, y: 1});
	wallCoords.push({x: 9, y: 1});
	wallCoords.push({x: 0, y: 2});
	wallCoords.push({x: 6, y: 2});
	wallCoords.push({x: 8, y: 2});
	wallCoords.push({x: 0, y: 3});
	wallCoords.push({x: 2, y: 3});
	wallCoords.push({x: 3, y: 3});
	wallCoords.push({x: 4, y: 3});
	wallCoords.push({x: 6, y: 3});
	wallCoords.push({x: 2, y: 4});
	wallCoords.push({x: 6, y: 4});
	wallCoords.push({x: 8, y: 4});
	wallCoords.push({x: 9, y: 4});
	wallCoords.push({x: 1, y: 5});
	wallCoords.push({x: 2, y: 5});
	wallCoords.push({x: 4, y: 5});
	wallCoords.push({x: 5, y: 5});
	wallCoords.push({x: 2, y: 6});
	wallCoords.push({x: 4, y: 6});
	wallCoords.push({x: 8, y: 6});
	wallCoords.push({x: 0, y: 7});
	wallCoords.push({x: 2, y: 7});
	wallCoords.push({x: 6, y: 7});
	wallCoords.push({x: 7, y: 7});
	wallCoords.push({x: 8, y: 7});
	wallCoords.push({x: 0, y: 8});
	wallCoords.push({x: 2, y: 8});
	wallCoords.push({x: 3, y: 8});
	wallCoords.push({x: 4, y: 8});
	wallCoords.push({x: 5, y: 8});
	wallCoords.push({x: 7, y: 8});
	wallCoords.push({x: 7, y: 9});
	wallCoords.push({x: 9, y: 9});

// add the maze walls to the display + add the walls to the group of obstacles
	for (var i = 0; i < wallCoords.length; i++) {
    	var wall = createSprite(wallCoords[i].x * cellSize + cellSize/2 + boundaryThickness, wallCoords[i].y * cellSize + cellSize/2 + boundaryThickness);
    	wall.addImage(hedgeImg);
    	obstacles.add(wall);
	} 

//draw & create obstacle for vertical boundaries at either edge of the maze 
 	for (var i = 0; i < 2; i++) {
		var boundaryVert = createSprite(i * (cellSize * nCellsX + (2 * boundaryThickness)), scrHeight/2);
    	boundaryVert.addImage(hedgeWall);
    	obstacles.add(boundaryVert);
	}

//draw & create obstacle for horizontal boundaries top and bottom
 	
 	for (var i = 0; i < 2; i++) {
		var boundaryHoriz = createSprite(scrWidth/2, i * (cellSize * nCellsY + (2 * boundaryThickness)));
    	boundaryHoriz.addImage(hedgeWallHoriz);
    	obstacles.add(boundaryHoriz);
	}
	
//create goal at the end of the maze
	var dot = createSprite(8 * cellSize + cellSize/2, 9 * cellSize + cellSize/2); 
    dot.addAnimation("normal", "assets/small_circle0001.png", "assets/small_circle0003.png");
    collectibles.add(dot);

}


function draw() {
  background(200,220,180);  
  
  ball.velocity.y = (rotationX-initialRotationX) * speed - (ball.position.y - scrHeight/2) * dish;  //note that program x maps to device y. First term is calibrated tilt.
  ball.velocity.x = (rotationY-initialRotationY) * speed - (ball.position.x - scrWidth/2) * dish;  //2nd term in this formula biases the ball to the centre of the screen.
 	
  //ball.velocity.y = (vX > maxSpeed ? maxSpeed : vX);  //if the speed determined in the two lines above is greater than speed limit, cap the speed)
  //ball.velocity.x = (vY > maxSpeed ? maxSpeed : vY);  //This code is commented out because it makes the program too slow
 

  //ball collides against all the sprites in the group obstacles
  ball.collide(obstacles);
  ball.overlap(collectibles, collect);
  
  //I can define a function to be called upon collision, overlap, displace or bounce
  //see collect() below
  // ball.overlap(collectibles, collect)
  
  
  drawSprites();
}

//the first parameter will be the sprite (individual or from a group) 
//calling the function
//the second parameter will be the sprite (individual or from a group)
//against which the overlap, collide, bounce, or displace is checked

function collect(collector, collected)
{
  //collector is another name for ball
  //show the animation
  collector.changeAnimation("stretch");
  collector.animation.rewind();
  //collected is the sprite in the group collectibles that triggered 
  //the event
  goalSound.play();
  collected.remove();

}

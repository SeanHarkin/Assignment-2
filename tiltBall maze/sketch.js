//Collisions 
//Collision between groups
//function called upon collision

var obstacles;
var collectibles;
var asterisk;
var wallCoords = [];
var scrWidth;
var scrHeight;
var initialRotationX;
var initialRotationY;
 //This is a var rather than const in case we decide to calculate it.
var nCellsX = 10;
var nCellsY = 10;  //aspect ratio of an iphone screen is 3:2 or 1.5:1.
var speed = 2;


function preload() {
  hedgeImg = loadImage('assets/hedge1.png');
  ballImg = loadImage('assets/ball.png');

}

function setup() {
  scrWidth = windowWidth;  
  scrHeight = windowHeight; //Assigned here because we will use this a lot, and this will make it easier to change
  							 // if we want to change these values later to windowWidth or a constant	
  console.log('Width: ');	
  console.log(scrWidth);	
  var cellSize = scrWidth/nCellsX;
  hedgeImg.resize(cellSize, 0); //using 0 as one argument scales the image proportionally.

  createCanvas(scrWidth, scrHeight); 

  
  //create a user controlled sprite
  asterisk = createSprite(cellSize, cellSize);
  asterisk.addImage(ballImg);	

  initialRotationX = rotationX; //read the inital state of the gyroscope - used for calibration later
  initialRotationY = rotationY;
  
  //create 2 groups
  obstacles = new Group();
  collectibles = new Group();
  
  
  /*for(var i=0; i<4; i++)
    {
    var box = createSprite(random(0, width), random(0,height));
    box.addImage(hedgeImg);
    obstacles.add(box);
    }
  
  for(var i=0; i<10; i++)
    {
    var dot = createSprite(random(0, width), random(0,height));
    dot.addAnimation("normal", "assets/small_circle0001.png", "assets/small_circle0003.png");
    collectibles.add(dot);
    }
  */
/*
	function storeCoordinate(xVal, yVal, array) {
    	array.push({x: xVal, y: yVal});
	}


	storeCoordinate(3, 5, wallCoords);
	storeCoordinate(19, 1000, wallCoords);
	storeCoordinate(-300, 4578, wallCoords);
*/

	wallCoords.push({x: 0, y: 0});
	wallCoords.push({x: 0, y: 1});
	wallCoords.push({x: 0, y: 2});
	wallCoords.push({x: 1, y: 2});
	wallCoords.push({x: 2, y: 2});
	wallCoords.push({x: 0, y: 3});


	//wallCoords[0].x == 3   // x value
	//wallCoords[0].y == 5   // y value

// to loop through coordinate values
	for (var i = 0; i < wallCoords.length; i++) {
    	//var x = wallCoords[i].x;
    	//var y = wallCoords[i].y;

    	var box = createSprite(wallCoords[i].x * cellSize + cellSize/2, wallCoords[i].y * cellSize + cellSize/2);
    	box.addImage(hedgeImg);
    	obstacles.add(box);
	} 





}


function draw() {
  background(255,255,255);  
  console.log(asterisk.position.y);
  
  asterisk.velocity.y = (rotationX-initialRotationX) * speed - (asterisk.position.y - scrHeight/2)/100;  //note that program x maps to device y. First term is calibrated tilt.
  asterisk.velocity.x = (rotationY-initialRotationY) * speed - (asterisk.position.x - scrHeight/2)/100;  //2nd term in this formula biases the ball to the centre of the screen.

  //asterisk collides against all the sprites in the group obstacles
  asterisk.collide(obstacles);
  
  //I can define a function to be called upon collision, overlap, displace or bounce
  //see collect() below
  // asterisk.overlap(collectibles, collect)
  
  //if the animation is "stretch" and it reached its last frame
  /*if(asterisk.getAnimationLabel() == "stretch" && asterisk.animation.getFrame() == asterisk.animation.getLastFrame())
  {
    asterisk.changeAnimation("normal");
  }
  */
  
  drawSprites();
}

//the first parameter will be the sprite (individual or from a group) 
//calling the function
//the second parameter will be the sprite (individual or from a group)
//against which the overlap, collide, bounce, or displace is checked

/*function collect(collector, collected)
{
  //collector is another name for asterisk
  //show the animation
  collector.changeAnimation("stretch");
  collector.animation.rewind();
  //collected is the sprite in the group collectibles that triggered 
  //the event
  collected.remove();

}
*/
var x = 0; 
var y = 0;

var ax = 10;
var ay = 10;


function setup(){
  createCanvas(windowWidth, windowHeight);
}

function draw(){
  background(0);
  ballmove(0);

  //create the ellipse which rotates
  ellipse(rotationX+100, rotationY+100, 100, 100);


}function ballmove(){
  ax = accelerationX+100;
  ay = accelerationY+100;


}
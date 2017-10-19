var capture;
var x = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  capture = createCapture(VIDEO);
  capture.size(windowWidth, windowHeight);
  capture.hide();
  noStroke();
  for (var i = 0; i<3000; i++) {
  	x[i] = random(-1000, 200);
  }
  ellipseMode(RADIUS);

}

function draw() {
  background(210);

  image(capture, 0, 0, windowWidth, windowHeight);
  filter('INVERT');

 fill(194, 54, 98);

  for (var i = 0; i < x.length; i++){
  	x[i] += 0.5;
  	var y = i * 0.4;
  	arc(x[i], y, 12, 12, .52, 5.76)
  }

 
 // arc(x, 60, radius, radius, 0.52, 5.76);
}

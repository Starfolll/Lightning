function setup() {
  createCanvas(windowWidth,windowHeight);
  background(0);
}

var l = [];

function draw() {
  background(0,0,0,50);

  if(l.length === 0 && mouseIsPressed){
  	for(var j = 0; j < random(1,7); j++){
  		startL();
  	}
  }

  stroke(255);
  strokeWeight(3);
  for(var i = 0; i < l.length; i++){
	  l[i].show();
	  l[i].life();
  }
  cleaner();
  print(l.length);
}

function Lightning(px,py,dx,dy,s){
	this.px = px;
	this.py = py;
	this.dx = dx;
	this.dy = dy;
	this.s = s;
	this.a = 255;

	this.show = function(){
		var m = map(this.s, 100,0,255,0)
		stroke(150-m,150-m,300-m,this.a + 155);
		line(
			this.px,
			this.py,
			this.px+this.dx*this.s,
			this.py+this.dy*this.s);
	}
	this.life = function(){
		this.a -= 70;
		if(this.a < 140 && this.a > 0 && this.s > 3){
			var px = this.px+this.dx*this.s;
			var py = this.py+this.dy*this.s;
			var dx = this.dx + random(-0.4,0.4)*1.5;
			var dy = this.dy + random(-0.4,0.4)*1.5;
			var s = this.s * 4 / 5 - 3;
			nl = new Lightning(px,py,dx,dy,s);
			l[l.length] = nl;
		}
	}
}

function cleaner(){
	var newl = [];
	for(var i = 0; i < l.length; i++){
		if (l[i].a > - 155){
			newl[newl.length] = l[i];
		}
	}
	l = newl;
}

function startL(){

	var px = mouseX;
  var py = mouseY;
  var dx = random(-1,2);
  var dy = random(-1,2);
  // var dx = random(-0.5,0.5);
  // var dy = 1;
  var d = sqrt((dx*dx) + (dy*dy));
  dx /= d;
  dy /= d;
  var s = random(50,100);

  l[l.length] = new Lightning(px,py,dx,dy,s);
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

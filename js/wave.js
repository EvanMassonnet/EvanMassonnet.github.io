


var canvas_2 = document.getElementById( 'container_2' );

let settings_2 = {
  quantity : 30,
  width : 10,
  speed : 10,
  stickLength : vw / 10,
  amplitude : vw / 10,
  positionY : vh / 30, 
  colorRange: 0.8
};


var Stick = function( options ) {
  this.position = options.position;
  this.currentLength = settings_2.stickLength;
  this.direction = options.direction;
  this.positionX = options.positionX;
  this.Id = options.Id;
  this.phase = options.phase;
  this.amplitude = options.amplitude;
  this.frequency = options.frequency;
};

Stick.prototype = {

  update: function(t) {
    this.currentLength = this.direction * (settings_2.stickLength+15) + settings_2.amplitude * sin( this.frequency * (t + this.Id * (vh / 30)/100) + this.phase) * this.amplitude;
  },

  draw: function( ctx ) {
    ctx.beginPath();
    ctx.rect(vw * this.positionX / 100, this.Id * (vh / 30), this.currentLength, settings_2.width);
    var color = this.currentLength/10 + 45;
    ctx.fillStyle = 'hsl(' + color + ',' + 100 + '%,' + 50 + '%)';
    ctx.closePath();
    ctx.fill();
  }
};

var sticks_left = [];
var sticks_right = [];

var sketch_2 = Sketch.create({

  retina: 'auto',
  autoclear : true,
  container: canvas_2,

  setup: function() {
    
    var stick;

    for(var i = 0; i < settings_2.quantity; ++i){
      stick = new Stick({
        positionX : 100,   //in % : size of the screen
        phase : 0,
        amplitude: 1,
        frequency: 1,
        direction : -1,   
        Id : i, 
      });

      sticks_left.push(stick);
    }

    /*for(var i = 0; i < settings_2.quantity; ++i){
      stick = new Stick({
        positionX : 0,
        phase : 1,
        amplitude: 0.5,
        frequency: 2,
        direction : 1,
        Id : i,
      });

      sticks_right.push(stick);
    }*/
  },

  update: function() {

    
    var t;
    t = this.millis * 0.001;

    for(var i = 0; i < sticks_left.length; ++i){
      sticks_left[i].update(t);
      //sticks_right[i].update(t);
    }
  },

  draw: function() {

    for ( var i = 0, n = sticks_left.length; i < n; i++ ) {
      sticks_left[i].draw( this );
      //sticks_right[i].draw( this );
    }

  },

});



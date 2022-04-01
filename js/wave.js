


var canvas_4 = document.getElementById( 'container_4' );

let settings_4 = {
  quantity : 30,
  width : 10,
  speed : 10,
  stickLength : 100,
  amplitude : 100,
};


var Stick = function( options ) {

  this.width = options.width;
  this.position = options.position;
  this.stickLength = options.stickLength;
  this.currentLength = options.stickLength;
  this.amplitude = options.amplitude;
};

Stick.prototype = {

  update: function(t) {
    this.currentLength = this.stickLength + this.amplitude * sin(t + this.position.y/100);
  },

  draw: function( ctx ) {
    ctx.beginPath();
    ctx.rect(this.position.x, this.position.y, this.currentLength, this.width);
    var color = this.currentLength/2 + 150;
    ctx.fillStyle = 'hsl(' + color + ',' + 100 + '%,' + 50 + '%)';
    ctx.closePath();
    ctx.fill();

  }
};

var sticks_left = [];
var sticks_right = [];

var sketch_4 = Sketch.create({

  retina: 'auto',
  autoclear : true,
  //interval: 1,
  //type : 'canvas',
  container: canvas_4,

  setup: function() {
    
    var stick;

    for(var i = 0; i < settings_4.quantity; ++i){
      stick = new Stick({
        width : settings_4.width,
        stickLength : -settings_4.stickLength,
        position : {x : vw, y:i * vh / settings_4.quantity },
        amplitude : settings_4.amplitude,
      });

      sticks_left.push(stick);
    }


    for(var i = 0; i < settings_4.quantity; ++i){
      stick = new Stick({
        width : settings_4.width,
        stickLength : settings_4.stickLength,
        position : {x : 0, y:i * vh / settings_4.quantity },
        amplitude : settings_4.amplitude,
      });

      sticks_right.push(stick);
    }
  },

  update: function() {

    
    var t;
    t = this.millis * 0.001;

    for(var i = 0; i < sticks_left.length; ++i){
      sticks_left[i].update(t);
      sticks_right[i].update(t);
    }
  },

  draw: function() {

    for ( var i = 0, n = sticks_left.length; i < n; i++ ) {
      sticks_left[i].draw( this );
      sticks_right[i].draw( this );
    }

  },

});



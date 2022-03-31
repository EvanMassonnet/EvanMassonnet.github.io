
//const colorList = [{h:286,s:1.0,v:0.667}, {h:0,s:1.0,v:0.5}, {h:50,s:1.0,v:0.5}];
const colorList = [{h:286,s:1.0,v:0.667}];

const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

let settings = {
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

var sticks = [];

var sketch = Sketch.create({

  retina: 'auto',
  autoclear : true,
  //interval: 1,
  //type : 'canvas',
  container: document.getElementById( 'container' ),

  setup: function() {
    
    var stick;

    for(var i = 0; i < settings.quantity; ++i){
      stick = new Stick({
        width : settings.width,
        stickLength : settings.stickLength,
        position : {x : 0, y:i * vh / settings.quantity },
        amplitude : settings.amplitude,
      });

      sticks.push(stick);
    }
  },

  update: function() {
    var t;
    t = this.millis * 0.001;

    for(var i = 0; i < sticks.length; ++i){
      sticks[i].update(t);
    }
  },

  draw: function() {

    for ( var i = 0, n = sticks.length; i < n; i++ ) {
      sticks[i].draw( this );
    }

  },

});



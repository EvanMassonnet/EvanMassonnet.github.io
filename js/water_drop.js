//const colorList = [{h:286,s:1.0,v:0.667}, {h:0,s:1.0,v:0.5}, {h:50,s:1.0,v:0.5}];
const colorList = [{h:286,s:1.0,v:0.667}];

const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

var settings = {
  quantity : 30,
  lifeTime : 100,
  speed : 1,
  radius : 100
};


var Drop = function( options ) {

  this.position = options.position;
  this.lifeTime = options.lifeTime;
  this.speed = options.speed;
  this.radius = options.radius;
  this.currentRadius = options.currentRadius;

};

Drop.prototype = {

  update: function() {
    this.currentRadius = this.currentRadius +  this.speed/10;
  },

  draw: function( ctx ) {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.currentRadius, 0, 2 * Math.PI);
    ctx.strokeStyle = 'hsl(' + 50 + ',' + 100 + '%,' + 50 + '%)';
    ctx.globalAlpha = 1 - this.currentRadius / (this.radius+2);
    ctx.closePath();
    ctx.stroke();
  },

  isFinish(){
      return this.currentRadius >= this.radius;
  }
};

var drops = [];

var sketch = Sketch.create({

  retina: 'auto',
  container: document.getElementById( 'container' ),

  setup: function() {
    
    var drop;

    for(var i = 0; i < settings.quantity; ++i){
      drop = new Drop({
        position : {x : Math.random() * vw, y : Math.random() * vh},
        lifeTime : settings.lifeTime * random( 0.9, 1.1 ),
        speed : settings.speed * random( 0.9, 1.1 ),
        radius : settings.radius * random( 0.9, 1.1 ),
        currentRadius : random(0, settings.radius * 0.9)
      });

      drops.push(drop);
    }
  },

  update: function() {
      
    for(var i = 0; i < drops.length; ++i){
        if(drops[i].isFinish()){
            drops[i] = new Drop({
                position : {x : Math.random() * vw, y : Math.random() * vh},
                lifeTime : settings.lifeTime * random( 0.9, 1.1 ),
                speed : settings.speed * random( 0.9, 1.1 ),
                radius : settings.radius * random( 0.9, 1.1 ),
                currentRadius : 0
              });;
        }else{
            drops[i].update();
        }
    }

  },

  draw: function() {

    for ( var i = 0, n = drops.length; i < n; i++ ) {
      drops[i].draw( this );
    }

  },

});
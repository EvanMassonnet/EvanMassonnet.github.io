let settings_3 = {
  quantity : 30,
  lifeTime : 100,
  speed : 1,
  radius : 100
};

var canvas_3 = document.getElementById( 'container_3' );


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

var sketch_3 = Sketch.create({

  retina: 'auto',
  container: canvas_3,

  setup: function() {
    
    var drop;

    for(var i = 0; i < settings_3.quantity; ++i){
      drop = new Drop({
        position : {x : Math.random() * vw, y : Math.random() * vh},
        lifeTime : settings_3.lifeTime * random( 0.9, 1.1 ),
        speed : settings_3.speed * random( 0.9, 1.1 ),
        radius : settings_3.radius * random( 0.9, 1.1 ),
        currentRadius : random(0, settings_3.radius * 0.9)
      });

      drops.push(drop);
    }
  },

  update: function() {
    
      
    for(var i = 0; i < drops.length; ++i){
        if(drops[i].isFinish()){
            drops[i] = new Drop({
                position : {x : Math.random() * vw, y : Math.random() * vh},
                lifeTime : settings_3.lifeTime * random( 0.9, 1.1 ),
                speed : settings_3.speed * random( 0.9, 1.1 ),
                radius : settings_3.radius * random( 0.9, 1.1 ),
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
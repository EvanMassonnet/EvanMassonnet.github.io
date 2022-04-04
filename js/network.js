var canvas_6 = document.getElementById( 'container_6' );

let settings_6 = {
  quantity : Math.max(20, Math.floor(vh * vw / 100000)),
  radius : 7,
  speed : 0.2,
};


var NetworkCell = function( options ) {
  this.position = options.position;
  this.speed = options.speed;
};

NetworkCell.prototype = {

  update: function() {
      this.position.x += this.speed.dx ;
      this.position.y += this.speed.dy ;

      if(this.position.x > vw){
        this.position.x = 0;
      }else if(this.position.x < 0){
        this.position.x = vw;
      }

      if(this.position.y > vh){
        this.position.y = 0;
      }else if(this.position.x < 0){
        this.position.y = vh;
      }

  },

  draw: function( ctx ) {
    ctx.beginPath();
    ctx.arc(this.position.x,this.position.y, settings_6.radius, 0, 2 * Math.PI);
    ctx.fillStyle = "#9b2226";
    ctx.closePath();
    ctx.fill();
  }
};

var networkCells = [];

var sketch_6 = Sketch.create({

  retina: 'auto',
  autoclear : true,
  container: canvas_6,

  setup: function() {
    
    var networkCell;

    for(var i = 0; i < settings_6.quantity; ++i){
        networkCell = new NetworkCell({
        position : {x : Math.random() * vw, y : Math.random() * vh},
        speed : {dx : -settings_6.speed + 2 * Math.random() * settings_6.speed, dy : -settings_6.speed + 2 * Math.random() * settings_6.speed},
      });

      networkCells.push(networkCell);
    }
  },

  update: function() {
    for ( var i = 0, n = networkCells.length; i < n; i++ ) {
        networkCells[i].update();
    }
  },

  draw: function() {

    for ( var i = 0, n = networkCells.length; i < n; i++ ) {
        networkCells[i].draw( this );
    }

    for ( var i = 0, n = networkCells.length; i < n; i++ ) {
       
        for ( var j = 0, n = networkCells.length; j < n; j++ ) {
            let distance = distanceBetween(networkCells[i].position, networkCells[j].position);
            if(distance < 300){
                this.beginPath();
                this.moveTo(networkCells[i].position.x, networkCells[i].position.y);
                this.lineTo(networkCells[j].position.x, networkCells[j].position.y);
                this.strokeStyle = "rgba(155,34,38," + (300 - distance)/300 + ")";
                this.stroke();
                this.closePath();
            } 
        }
    }
  },
});

function distanceBetween(pointA, pointB){
    return Math.sqrt(Math.pow(pointA.x - pointB.x,2) + Math.pow(pointA.y - pointB.y,2));
}
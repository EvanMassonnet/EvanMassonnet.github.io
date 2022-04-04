var canvas_5 = document.getElementById( 'container_5' );

let settings_5 = {
  quantity : 30,
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
    ctx.arc(this.position.x,this.position.y, settings_5.radius, 0, 2 * Math.PI);
    ctx.fillStyle = "#9b2226";
    ctx.closePath();
    ctx.fill();
  }
};

var networkCells = [];

var sketch_5 = Sketch.create({

  retina: 'auto',
  autoclear : true,
  container: canvas_5,

  setup: function() {
    
    var networkCell;

    for(var i = 0; i < settings_4.quantity; ++i){
        networkCell = new NetworkCell({
        position : {x : Math.random() * vw, y : Math.random() * vh},
        speed : {dx : -settings_5.speed + 2 * Math.random() * settings_5.speed, dy : -settings_5.speed + 2 * Math.random() * settings_5.speed},
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
      console.log("draw");
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
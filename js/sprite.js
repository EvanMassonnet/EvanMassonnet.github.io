
function pausecomp(millis)
{
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while(curDate-date < millis);
}


let defaulImg = new Image();
defaulImg.onload = function(){
  pausecomp(100);
}
defaulImg.src = "img/GreenRobotIdle.png";




let frameSpeed = 0.1;
  
  var canvas_3 = document.getElementById( 'container_3' );
  
  
  var Sprite = function(imgName, numColumns , numRows, position, scale) {

        this.img = new Image();
        this.img.src = imgName;

        this.numColumns = numColumns;
        this.numRows = numRows;

        this.position = position;
        this.scale = scale;
        
        this.frameWidth = this.img.width / numColumns;
        this.frameHeight = this.img.height / numRows;

        this.maxFrame = numColumns * numRows - 1;

        this.currentFrame = 0;
        this.delta = 0;
  };
  
  Sprite.prototype = {
  
    update: function(t) {
      
        if(t - this.delta > frameSpeed){
            this.currentFrame++;
            this.delta = t;
        }
        if (this.currentFrame > this.maxFrame){
            this.currentFrame = 0;
        }
      
    },
  
    draw: function( ctx ) {
        let column = this.currentFrame % this.numColumns;
        let row = Math.floor(this.currentFrame / this.numColumns);

        this.frameWidth = this.img.width / this.numColumns;
        this.frameHeight = this.img.height / this.numRows;

        ctx.drawImage(this.img, column * this.frameWidth, row * this.frameHeight, this.frameWidth, this.frameHeight, vw/2 + this.position.x, vh/2 + this.position.y, this.frameWidth * this.scale, this.frameHeight * this.scale);
      },
  };
  
  var sprites = [];
  
  var sketch_3 = Sketch.create({
  
    retina: 'auto',
    container: canvas_3,
  
    setup: function() {

      sprites.push(new Sprite('img/GreenRobotIdle.png', 4, 1, {x: -20, y: 100}, 1));
      sprites.push(new Sprite('img/MainIdle.png', 4, 1, {x: 80, y:0}, 0.6));
      sprites.push(new Sprite('img/RedRobotIdle.png', 4, 1, {x: 80, y:100}, 1));
      sprites.push(new Sprite('img/GunEnemyIdle.png', 4, 1, {x: -20, y:0}, 1.2));
      sprites.push(new Sprite('img/GunIdle.png', 4, 1, {x: -120, y:0}, 1.2));
      sprites.push(new Sprite('img/OctoIdle.png', 11, 1, {x: -170, y:100}, 0.3));
    },
  
    update: function() {
        var t;
        t = this.millis * 0.001;
        for(var i = 0; i < sprites.length; ++i){
          sprites[i].update(t);
        }
        
    },
  
    draw: function() {
      for(var i = 0; i < sprites.length; ++i){
        sprites[i].draw(this);
      }
    },
  
  });


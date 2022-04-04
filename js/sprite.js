

let frameSpeed = 0.1;
  
  var canvas_3 = document.getElementById( 'container_3' );
  
  
  var Sprite = function(imgName, numColumns , numRows ) {

        console.log(imgName);
        this.img = new Image();
        this.img.src = imgName;

        this.numColumns = numColumns;
        this.numRows = numRows;
        
        this.frameWidth = this.img.width / numColumns;
        this.frameHeight = this.img.height / numRows;;

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
        ctx.drawImage(this.img, column * this.frameWidth, row * this.frameHeight, this.frameWidth, this.frameHeight, 100, 500, this.frameWidth, this.frameHeight);
      },
  };
  
  var sprite;
  
  var sketch_3 = Sketch.create({
  
    retina: 'auto',
    container: canvas_3,
  
    setup: function() {
      sprite = new Sprite('img/GreenRobotIdle.png', 4, 1);
    },
  
    update: function() {
        var t;
        t = this.millis * 0.001;
        sprite.update(t);
    },
  
    draw: function() {

      sprite.draw(this);
    },
  
  });


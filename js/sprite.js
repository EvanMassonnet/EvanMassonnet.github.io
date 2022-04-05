

let frameSpeed = 0.1;
  
  var canvas_3 = document.getElementById( 'container_3' );
  
  
  var Sprite = function(imgName, numColumns , numRows, position, scale) {

        console.log(imgName);
        this.img = new Image();
        this.img.src = imgName;

        this.numColumns = numColumns;
        this.numRows = numRows;
        this.position = position;
        this.scale = scale;
        
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
        ctx.drawImage(this.img, column * this.frameWidth, row * this.frameHeight, this.frameWidth, this.frameHeight, this.position.x, this.position.y, this.frameWidth * this.scale, this.frameHeight * this.scale);
      },
  };
  
  var sprites = [];
  
  var sketch_3 = Sketch.create({
  
    retina: 'auto',
    container: canvas_3,
  
    setup: function() {
      
      sprites.push(new Sprite('img/GreenRobotIdle.png', 4, 1, {x: vw/2-20, y:vh/2}, 1));
      sprites.push(new Sprite('img/MainIdle.png', 4, 1, {x: vw/2+80, y:vh/2-100}, 0.6));
      sprites.push(new Sprite('img/RedRobotIdle.png', 4, 1, {x: vw/2 +80, y:vh/2}, 1));
      sprites.push(new Sprite('img/GunEnemyIdle.png', 4, 1, {x: vw/2 -20, y:vh/2-100}, 1.2));
      sprites.push(new Sprite('img/GunIdle.png', 4, 1, {x: vw/2-120, y:vh/2-100}, 1.2));
      sprites.push(new Sprite('img/OctoIdle.png', 11, 1, {x: vw/2-170, y:vh/2}, 0.3));
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


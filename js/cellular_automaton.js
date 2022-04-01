let availableLaw = [9, 11, 13, 18, 22, 26, 28, 30, 39, 45, 57, 58, 60, 73, 75, 86, 89, 90, 101, 102, 105, 110, 118, 124, 135, 137, 149, 150, 182, 193, 225];

let settings_2 = {
  quantity : 10,
  size : 10,
  law : availableLaw[Math.floor(Math.random() * availableLaw.length)],
  speed : 10,
  autoReset : false,
};

var canvas_2 = document.getElementById( 'container_2' );

var Automaton = function( options ) {

  this.size = options.size;
  this.quantity = options.quantity;
  this.color = colorList[0];
  this.law = [];
  this.step = 0;

  var lawBinary = options.law.toString(2);
  var diff = 8 - lawBinary.length;
  for(var i = 0; i < diff; ++i){
    this.law.push(0);
  }
  for(var i = 0; i < lawBinary.length; ++i){
    this.law.push(parseInt(lawBinary[i]));
  }


  this.cells = [];
  var firstCell = []

  for(var i = 0; i < vh / this.size; ++i){
    firstCell.push(Math.round(Math.random()));
  }
  this.cells.push(firstCell);

};

Automaton.prototype = {

  update: function() {

    var newCells = [];
    newCells.push(0);

    var currentCell = this.cells[0];

    for(var i = 1; i < this.cells[0].length-1; ++i){
      var newCell = 0;
      if(currentCell[i-1] == 1){
        if(currentCell[i] == 1){
          if(currentCell[i+1] == 1){
            newCell = this.law[0];
          }else{
            newCell = this.law[1];
          }

        }else{
          if(currentCell[i+1] == 1){
            newCell = this.law[2];
          }else{
            newCell = this.law[3];
          }
        }

      }else{
        if(currentCell[i] == 1){
          if(currentCell[i+1] == 1){
            newCell = this.law[4];
          }else{
            newCell = this.law[5];
          }

        }else{
          if(currentCell[i+1] == 1){
            newCell = this.law[6];
          }else{
            newCell = this.law[7];
          }
        }
      }
      newCells.push(newCell);
    }
    newCells.push(0);
    this.cells.push(newCells);
    this.cells.shift();
  },

  draw: function( ctx ) {
    ctx.beginPath();
    for(var j = 0; j < vh / this.size; ++j){

      if(this.cells[0][j] == 1){
        
        var gradient = ctx.createLinearGradient(0, 0, vw, 0);
        gradient.addColorStop(0, 'black');
        gradient.addColorStop(0.5, "#371a8c");
        gradient.addColorStop(1, 'black');
        ctx.fillStyle = gradient;
        ctx.rect(this.step * this.size, j * this.size, this.size ,this.size);
        
        
      }
    }
    ctx.closePath();
    ctx.fill();
    ++this.step;
  },

  restart: function(){
    this.step = 0;
  }
};

var automa;
var compte = 0;

let oldWidth = vw;
let oldHeight = vh;

var sketch_2 = Sketch.create({

  retina: 'auto',
  interval: 1,
  container: canvas_2,
  autoclear : false,

  setup: function() {
    console.log(settings_2.law);
    automa = new Automaton({
      size : settings_2.size,
      law : settings_2.law,
      quantity : settings_2.quantity,
    });
  },

  update: function() {
    
    if(oldWidth != vw || oldHeight != vh){
      console.log("old : " + oldWidth + " new : " + vw + "  old : " + oldHeight + " new : " + vh);
      oldWidth = vw;
      oldHeight = vh;
      compte = 0;
      automa.restart();
    }

    
    if(compte < vw / settings_2.size){
      automa.update();
      ++compte;
    }
    
  },

  draw: function() {
    automa.draw(this);
  },
});


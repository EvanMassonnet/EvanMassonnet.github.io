
//const colorList = [{h:286,s:1.0,v:0.667}, {h:0,s:1.0,v:0.5}, {h:50,s:1.0,v:0.5}];
const colorList = [{h:286,s:1.0,v:0.667}];
const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

var settings = {
  quantity : 100,
  size : Math.round(vh / 100),
  law : Math.floor(Math.random() * 256),
  speed : 10,
  autoReset : false,
};


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

  for(var i = 0; i < this.quantity; ++i){
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

    for(var j = 0; j < this.quantity; ++j){

      if(this.cells[0][j] == 1){
        //ctx.fillStyle = 'hsl(' + h + ',' + s + '%,' + v + '%)';
        ctx.rect(this.step * this.size, j * this.size, this.size ,this.size);
        
      }
    }
    ctx.fill();
    ++this.step;
  }
};

var automa;
var compte = 0;

var sketch = Sketch.create({

  retina: 'auto',
  interval: 1,
  type : 'canvas',
  container: document.getElementById( 'container' ),

  setup: function() {
    automa = new Automaton({
      size : settings.size,
      law : settings.law,
      quantity : settings.quantity,
    });
  },

  update: function() {
    if(compte < 100){
      automa.update();
      ++compte;
    }else{
      sketch.toggle();
    }
    
  },

  draw: function() {
    const start = Date.now();

    automa.draw(this);

    console.log(Date.now() - start);
  },
});


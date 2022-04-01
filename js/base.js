
const colorList = [{h:200,s:1.0,v:0.667}];

const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

let settings = {
  thickness: 18,  //random
  tentacles: 40,
  friction: 0.01,
  colour: {h:220,s:1.0,v:0.667},
  length: vw * 3 / 90,
  wind: -0.5,
  amplitude: 10,
  speed: 17,
  force: 0.0,
};

var canvas_1 = document.getElementById( 'container_1' );

var utils = {

  curveThroughPoints: function( points, ctx ) {

    var i, n, a, b, x, y;
    
    for ( i = 1, n = points.length - 2; i < n; i++ ) {

      a = points[i];
      b = points[i + 1];
      
      x = ( a.x + b.x ) * 0.5;
      y = ( a.y + b.y ) * 0.5;

      ctx.quadraticCurveTo( a.x, a.y, x, y );
    }

    a = points[i];
    b = points[i + 1];
    
    ctx.quadraticCurveTo( a.x, a.y, b.x, b.y );
  }
};

var Node = function( x, y ) {
  
  this.x = this.ox = x || 0.0;
  this.y = this.oy = y || 0.0;

  this.vx = 0.0;
  this.vy = 0.0;
};

var Tentacle = function( options ) {

  this.length = options.length || 10;
  this.radius = options.radius || 10;
  this.spacing = options.spacing || 20;
  this.friction = options.friction || 0.8;
  this.shade = random( 0.80, 1.15 );
  this.color = colorList[Math.floor(Math.random() * colorList.length)];

  this.nodes = [];
  this.outer = [];
  this.inner = [];
  this.theta = [];

  for ( var i = 0; i < this.length; i++ ) {
    this.nodes.push( new Node() );
  }
};

Tentacle.prototype = {

  move: function( x, y, instant ) {
    
    this.nodes[0].x = x;
    this.nodes[0].y = y;

    if ( instant ) {

      var i, node;

      for ( i = 1; i < this.length; i++ ) {

        node = this.nodes[i];
        node.x = x;
        node.y = y;
      }
    }
  },

  update: function() {
    var number = 3;

    var i, n, s, c, dx, dy, da, px, py, node, prev = this.nodes[0];
    var radius = this.radius * settings.thickness;
    var step = radius / this.length;

    for ( i = 1, j = 0; i < this.length; i++, j++ ) {

      node = this.nodes[i];

      node.x += node.vx;
      node.y += node.vy;

      dx = prev.x - node.x;
      dy = prev.y - node.y;
      da = Math.atan2( dy, dx );

      px = node.x + cos( da ) * this.spacing * settings.length;
      py = node.y + sin( da ) * this.spacing * settings.length;

      node.x = prev.x - ( px - node.x );
      node.y = prev.y - ( py - node.y );

      node.vx = node.x - node.ox;
      node.vy = node.y - node.oy;

      node.vx *= this.friction * (1 - settings.friction);
      node.vy *= this.friction * (1 - settings.friction);

      node.vx += settings.wind;
      node.vy += settings.gravity - settings.force*i*i/100;

      node.ox = node.x;
      node.oy = node.y;

      s = sin( da + HALF_PI );
      c = cos( da + HALF_PI );

      this.outer[j] = {
        x: prev.x + c * radius,
        y: prev.y + s * radius
      };

      this.inner[j] = {
        x: prev.x - c * radius,
        y: prev.y - s * radius
      };

      this.theta[j] = da;

      radius -= step;

      prev = node;
    }
  },

  draw: function( ctx ) {

    var h, s, v, e;

    s = this.outer[0];
    e = this.inner[0];

    ctx.beginPath();
    ctx.moveTo( s.x, s.y );
    utils.curveThroughPoints( this.outer, ctx );
    utils.curveThroughPoints( this.inner.reverse(), ctx );
    ctx.lineTo( e.x, e.y );
    ctx.closePath();

    h = this.color.h * this.shade;
    s = this.color.s * 100 * this.shade;
    v = this.color.v * 100 * this.shade;

    ctx.fillStyle = 'hsl(' + h + ',' + s + '%,' + v + '%)';
    ctx.fill();

    if ( settings.thickness > 2 ) {

      v += -10;

      ctx.strokeStyle = 'hsl(' + h + ',' + s + '%,' + v + '%)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }
};

var ease = 0.1;
var modified = false;
var tentacles = [];
var center = { x:0, y:0 };
var scale = window.devicePixelRatio || 1;
var sketch_1 = Sketch.create({

  retina: 'auto',

  container: canvas_1,

  setup: function() {

    center.x = this.width / 2;
    center.y = this.height / 2;

    var tentacle;

    for ( var i = 0; i < 100; i++ ) {

      tentacle = new Tentacle({
        length: (i/5) * (i/10) + random( 10, 20 ),
        radius: random( 0.05, 1.0 ),
        spacing: random( 0.2, 1.0 ),
        friction: random( 0.7, 0.88 )
      });

      tentacle.move( center.x, center.y, true );
      tentacles.push( tentacle );
    }
  },

  update: function() {
/*
    //stop the animation if the current page is not this one 
    //avoid animation restart if you leave and come back to the page
    if(currentSlideNumber != 0){      
      sketch_1.stop();
    }
*/
    var t, cx, cy, pulse;

    t = this.millis * 0.001;

      t = this.millis;
      cx = this.width * 0.5;
      cy = this.height * 0.5;

      center.x = cx + sin( t * 0.002 ) * cos( t * 0.00005 ) * cx * 0.5;
      center.y = cy + sin( t * 0.003 ) * tan( sin( t * 0.0003 ) * 1.15 ) * cy * 0.4;

    //Gravity change :
    settings.gravity =  settings.amplitude / 100 * sin( t * settings.speed/10000)

    var px, py, theta, tentacle;
    var step = TWO_PI / settings.tentacles;

    for ( var i = 0, n = settings.tentacles; i < n; i++ ) {

      tentacle = tentacles[i];

      theta = i * step;
      
      //Tentacles screen position
      px =  vw + 30;
      py = i * vh / settings.tentacles;
      tentacle.move( px, py );
      tentacle.update();
    }
  },

  draw: function() {

    this.globalAlpha = 1.0;

    for ( var i = 0, n = settings.tentacles; i < n; i++ ) {
      tentacles[i].draw( this );
    }
  },
});
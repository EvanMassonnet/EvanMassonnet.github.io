// ------------- VARIABLES ------------- //
var ticking = false;
var isFirefox = (/Firefox/i.test(navigator.userAgent));
var isIe = (/MSIE/i.test(navigator.userAgent)) || (/Trident.*rv\:11\./i.test(navigator.userAgent));
var scrollSensitivitySetting = 30; //Increase/decrease this number to change sensitivity to trackpad gestures (up = less sensitive; down = more sensitive) 
var slideDurationSetting = 600; //Amount of time for which slide is "locked"
var currentSlideNumber = 0;


var pageList = [
    document.getElementById( 'page_1' ),
    document.getElementById( 'page_2' ),
    document.getElementById( 'page_3' ),
    document.getElementById( 'page_4' ),
];

window.addEventListener('resize', resizeAnimations);

var sketchs = [
  sketch_1,
  sketch_2,
  sketch_3,
  sketch_4,
];

let aboutPageId = 0;
let schoolProjectsPageId = 1;
let personalProjectsPageId = 3;

let aboutClick = document.getElementById("about");
let schoolProjectsClick = document.getElementById("school_projects");
let personalProjectsClick = document.getElementById("personal_projects");

aboutClick.addEventListener("click", function(){changePage(aboutPageId);}, false);
schoolProjectsClick.addEventListener("click", function(){changePage(schoolProjectsPageId);}, false);
personalProjectsClick.addEventListener("click", function(){changePage(personalProjectsPageId);}, false);


function changePage(pageId){
  if(currentSlideNumber != pageId){
    if(currentSlideNumber > pageId){
      while(currentSlideNumber != pageId){
        currentSlideNumber--;
        previousItem();
        slideDurationTimeout(slideDurationSetting);
      }
    }else{
      while(currentSlideNumber != pageId){
        currentSlideNumber++;
        nextItem();
        slideDurationTimeout(slideDurationSetting);
      }
    }
    updateAnimations();
  }
}


for(var i = 0; i < pageList.length; ++i){
  if(currentSlideNumber == i ){
    sketchs[i].start(); 
  }else{
    sketchs[i].stop();

  }
}

// ------------- DETERMINE DELTA/SCROLL DIRECTION ------------- //
function parallaxScroll(evt) {
  console.log("scroll");

  changePage(3);

  if (isFirefox) {
    //Set delta for Firefox
    delta = evt.detail * (-120);
  } else if (isIe) {
    //Set delta for IE
    delta = -evt.deltaY;
  } else {
    //Set delta for all other browsers
    delta = evt.wheelDelta;
  }

  if (ticking != true) {
    if (delta <= -scrollSensitivitySetting) {
      //Down scroll
      ticking = true;
      if (currentSlideNumber !== pageList.length - 1) {
        currentSlideNumber++;
        nextItem();
      }
      slideDurationTimeout(slideDurationSetting);
    }
    if (delta >= scrollSensitivitySetting) {
      //Up scroll
      ticking = true;
      if (currentSlideNumber !== 0) {
        currentSlideNumber--;
      }
      previousItem();
      slideDurationTimeout(slideDurationSetting);
    }
  }
  
  updateAnimations();
}

// ------------- SET TIMEOUT TO TEMPORARILY "LOCK" SLIDES ------------- //
function slideDurationTimeout(slideDuration) {
  setTimeout(function() {
    ticking = false;
  }, slideDuration);
}

// ------------- ADD EVENT LISTENER ------------- //
var mousewheelEvent = isFirefox ? "DOMMouseScroll" : "wheel";
window.addEventListener(mousewheelEvent, parallaxScroll);
document.addEventListener(mousewheelEvent, parallaxScroll)
//on phone
/*document.addEventListener("touchmove", parallaxScroll, false);
document.addEventListener("scroll", parallaxScroll, false);
window.addEventListener("touchmove", parallaxScroll, false);
window.addEventListener("scroll", parallaxScroll, false);*/

document.addEventListener("touchmove", parallaxScroll);
document.addEventListener("scroll", parallaxScroll);
window.addEventListener("touchmove", parallaxScroll);
window.addEventListener("scroll", parallaxScroll);


// ------------- SLIDE MOTION ------------- //
function nextItem() {
  //var $previousSlide = $(".background").eq(currentSlideNumber - 1);
  var previousSlide = pageList[currentSlideNumber - 1];
  previousSlide.classList.remove("up-scroll");
  previousSlide.classList.add("down-scroll");
}

function previousItem() {
  //var $currentSlide = $(".background").eq(currentSlideNumber);
  var currentSlide = pageList[currentSlideNumber];
  currentSlide.classList.remove("down-scroll");
  currentSlide.classList.add("up-scroll");
}

function updateAnimations(){
  for(var i = 0; i < pageList.length; ++i){
    if(currentSlideNumber == i ){
      sketchs[i].start(); 
    }else{
      sketchs[i].stop();
  
    }
  }
}

function resizeAnimations(){
  vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
  for(var i = 0; i < pageList.length; ++i){
    sketchs[i].clear();
  }
}


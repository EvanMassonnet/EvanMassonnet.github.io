// ------------- VARIABLES ------------- //
var ticking = false;
var isFirefox = (/Firefox/i.test(navigator.userAgent));
var isIe = (/MSIE/i.test(navigator.userAgent)) || (/Trident.*rv\:11\./i.test(navigator.userAgent));

var scrollSensitivitySetting = 30; //Increase/decrease this number to change sensitivity to trackpad gestures (up = less sensitive; down = more sensitive) 
var touchScreenSensitivitySetting = 30;
var slideDurationSetting = 600; //Amount of time for which slide is "locked"
var currentSlideNumber = 0;
var firstTouchPosition = -1;

var pageList = [
    document.getElementById( 'page_1' ),
    document.getElementById( 'page_2' ),
    document.getElementById( 'page_3' ),
    document.getElementById( 'page_4' ),
    document.getElementById( 'page_5' ),
    document.getElementById( 'page_6' ),
    document.getElementById( 'page_7' ),
    document.getElementById( 'page_8' ),
    document.getElementById( 'page_9' ),
    document.getElementById( 'page_10' ),
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
let personalProjectsPageId = 5;

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


for(var i = 0; i < sketchs.length; ++i){
  if(currentSlideNumber == i ){
    sketchs[i].start(); 
  }else{
    sketchs[i].stop();

  }
}

// ------------- DETERMINE DELTA/SCROLL DIRECTION ------------- //
function parallaxScrollMouse(evt){
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

  if (!ticking) {
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

function parallaxScrollTouchScreen(evt){

  if (!ticking) {
    if(firstTouchPosition != -1){
      let delta = evt.changedTouches[0].pageY - firstTouchPosition;
      console.log(delta);
      if (delta <= -touchScreenSensitivitySetting) {
        if (currentSlideNumber !== pageList.length - 1) {
          currentSlideNumber++;
          nextItem();
        }
        slideDurationTimeout(slideDurationSetting);
      }
      if (delta >= touchScreenSensitivitySetting) {
        if (currentSlideNumber !== 0) {
          currentSlideNumber--;
        }
        previousItem();
        slideDurationTimeout(slideDurationSetting);
      }
    }else{
      firstTouchPosition = evt.targetTouches[0].pageY
    }
  }
}



// ------------- SET TIMEOUT TO TEMPORARILY "LOCK" SLIDES ------------- //
function slideDurationTimeout(slideDuration) {
  setTimeout(function() {
    ticking = false;
    firstTouchPosition = -1;
  }, slideDuration);
}

// ------------- ADD EVENT LISTENER ------------- //
var mousewheelEvent = isFirefox ? "DOMMouseScroll" : "wheel";
document.addEventListener(mousewheelEvent, parallaxScrollMouse);
document.addEventListener("touchstart", parallaxScrollTouchScreen);
document.addEventListener("touchend", parallaxScrollTouchScreen);






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
  for(var i = 0; i < sketchs.length; ++i){
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
  for(var i = 0; i < sketchs.length; ++i){
    sketchs[i].clear();
  }
}


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
]

// ------------- DETERMINE DELTA/SCROLL DIRECTION ------------- //
function parallaxScroll(evt) {
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
  console.log(currentSlideNumber);
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
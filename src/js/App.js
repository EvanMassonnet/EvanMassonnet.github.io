document.addEventListener("DOMContentLoaded", function () {
    var splide = new Splide(".splide", {
      ype: "fade",
      rewind: true,
    });
    splide.mount();
  });


const observer = new IntersectionObserver((entries)=> {
    entries.forEach((entry) =>{
        if (entry.isIntersecting) {
            entry.target.classList.add('play');
        } else {
            entry.target.classList.remove('play')
        }
    }); 
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el)=> observer.observe(el));

console.log('Hi')
// Function Wes Bos added so that checkSlide function doesn't fire on every window scroll
function debounce(func, wait = 20, immediate = true) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  // Select all the images
  const sliderImages = document.querySelectorAll('.slide-in');
  
  function checkSlide(event) {
    // console.count(event) // To see how many times scroll fires as an event listener
    // console.log(window.scrollY); // tells us how far we've scrolled down from top of browser
      sliderImages.forEach(sliderImage => {
        // Halfway through the image
        const slideInAt = (window.scrollY + window.innerHeight) - sliderImage.height / 2;
        // Bottom of image
        const imageBottom = sliderImage.offsetTop + sliderImage.height;
        const isHalfShown = slideInAt > sliderImage.offsetTop;
        const isNotScrolledPast = window.scrollY < imageBottom;
        if (isHalfShown && isNotScrolledPast) {
            sliderImage.classList.add('active');
        }else {
            sliderImage.classList.remove('active');
        }
      });
  }


  window.addEventListener('scroll', debounce(checkSlide));
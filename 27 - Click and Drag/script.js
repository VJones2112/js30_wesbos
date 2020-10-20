// Variables
const slider = document.querySelector('.items');
let isDown = false;
let startX;
let scrollLeft;


/// Event Listeners
slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
});

slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
});

slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft; // Recalculate on mousemove
    const walk = (x - startX) * 3; // *3 gives a faster scroll
    slider.scrollLeft = scrollLeft - walk;
});




const divs = document.querySelectorAll('div');
const button = document.querySelector('button');

function logText(e) {
    console.log(this.classList.value);
    // e.stopPropagation(); // Stops bubbling
}
// document.body.addEventListener('click', logText);
divs.forEach(div => div.addEventListener('click', logText, {
    capture: false,
    once: true 
    //listens for click and unbinds itself(removes event listener) sot it only fires once
}));

button.addEventListener('click', () => {
    console.log('Click!!!!!');
}, {
    once: true
})



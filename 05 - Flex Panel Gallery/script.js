const panels = document.querySelectorAll('.panel'); //gives a node list

function toggleOpen() {
//    console.log('hello'); // to debug
    this.classList.toggle('open');
}

function toggleActive(e) {
//    console.log(e.propertyName); // to debug
    if(e.propertyName.includes('flex')) {
       this.classList.toggle('open-active')
       }
}

panels.forEach(panel => panel.addEventListener('click', toggleOpen)); 
// Above don't use toggleOpen() that would run on page load instead
// we want to reference the function once it's clicked. OHHHHHH!

panels.forEach(panel => panel.addEventListener('transitionend', toggleActive));
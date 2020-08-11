// This function plays the sounds.
function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    if(!audio) return; // stop the function from running altogether
    audio.currentTime = 0; // rewind to start
    audio.play();
    key.classList.add('playing');
};

// This function removes the transform class.
function removeTransition(e) {
    if (e.propertyName !== 'transform') return; //skip if not transform
    this.classList.remove('playing'); //this is equal to the key (what got called against it)
}

const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));

// Listen for key event and add event listener ***Should I use doc or window below?
window.addEventListener('keydown', playSound) 
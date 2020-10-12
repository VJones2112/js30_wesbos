const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

// Gets the value of whatever you enter in the text area
msg.text = document.querySelector('[name="text"]').value;

// To get all the voice options allowed
function populateVoices() {
    voices = this.getVoices();
    voicesDropdown.innerHTML = voices
        // .filter(voice => voice.lang.includes('en')) // for only English voices Boo!
        .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
        .join('');  
}

// To be able to select a certain voice
function setVoice() {
    msg.voice = voices.find(voice => voice.name === this.value);
    toggle();
}

// To change the voices
function toggle(startOver = true) { //true by default so change to false if you don't want it
    speechSynthesis.cancel();
    if (startOver) {
        speechSynthesis.speak(msg);
    }
}

// Finds all the options (rate, pitch, textarea)
function setOption() {
    console.log(this.name, this.value);
    msg[this.name] = this.value;
    toggle();
};


// Event listeners
speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('change', setOption));
speakButton.addEventListener('click', toggle);
stopButton.addEventListener('click', () => toggle(false));
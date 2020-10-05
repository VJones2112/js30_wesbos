
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;


const recognition = new SpeechRecognition();
recognition.interimResults = true; // necessary for as you are speaking it populates vs. having to stop before it populates

let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);

recognition.addEventListener('result', e => {
    // console.log(e.results); // gives a list of results
    const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

        p.textContent = transcript; // to log the transcript to the DOM
        if (e.results[0].isFinal) {
            p = document.createElement('p');
            words.appendChild(p);
        }
        if (transcript.includes('unicorn')) {
            console.log('I love unicorns!')
        }
    console.log(transcript);
});

recognition.addEventListener('pause', recognition.start); //when it ends, call this
    //end doesn't work at all, pause/stop won't restart

recognition.start();
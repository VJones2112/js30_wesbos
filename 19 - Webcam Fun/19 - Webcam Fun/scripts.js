const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');
const filterChoices = document.querySelectorAll('.filters');
let filterSelection;

// Wes' code didn't work
// function getVideo() {
//     navigator.mediaDevices.getUserMedia({video: true, audio: false}) //returns a promise
//         .then(localMediaStream => {
//             console.log(localMediaStream);
//             video.src = window.URL.createObjectURL(localMediaStream);
//             // video.play();
//         });
// }

function getVideo() {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia
        || navigator.mozGetUserMedia;
    //enabling video and audio channels 
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(stream => {
        video.srcObject = stream;
        video.play();
    })
    .catch(err => {
        console.error(`OH NO!!!`, err);
    })
};

function paintToCanvas() {
    let width = video.videoWidth || video.width;
    let height = video.videoHeight || video.height;
    canvas.width = width;
    canvas.height = height;
    setInterval(() => { // return so that you can call clear interval
        ctx.drawImage(video, 0, 0, width, height); // pass in video element, start at 0,0 and draw the width and height
        // Take pixels out
        let pixels = ctx.getImageData(0, 0, width, height);
        // Mess with the pixels
        if (filterSelection === 'vignette') {
            pixels = areYouAfraidOfTheDark(pixels); //VIGNETTE
        } else if (filterSelection === 'redEffect') {
            pixels = redEffect(pixels); //RED EFFECT
        } else if (filterSelection === 'blackWhite') {
            pixels = blackAndWhite(pixels); //BLACK AND WHITE
        } else if (filterSelection === 'rgbSplit') {
            pixels = rgbSplit(pixels); // SPLIT GHOST EFFECT
            ctx.globalAlpha = 1; // SPLIT GHOST EFFECT
        };
        // else if (filterSelection === 'greenScreen') { //**********Didn't actually make this button */
            // pixels = greenScreen(pixels); // GREEN SCREEN
        //}
        ctx.putImageData(pixels, 0, 0); // Put pixels back
        //console.log(pixels); // Shows us the HUGE array of RGBA entry per pixel
        //debugger;
    }, 16);
};

function takePhoto() {
    snap.currentTime = 0;
    snap.play();
    const data = canvas.toDataURL('image/jpeg');     //take data out of canvas
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'handsome'); // Have to change elsewhere to if want to change handsome
    link.innerHTML = `<img src="${data}" alt="Lovely lady" />`;
    strip.insertBefore(link, strip.firstChild);
}

// Get filter choice
filterChoices.forEach(element => element.addEventListener('click', (e) => {
    e.stopPropagation();
    filterSelection = e.target.id;
    console.log(e.target.id);
    paintToCanvas();
}));

function redEffect(pixels) {
    for(let i = 0; i < pixels.data.length; i+=4) { //+=4 for rgba
        pixels.data[i + 0] = pixels.data[i + 0] + 250; // red (og +100)
        pixels.data[i + 1] = pixels.data[i + 1] - 75; // green (og -50)
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // blue (og *0.5)
    }
    return pixels;
};

function rgbSplit(pixels) {
    for(let i = 0; i < pixels.data.length; i+=4) { //+=4 for rgba
        pixels.data[i - 450] = pixels.data[i + 0]; // red (og +100)
        pixels.data[i + 500] = pixels.data[i + 1]; // green (og -50)
        pixels.data[i - 550] = pixels.data[i + 2]; // blue (og *0.5)
    }
    return pixels;
}

function greenScreen(pixels) {
    const levels = {};
    document.querySelectorAll('.rgb input').forEach((input) => {
        levels[input.name] = input.value;
    });

    for(let i = 0; i < pixels.data.length; i+=4) {
        red = pixels.data[i + 0];
        green = pixels.data[i + 1];
        blue = pixels.data[i + 2];
        alpha = pixels.data[i + 3];

        if (red >= levels.rmin
            && green >= levels.gmin
            && blue >= levels.bmin
            && red <= levels.rmax
            && green <= levels.gmax
            && blue <= levels.bmax) {
            // Take it out! (So it's transparent)
            pixels.data[i + 3] = 0;
            }
    }
    return pixels;
};

function areYouAfraidOfTheDark(pixels) {
    for(let i = 0; i < pixels.data.length; i+=4) { //+=4 for rgba
        pixels.data[i + 0] = pixels.data[i + 0] - 150; // red (og +100)
        pixels.data[i + 1] = pixels.data[i + 1] - 75; // green (og -50)
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // blue (og *0.5)
    }
    return pixels;
};

function blackAndWhite(pixels) { // Nope, not yet
    for(let i = 0; i < pixels.data.length; i+=4) { //+=4 for rgba
        pixels.data[i + 0] = 'black'; // red (og +100)
        pixels.data[i + 1] = 'white'; // green (og -50)
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5;; // blue (og *0.5)
        pixels.data[i + 3] = pixels.data[i + 3] + 200; // just seems to affect transparency
    }
    // pixels.data[i + 0] = pixels.data[i + 0] - 110; // red (og +100)
    //     pixels.data[i + 1] = pixels.data[i + 1] + 10; // green (og -50)
    //     pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // blue (og *0.5)
    //     pixels.data[i + 3] = pixels.data[i + 3] * 1.5; // just seems to affect transparency
    // }
    return pixels;
}

getVideo();

// Event Listeners
video.addEventListener('canplay', paintToCanvas);
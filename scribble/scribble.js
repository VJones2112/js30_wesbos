// Declare the Variables
const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth; 
canvas.height = window.innerHeight; 

// Drawing elements
ctx.lineJoin = 'round'; // Look at options on MDN
ctx.lineCap = 'round'; // I like it w/o these options too
ctx.globalCompositeOperation = 'xor'; // Blend modes for when colors overlap // xor is awesome Bos originally had multiply
const lineChoices = document.querySelectorAll('.lineWidths');
const colorSchemes = document.querySelectorAll('.colorSchemes');

let isDrawing = false; // Only draws when cursor is down
let direction = true; // Building up
let lastX = 0; // To draw a line, you need a starting
let lastY = 0; // x,y and an ending x,y
let hue = 0;


// This lets me change the lineWidth according to button
lineChoices.forEach(element => element.addEventListener('click', (e) => {
    lineWidth = element.id;
    draw();
}))


// This lets me change the colorScheme according to button
colorSchemes.forEach(element => element.addEventListener('click', (e) => {
    colorScheme = element.id;
    draw();
}))


// The Actual Drawing Function
function draw(event) {
    if(!isDrawing) return; // Stop the function from running when not moused down
    ctx.beginPath(); // Starts the line but won't see it yet
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(event.offsetX, event.offsetY);
//    ctx.stroke(); // Won't see anything on page until you call stroke
    [lastX, lastY] =  [event.offsetX, event.offsetY]; // Destructuring an array
    hue++; // Changes the hue color as you draw the line
    if(hue >= 360) {
        hue = 0; // Resets, important for the line width
    }
    if (lineWidth === 'lineWidthProgressive') {
        if(ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
        direction = !direction;
        };
        if(direction) {
            ctx.lineWidth++; //increment the line width each time 
        } else {
            ctx.lineWidth--;
        } 
    }
    if (lineWidth === 'lineWidthThick') {
        ctx.lineWidth = 50;
    };
    if (lineWidth === 'lineWidthThin') {
        ctx.lineWidth = 10;

    };     
    if (colorScheme === 'colorBold') {
        ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;  // BOLD
    };
    if (colorScheme === 'colorPastel') {
        ctx.strokeStyle = `hsl(${hue}, 90%, 80%)`; // PASTEL
    };
    ctx.stroke(); 
} // end of draw function


canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', () => {
    isDrawing = true;
     [lastX, lastY]=  [event.offsetX, event.offsetY];
});
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false); // So if you leave window and come back, doesn't keep drawing, it restarts instead



// Reset Canvas WORKS!!!
document.getElementById('reset').addEventListener('click', () => ctx.clearRect(0, 0, canvas.width, canvas.height))



// The background CSS variable WORKS!!!!
let backgroundColor = document.getElementById('background').addEventListener('change', colorUpdate)


function colorUpdate() {
    const suffix = this.dataset.sizing || '';
    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix)
}
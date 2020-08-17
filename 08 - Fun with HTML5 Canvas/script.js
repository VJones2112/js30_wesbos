// Declare the Variables
const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth; // Sets width to window instead of default
canvas.height = window.innerHeight; // Sets height to window instead of default
// Below are drawing elements
ctx.strokeStyle = '#BADA55'; // Color we'll start with
ctx.lineJoin = 'round'; // Look at options on MDN
ctx.lineCap = 'round'; // I like it w/o these options too
ctx.lineWidth = 40;
ctx.globalCompositeOperation = 'xor'; // Blend modes for when colors overlap
    // xor is awesome Bos originally had multiply

// Dummy variables
let isDrawing = false; // Only draws when cursor is down
let lastX = 0; // To draw a line, you need a starting
let lastY = 0; // x,y and an ending x,y
let hue = 0;
let direction = true; // Building up


// The Actual Drawing Function
function draw(event) {
    if(!isDrawing) return; // Stop the function from running when not moused down
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
//    ctx.lineWidth = hue;
    ctx.beginPath(); // Starts the line but won't see it yet
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke(); // Won't see anything on page until you call stroke
    [lastX, lastY]=  [event.offsetX, event.offsetY]; // Destructuring an array
    hue++; // Changes the hue color as you draw the line
    if(hue >= 360) {
        hue = 0; // Resets, important for the line width
    }
    if(ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
        direction = !direction;
    }
    if(direction) {
        ctx.lineWidth++; //increment the line width each time   
    } else {
        ctx.lineWidth--;
    }
    
}

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', () => {
    isDrawing = true;
     [lastX, lastY]=  [event.offsetX, event.offsetY];
});
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false); // So if you leave window and come back, doesn't keep drawing, it restarts instead

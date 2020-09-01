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
var touchX, touchY;

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
//    getTouchPosition();
//    draw(ctx, touchX, touchY, lineChoices);
    ctx.beginPath(); // Starts the line but won't see it yet
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(event.offsetX, event.offsetY);
//    ctx.stroke(); // Won't see anything on page until you call stroke
    [lastX, lastY] =  [event.offsetX, event.offsetY]; // Destructuring an array
    hue++; // Changes the hue color as you draw the line
    linesAndColors();

    ctx.stroke(); 
//    event.preventDefault();
} // end of draw function

// This function works but with black nipple
function drawCircle(ctx, x, y, size) {
//    getTouchPosition();
//    ctx.fillStyle = 'hue';
//    hue++;
    ctx.beginPath();
//    ctx.arcTo(x, y, touchX, touchY, size); 
    ctx.arc(x, y, size, 0, 2* Math.PI); 
    //arcTo didn't work above?
    //x, y, radius, start angle, end angle, clockwise = true, counterclockwise = false //200, 150, 100
//    ctx.stroke()
    ctx.closePath();
//    ctx.fill();
}

// Below doesn't work
//function touchDrawLine(event) {
//    getTouchPosition();
//    ctx.beginPath(); // Starts the line but won't see it yet
//    ctx.moveTo(lastX, lastY);
//    ctx.lineTo(event.offsetX, event.offsetY);
//    [lastX, lastY] =  [event.offsetX, event.offsetY]; 
//    hue++;
//    linesAndColors();
//
//    ctx.stroke(); 
//    event.preventDefault();
//}

// Separated these options into their own function
function linesAndColors() {
    if(hue >= 360) {
        hue = 0; // Resets, important for the line width
    }
    if (typeof lineWidth === 'undefined') {
        lineWidth = 50;
    };
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
    if (lineWidth === undefined){
        ctx.lineWidth = 50;
    }
    if (typeof colorScheme === 'undefined') {
        colorScheme = 'black';
    };
    if (colorScheme === 'colorBold') {
        ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;  // BOLD
    } 
    if (colorScheme === 'colorPastel') {
        ctx.strokeStyle = `hsl(${hue}, 90%, 80%)`; // PASTEL
    } 
}


function getTouchPosition(e) {
    if (!e) 
        var e = event;
    if (e.touches) {
        if (e.touches.length == 1) {
            var touch = e.touches[0];
            touchX = touch.pageX-touch.target.offsetLeft;
            touchY = touch.pageY-touch.target.offsetTop;
        }
    }
}



// Reset Canvas WORKS!!!
document.getElementById('reset').addEventListener('click', () => ctx.clearRect(0, 0, canvas.width, canvas.height))



// The background CSS variable WORKS!!!!
let backgroundColor = document.getElementById('background').addEventListener('change', colorUpdate)


function colorUpdate() {
    const suffix = this.dataset.sizing || '';
    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix)
}


// Event Listeners for Mouse
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', () => {
    isDrawing = true;
     [lastX, lastY]=  [event.offsetX, event.offsetY];
});
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false); // So if you leave window and come back, doesn't keep drawing, it restarts instead






/**********************************************
**********************************************/
// Draw Function for Touchscreen
// Declare the Variables
//var touchX, touchY;

//// This lets me change the lineWidth according to button
//lineChoices.forEach(element => element.addEventListener('click', (e) => {
//    lineWidth = element.id;
//    draw();
//}))
//
//
//// This lets me change the colorScheme according to button
//colorSchemes.forEach(element => element.addEventListener('click', (e) => {
//    colorScheme = element.id;
//    draw();
//}))
//
//let touchX, touchY;
//
function drawTouch(event) {
//    console.log('touchstart');
//    if(!isDrawing) return; 
    getTouchPosition();
    isDrawing = true;
//    ctx.fillStyle = hue;
//    [touchX, touchY]=  [touch.offsetX, touch.offsetY];
    drawCircle(ctx, touchX, touchY, 1); // Doesn't work when I put 'lineWidth'
//    touchDrawLine(); // Keep getting the can't use offsetX for undefined so not working
//    draw(); // this keeps not working!
    hue++;
    linesAndColors();
  
    ctx.stroke(); 
    event.preventDefault();
} // end of draw function

// Event Listeners for Touchscreen

//lineChoices.forEach(element => element.addEventListener('click', (e) => {
//    lineWidth = element.id;
//    drawTouch();
//}))


// This lets me change the colorScheme according to button
//colorSchemes.forEach(element => element.addEventListener('click', (e) => {
//    colorScheme = element.id;
//    drawTouch();
//}))

// Event Listeners for Touch?
canvas.addEventListener('touchmove', drawTouch);
canvas.addEventListener('touchstart', drawTouch);
//canvas.addEventListener('touchstart', () => {
//    isDrawing = true;
//    isDrawing = true;
//     [touchX, touchY]=  [touch.offsetX, touch.offsetY];
//});
/*
canvas.addEventListener('touchstart', () => {
    isDrawing = true;
     [lastX, lastY]=  [event.offsetX, event.offsetY];
});
*/

//canvas.addEventListener('touchend', () => isDrawing = false);
//canvas.addEventListener('mouseout', () => isDrawing = false); // So if you leave window and come back, doesn't keep drawing, it restarts instead



//How would below work on touch screen?
//canvas.addEventListener('mouseout', () => isDrawing = false); // So if you leave window and come back, doesn't keep drawing, it restarts instead
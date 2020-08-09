// Declare variables
const secondHand = document.querySelector('.second-hand');
const minuteHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');

function setDate() {
    const now = new Date();
    const seconds = now.getSeconds();
    const secondsDegrees = ((seconds / 60) * 360) + 90;
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
    const minutes = now.getMinutes();
    const minutesDegrees = ((minutes / 60)* 360) + 90;
    minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
    const hours = now.getHours();
    const hoursDegrees = ((hours / 12) * 360) + 90;
    hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
    console.log(seconds + ' seconds ' + minutes  + ' minutes');
    const hands = document.querySelectorAll('.hand');
    // Remove the back ticky thing at 60seconds;
    if (seconds === 0) {
        hands.forEach(hand => hand.style.transitionDuration = '0s');
    } else {
      hands.forEach(hand => hand.style.transitionDuration = '0.05s');
}
}

setInterval(setDate, 1000);
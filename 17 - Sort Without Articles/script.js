const bands = ['The Plot in You', 'The Devil Wears Prada', 'Pierce the Veil', 'Norma Jean', 'The Bled', 'Say Anything', 'The Midway State', 'We Came as Romans', 'Counterparts', 'Oh, Sleeper', 'A Skylit Drive', 'Anywhere But Here', 'An Old Dog', 'Rush'];

const sortedBands = bands.sort((a, b) => strip(a) > strip(b) ? 1 : -1);

function strip(bandName) {
    return bandName.replace(/^(a |the |an )/i, '').trim();
};

//console.log(sortedBands);

// Push out to the ul
document.getElementById('bands').innerHTML = 
    sortedBands.map(band => `<li>${band}</li>`).join(''); // without join, shows the comma in the array

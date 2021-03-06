const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

// Set up for a blank array
const cities = [];

// Returns blob of data
fetch(endpoint)
    .then(blob => blob.json())
    .then(data => cities.push(...data));


// Match search queries to array results
function findMatches(wordToMatch, cities) {
    return cities.filter(place => {
        //figure out if city | state matches what was searched
    const regex = new RegExp(wordToMatch, 'gi');
    return place.city.match(regex) || place.state.match(regex)
    })
}

// Display the results
function displayMatches() {
    const matchArray = findMatches(this.value, cities);
    const html = matchArray.map(place => {
        const regex = new RegExp(this.value, 'gi');
        const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
        const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`)
        return `
            <li>
                <span class="name">${cityName},${stateName}</span>
                <span class="population">${numberWithCommas(place.population)}</span>
            </li>`
        ;
    }).join(''); // so that the array returns one string instead of multiple items
    suggestions.innerHTML = html;
}


// Display the results WITH COMMAS
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches)
searchInput.addEventListener('input', displayMatches)




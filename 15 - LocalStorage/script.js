const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || []; // Checks for existing and if not there empty array

function addItem(e) {
    e.preventDefault(); // So page doesn't refresh each time we add
    const text = (this.querySelector('[name=item]')).value; // this is the form, specifically looking for 'item'
    const item = {
        text, // ES6 shorthand to just write the var name
        done: false
    };
    console.log(item);
    items.push(item); // Adding the item into the items array
    populateList(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items));
    this.reset(); // Form elements have a method called reset
    
}

function populateList(plates = [], platesList) { // Set default to empty so if you don't add, won't break JS, just loop over it
    platesList.innerHTML = plates.map((plate, i) => {
        return `
        <li>
            <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? "checked" : ''}/>
            <label for="item${i}">${plate.text}</label>
        </li>
        `;
    }).join(''); // .join takes the array and turns it into one big string
}

function toggleDone(e) {
    // console.log(e); // two items were popping up
    if(!e.target.matches('input')) return; // skip this unless it's an input
    const el = e.target;
    const index = el.dataset.index;
    items[index].done = !items[index].done; // Switches between true and false
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
    // console.log(el.dataset.index); // Shows the index of corresponding item in array
    // console.log(e.target); // Shows we're clicking both the label and the input
}

function toggleAll(e) {
    
    for (let j = 0; j < items.length; j++) {
        const el = e.target;
        // const index = el.dataset.index;
        // items[index].done = !items[index].done;
        if (j.done) {
            !j.done;
        }else {
            j.done;
        }
        console.log('clicked');
    }
    // console.log('clicked');
    
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);
document.getElementById('toggleAll').addEventListener('click', toggleAll)
populateList(items, itemsList);
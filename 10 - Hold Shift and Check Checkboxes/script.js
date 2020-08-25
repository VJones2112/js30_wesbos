const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');
let lastChecked;
let inBetween = false;
let selectAll = document.querySelector('.selectAll input[type="checkbox"]');

function shiftSelect(event) {
    if (event.shiftKey && this.checked) {
        checkboxes.forEach(checkbox => {
            if (checkbox === this || checkbox === lastChecked) { // 'This' is the one we checked first
                inBetween = !inBetween;
            }
            if (inBetween) {
                checkbox.checked = true;
            }
        });
    }
    lastChecked = this;
}

function selectAllBoxes() {
    if (this.checked) {
        checkboxes.forEach(checkbox => {
            checkbox.checked = true;
        });
    } else {
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        })
    }
    // selectAll = this; // Do I not need to identify it after all?
}

// Add Event Listener for Shift + Select
checkboxes.forEach(checkbox => checkbox.addEventListener('click', shiftSelect))
selectAll.addEventListener('click', selectAllBoxes);
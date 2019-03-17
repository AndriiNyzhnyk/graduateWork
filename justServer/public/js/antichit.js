let paymentForm = document.getElementById('paymentForm');

let listBadEvents = [
    'keydown',
    'keyup',
    'keypress'
];


listBadEvents.forEach((item) => {
    paymentForm.addEventListener(`${item}`, (e) => {
        // without change text
        // e.preventDefault();

        // base stop
        // e.stopPropagation();

        // totally stop
        e.stopImmediatePropagation();
        console.log('stop following');
    });
});

general version
for (let key in getEventListeners(document)) {
    getEventListeners(document)[key].forEach(function(c) {
        c.remove()
    })
}


// function reCreateNode(el, withChildren) {
//     if (withChildren) {
//         el.parentNode.replaceChild(el.cloneNode(true), el);
//     }
//     else {
//         let newEl = el.cloneNode(false);
//         while (el.hasChildNodes()) newEl.appendChild(el.firstChild);
//         el.parentNode.replaceChild(newEl, el);
//     }
// }

// Remove event listeners on one element:
// reCreateNode(paymentForm);

// Remove event listeners on an element and all of its children:
// reCreateNode(paymentForm, true);
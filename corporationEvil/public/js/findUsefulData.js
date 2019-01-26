const url = 'http://localhost:8000/setListUsefulSelector';

const listUsefulSelector = {
    id : [
        'firstName',
        'lastName',
        'auth'
    ],
    class: []
};


let data = {
    id: [],
    class: []
};

listUsefulSelector.id.forEach( (elem) => {
    findElements('id', elem);
});

listUsefulSelector.class.forEach( (elem) => {
    findElements('class', elem);
});

sendData(url, data);
console.log(data);


function findElements(selector, elem) {
    if(selector === 'id') {
        let item = document.getElementById(elem);

        if(item !== null) {
            data.id.push({[item.id]: item.value});
        }

    } else {
        let items = document.getElementsByClassName(elem);

        if(items.length !== 0) {
            data.class.push(items);
        }
    }
}

function sendData(url, data) {
    fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            // 'auth': '1234',
            // 'Access-Control-Allow-Origin':'*'
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: JSON.stringify(data)
    })
        .then(function (data) {
            console.log('Request success: ', data);
        })
        .catch(function (error) {
            console.log('Request failure: ', error);
        });



    // fetchJsonp(url, {
    //         // method: 'POST',
    //         // // mode: 'cors',
    //         // headers: {
    //         //     'auth': '1234',
    //         //     // 'Access-Control-Allow-Origin':'*'
    //         // },
    //         body: JSON.stringify(data)
    //     })
    //         .then(function (data) {
    //             console.log('Request success: ', data);
    //         })
    //         .catch(function (error) {
    //             console.log('Request failure: ', error);
    //         });


    // $.ajax({
    //     method: 'POST',
    //     url: url,
    //     // dataType: 'jsonp', //change the datatype to 'jsonp' works in most cases
    //     data: JSON.stringify(data),
    //     success: (res) => {
    //         console.log(res);
    //     }
    // })
}
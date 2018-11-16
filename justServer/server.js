const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const app = express();


app.set('port', process.env.PORT || 3000);

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {
    res.cookie('someCookieGoodServer1', 'hello my friends', {
        path: '/',
        secure: false
    });

    console.log('setCookie');

    res.sendFile(__dirname + '/public/mainPage.html');
});

app.get('/somePage1', (req, res) => {
    res.cookie('someCookieGoodServer2', 'hello my bos', {
        path: '/',
        secure: false
    });

    console.log('setCookie');

    res.sendFile(__dirname + '/public/somePage1.html');
});

app.get('/admin', (req, res) => {
    res.sendFile(__dirname + '/adminPanel/index.html');
});


process.on('unhandledRejection', (reason, p) => {
    console.error('Unhandled Rejection at:', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
});

process.on('uncaughtException', (err) => {
    console.error(err, 'Uncaught Exception thrown');
    process.exit(1);
});

app.listen(app.get('port'), () => {
    console.log( 'Express запущенний на http://localhost:' +
        app.get('port') + '; нажміть Ctrl+C для завершення.' );
});
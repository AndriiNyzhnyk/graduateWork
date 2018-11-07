const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const app = express();


app.set('port', process.env.PORT || 3000);

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
});

app.get('/somePage1', (req, res) => {
    res.sendFile(__dirname + '/public/somePage1.html')
});


app.listen(app.get('port'), () => {
    console.log( 'Express запущенний на http://localhost:' +
        app.get('port') + '; нажміть Ctrl+C для завершення.' );
});
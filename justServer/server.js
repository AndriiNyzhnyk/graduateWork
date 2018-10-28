let express = require('express');
let app = express();

app.set('port', process.env.PORT || 8000);

app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {
    res.send(__dirname + '/public/index.html');
});


app.listen(app.get('port'), () => {
    console.log( 'Express запущенний на http://localhost:' +
        app.get('port') + '; нажміть Ctrl+C для завершення.' );
});
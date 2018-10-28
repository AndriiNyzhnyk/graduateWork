let express = require('express');
let app = express();

app.set('port', process.env.PORT || 3000);

app.use((req, res, next) => {
    res.cookie('user', 'www',
        {
            path: '/'
            // httpOnly: true
        });
    next();
});
app.use(express.static(__dirname + '/public'));

app.get("/", (req, res) => {
    res.send('Hello World');
});


app.listen(app.get('port'), () => {
    console.log( 'Express запущенний на http://localhost:' +
        app.get('port') + '; нажміть Ctrl+C для завершення.' );
});
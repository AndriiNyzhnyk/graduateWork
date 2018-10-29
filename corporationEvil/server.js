const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const security = require('./securityKey');

const app = express();

app.set('port', process.env.PORT || 8000);

app.use(cookieParser(security.cookieSecret));

app.use((req, res, next) => {
    setCookie(res);
    next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    res.send('Hello World');
});

// function
function checkCookie(req) {
    return req.signedCookies.user === security.myCookie;
}

function setCookie(res) {
    res.cookie('user', security.myCookie,
        {
            signed: true,
            path: '/'
            // httpOnly: true
        });
    console.log('setCookie');
}

// Обробник 404 помилки
app.use((req, res, next) => {
    res.status(404);
    res.render('404.hbs')
});

// Обробник 500 помилки
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500);
    res.render('500.hbs');
});


app.listen(app.get('port'), () => {
    console.log( 'Express запущенний на http://localhost:' +
        app.get('port') + '; нажміть Ctrl+C для завершення.' );
});


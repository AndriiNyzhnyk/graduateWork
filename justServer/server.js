const express = require('express');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const security = require('./securityKeys');
const bodyParser = require('body-parser');
const func = require('./function');
const path = require('path');
const app = express();

const urlencodedParser = bodyParser.urlencoded({extended: true});

app.set('port', process.env.PORT || 3000);

app.use(cookieParser(security.securityCookie));
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

app.get("/pageIframe", (req, res) => {
    res.cookie('someCookieGoodServer3', 'hello my iFrame', {
        path: '/',
        secure: false
    });

    console.log('setCookie');
    res.sendFile(__dirname + '/public/webPage1/mainPage.html');
});

app.get('/pageWithMap', (req, res) => {
    res.sendFile(__dirname + '/public/wrapMap.html');
});

app.get('/signInControlPanel', (req, res) => {
    res.sendFile(__dirname + '/public/signIn.html');
});

app.get('/badScripts', (req, res) => {
    res.sendFile(__dirname + '/public/feedBack.html');
});

app.get('/socialMediaPage', (req, res) => {
    res.sendFile(__dirname + '/public/socialMedia.html');
});

app.get('/admin-control-panel', (req, res) => {
    if(func.checkCookie(req)) {
        res.sendFile(__dirname + '/adminPanel/index.html');
    } else {
        res.redirect('/signInControlPanel');
    }
});

app.post('/signInAdmin',urlencodedParser, (req, res) => {
    if(!req.body) return res.sendStatus(400);

    let result = func.authorization(req.body.login, req.body.password);

    if(result === true) {
        res.cookie('signedMonster', security.myCookie,
            {
                signed: true,
                path: '/',
                httpOnly: false // should set true in future for security
            });

        res.status(200).send('/admin-control-panel');
    } else {
        res.status(200).send('badLoginOrPassword');
    }
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
const express = require('express');
const path = require('path');
const { parse } = require('querystring');
const formidable = require('formidable');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});
const security = require('./securityKey');
const func = require('./function');
const app = express();


app.set('port', process.env.PORT || 8000);

app.use(cookieParser(security.cookieSecret));

// middleware for cors
// app.use((req, res, next) => {
//     res.set({
//         'Access-Control-Allow-Origin': '*'
//     });
//     next();
// });

app.use((req, res, next) => {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    // res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
});

app.use((req, res, next) => {
    if(req.url === '/favicon.ico') {
        res.send("ok");
    } else {
        next();
    }
});

app.use((req, res, next) => {
    let id;

    if(req.signedCookies.userId === undefined) {
        id =  func.createUserId();
        func.setCookie(res, 'userId', id);
    }
    
    console.log(req.signedCookies);

    let userId = id || req.signedCookies.userId;

    func.startFollow(req, userId);

    next();
});

app.use(express.static(path.join(__dirname, 'public')));

require('./routes.js')(app, urlencodedParser);

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
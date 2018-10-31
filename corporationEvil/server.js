const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const security = require('./securityKey');
const func = require('./function');
const app = express();

app.set('port', process.env.PORT || 8000);

app.use(cookieParser(security.cookieSecret));

app.use((req, res, next) => {
    let id;

    if(req.signedCookies.userId === undefined) {
        id =  func.createUserId();
        func.setCookie(res, 'userId', id);
    }

    let userId = id || req.signedCookies.userId;
    let {value, index} = func.searchUserInDb(userId);
    let ip = func.getUserIpAddress(req);

    if(value) {
        console.log('user in db');
        func.addHistoryUserInDb(req, index, ip)
    } else {
        func.addUserToDb(req, userId, ip);
    }

    

    next();
});

app.use(express.static(path.join(__dirname, 'public')));

require('./routes.js')(app);

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
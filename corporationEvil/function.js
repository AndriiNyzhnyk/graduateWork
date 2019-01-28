const crypto = require('crypto');
const db = require('./dataBase');

module.exports.setCookie = (res, cookieName, cookieValue) => {
    console.log(cookieName, cookieValue);
    res.cookie(cookieName, cookieValue,
        {
            signed: true,
            path: '/',
            // maxAge: 900000
            // httpOnly: true
        });
    console.log('setCookie');
};

module.exports.createUserId = () => {
    // crypto.randomBytes(15, (ex, buf) => {
    //     if (ex) console.error(ex);
    //     // 1.3076744e+12 variant
    //     // console.log(buf.toString('hex'));
    // });

    return crypto.randomBytes(15).toString('hex');
};

module.exports.startFollow = (req, userId) => {

    Promise.all([
        db.findUserInDb(userId),
        getUserIpAddress(req)
    ]).then( (result) => {
        let [value, ip] = result;

        if(value) {
            console.log('user in db');
            db.addHistoryUserToDb(req, userId, ip);
        } else {
            console.log('create new user');
            db.addUserToDb(req, userId, ip)
        }

    }).catch( (err) => {
        console.error(err);
    });

};

function getUserIpAddress(req) {
    return new Promise( (resolve, reject) => {
        // let ip = req.headers['x-forwarded-for'] ||
        //     req.connection.remoteAddress ||
        //     req.socket.remoteAddress ||
        //     (req.connection.socket ? req.connection.socket.remoteAddress : null);

        let ipStr = req.ip;
        let ips = req.ips;

        let arrStr = ipStr.split(':');
        let ip = arrStr[arrStr.length - 1];

        resolve({
            ip,
            ips
        });
    });
}
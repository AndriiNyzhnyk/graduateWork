const crypto = require('crypto');
const security = require('./securityKey');
let allUsers = [];

// module.exports.checkCookie = (req) => {
    // return req.signedCookies.user === security.myCookie;

    // if(req.signedCookies.userId === undefined) {
    //     console.log('createUser');
    // } else {
    //     console.log('write story');
    //     console.log(req.headers);
    //     allUsers.push({
    //         userId: req.signedCookies.userId,
    //         host: req.hostname,
    //         refererHost: req.headers.referer,
    //         // url: req.baseUrl,
    //         ip: ip
    //     })
    // }

//     return req.signedCookies.userId !== undefined;
//
// };

module.exports.addUserToDb = (req, id, ip) => {
    allUsers.push({
        userId: id,
        host: req.hostname,
        refererHost: req.headers.referer,
        // url: req.baseUrl,
        ip: ip
    })
};

module.exports.searchUserInDb = (id) => {
    for(let i = 0; i < allUsers.length; i++) {
        if(allUsers[i].userId === id) {
            return true;
        }
    }

    return false;
};

module.exports.setCookie = (res, cookieName, cookieValue) => {
    console.log(cookieName, cookieValue);
    res.cookie(cookieName, cookieValue,
        {
            signed: true,
            path: '/'
            // httpOnly: true
        });
    console.log('setCookie');
};

module.exports.createUser = () => {

};


module.exports.createUserId = () => {
    // crypto.randomBytes(15, (ex, buf) => {
    //     if (ex) console.error(ex);
    //     // 1.3076744e+12
    //     // console.log(buf.toString('hex'));
    // });


    return crypto.randomBytes(15).toString('hex');

};

module.exports.getUserIpAddress = (req) => {
    // let ip = req.headers['x-forwarded-for'] ||
    //     req.connection.remoteAddress ||
    //     req.socket.remoteAddress ||
    //     (req.connection.socket ? req.connection.socket.remoteAddress : null);

    let ipStr = req.ip;
    let ips = req.ips;

    let arrStr = ipStr.split(':');
    let ip = arrStr[arrStr.length - 1];

    return {
        ip,
        ips
    };
};

setInterval(() => {
    console.log(allUsers);
}, 5000);
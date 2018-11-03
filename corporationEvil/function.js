const crypto = require('crypto');

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
    //     // 1.3076744e+12
    //     // console.log(buf.toString('hex'));
    // });


    return crypto.randomBytes(15).toString('hex');

};

module.exports.startFollow = async (req, users, userId) => {
    try {
        let {value, index} = await searchUserInDb(users, userId);
        let ip = await getUserIpAddress(req);

        if(value) {
            console.log('user in db');
            await addHistoryUserToDb(req, users, index, ip)
        } else {
            await addUserToDb(req, users, userId, ip);
        }
    } catch (e) {
        console.error(e);
    }

};

function searchUserInDb(users, id) {
    return new Promise( (resolve, reject) => {
        for(let i = 0; i < users.length; i++) {
            if(users[i].userId === id) {
                resolve({
                    value: true,
                    index: i
                });

                break;
            }
        }

        resolve({
            value: false,
            index: -1
        });
    });
}

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

function addHistoryUserToDb (req, users, i, ip) {
    return new Promise( (resolve, reject) => {
        users[i].history.push({
            host: req.hostname,
            refererHost: req.headers.referer,
            userAgent: req.headers['user-agent'],
            ip: ip,
        });

        resolve('addHistoryUserToDb');
    });
}

function addUserToDb(req, users, id, ip) {
    return new Promise( (resolve, reject) => {
        users.push({
            userId: id,
            host: req.hostname,
            refererHost: req.headers.referer,
            userAgent: req.headers['user-agent'],
            // url: req.baseUrl,
            ip: ip,
            history: []
        });

        resolve('addUserToDb')
    });
}
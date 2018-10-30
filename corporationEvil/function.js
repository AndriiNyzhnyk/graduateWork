const security = require('./securityKey');

module.exports.checkCookie = (req) => {
    return req.signedCookies.user === security.myCookie;
};

module.exports.setCookie = (res) => {
    res.cookie('user', security.myCookie,
        {
            signed: true,
            path: '/'
            // httpOnly: true
        });
    console.log('setCookie');
};

module.exports.createUserId = () => {
    crypto.randomBytes(15, (ex, buf) => {
        if (ex) console.error(ex);
        // 1.3076744e+12
        return buf.toString('hex');
    });
};

module.exports.getUserIpAddress = (req) => {
    // let ip = req.headers['x-forwarded-for'] ||
    //     req.connection.remoteAddress ||
    //     req.socket.remoteAddress ||
    //     (req.connection.socket ? req.connection.socket.remoteAddress : null);

    let ip = req.ip;
    let ips = req.ips;

    return {
        ip,
        ips
    };
};
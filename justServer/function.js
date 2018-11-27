const securityKey = require('./securityKeys');

// function verify obj
module.exports.isEmptyObj = (obj) => {
    for(let key in obj) {
        return false;
    }
    return true;
};

module.exports.checkCookie = (req) => {
    return req.signedCookies.signedMonster === securityKey.myCookie;
};

module.exports.authorization = (login, password) => {
    return login === securityKey.adminLogin && password === securityKey.adminPassword;
};
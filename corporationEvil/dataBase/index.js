const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

let newUserScheme = new Schema({
    id: Number,
    host: String,
    refererHost: String,
    userAgent: String,
    otherCookie: {
        cookies: String,
        signedCookies: String
    },
    ip: String,
    date: String,
    history: [Mixed]
});

let oldUserScheme = new Schema({
    id: Number,
    host
});

/*
userId: id,
host: req.hostname,
refererHost: req.headers.referer,
userAgent: req.headers['user-agent'],
otherCookie: {
    cookies: req.cookies,
    signedCookies: req.signedCookies
},
// url: req.baseUrl,
ip: ip,
date: new Date(),
history: []*/

mongoose.connect("mongodb://localhost:27017/followdb");

const User = mongoose.model("User", userScheme);

let user = new User({
});

// user.save((err) => {
//     mongoose.disconnect();
//
//     if(err) return console.error(err);
// });

// user.save()
//     .then(function(doc){
//         mongoose.disconnect();
//     })
//     .catch(function (err){
//         console.error(err);
//         mongoose.disconnect();
//     });
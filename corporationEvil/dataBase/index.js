const mongoose = require("mongoose");
const func = require('../function');
const Schema = mongoose.Schema;
const dbURL = 'mongodb://localhost:27017/followdb';

mongoose.Promise = global.Promise;
mongoose.connect(dbURL);

mongoose.connection.on('connected', () => {
    console.log("Mongoose default connection is open to ", dbURL);
});

mongoose.connection.on('error', (err) => {
    console.log("Mongoose default connection has occured " + err+ " error");
});

mongoose.connection.on('disconnected', () => {
    console.log("Mongoose default connection is disconnected");
});

process.on('SIGINT', () => {
    mongoose.connection.close( () => {
        console.log("Mongoose default connection is disconnected due to application termination");
        process.exit(0)
    });
});


let newUserScheme = new Schema({
    userId: {
        type: String,
        default: "the same"
    },
    host: String,
    refererHost: {
        type: Schema.Types.Mixed
    },
    userAgent: String,
    otherCookie: {
        type: Schema.Types.Mixed
    },
    ip: {
        type: Schema.Types.Mixed
    },
    date: String,
    history: {
        type: Array,
        default: []
    },
    listUsefulSelector: {
        type: Array,
        default: []
    }
},
{
    versionKey: false
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

const User = mongoose.model('User', newUserScheme);


module.exports.addUserToDb = (req, userId, ip) => {
    let user = createNewUser(req, userId, ip);
    let data = new User(user);

    // data.save((err) => {
    //     mongoose.disconnect();
    //
    //     if(err) return console.error(err);
    // });

    data.save()
        .then((doc) => {
            // console.log(doc);
        })
        .catch( (err) => {
            console.error(err);
            console.log('error in catch ^');
        })
        .finally( () => {
            // mongoose.disconnect();
            console.log('Done finaly');
        });
};


module.exports.findAllUsers = () => {
    User.find({}, (err, docs) => {
        // mongoose.disconnect();

        if(err) return console.error(err);

        console.log(docs);
    });
};

module.exports.findUserInDb = (id) => {
    return new Promise( (resolve, reject) => {
        User.findOne({userId: id}, (err, doc) => {
            // mongoose.disconnect();

            if(err) return reject(err);

            if(doc === null || doc === undefined) {
                resolve(false);
            } else {
                resolve(true);
            }

        });

    });

};

// addHistoryUserToDb
module.exports.addHistoryUserToDb = (req, id, ip) => {
    User.findOne({userId: id}, (err, doc) => {
        // mongoose.disconnect();

        if(err) return console.error(err);

        let _id = doc._id;
        let history = doc.history;

        let list = createHistoryList(req, ip);
        history.push(list);

        User.findByIdAndUpdate(_id, {history: history}, (err, doc) => {
            // mongoose.disconnect();

            if(err) return console.error(err);
            // console.log(doc);

        });
    });
};

module.exports.setListUsefulSelector = (req, data) => {
    let id = req.signedCookies.userId;
    let ip = func.getUserIpAddressSync(req);
    let info = createHistoryList(req, ip);
    let newData = Object.assign({}, data, info);


    User.findOne({userId: id}, (err, doc) => {
        // mongoose.disconnect();

        if(err) return console.error(err);

        let _id = doc._id;
        let list = doc.listUsefulSelector;
        // console.log('old list', list);
        list.push(newData);

        User.findByIdAndUpdate(_id, {listUsefulSelector: list}, (err, doc) => {
            // mongoose.disconnect();

            if(err) return console.error(err);
            // console.log('selectors docs');
            // console.log(doc.listUsefulSelector);

        });
    });
};

function createHistoryList (req, ip) {
    return {
        host: req.hostname,
        refererHost: req.headers.referer || 'undefined',
        userAgent: req.headers['user-agent'],
        otherCookie: {
            cookies: req.cookies,
            signedCookies: req.signedCookies
        },
        ip: ip || 'undefined',
        date: new Date(),
    };
}

function createNewUser(req, id, ip) {
    return {
        userId: id,
        host: req.hostname,
        refererHost: req.headers.referer || 'undefined',
        userAgent: req.headers['user-agent'],
        otherCookie: {
            cookies: req.cookies,
            signedCookies: req.signedCookies
        },
        // url: req.baseUrl,
        ip: ip,
        date: new Date(),
        history: [],
        listUsefulSelector: []
    };
}
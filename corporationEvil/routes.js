const db = require('./dataBase');

module.exports = (app, urlencodedParser) => {
    app.get("/", (req, res) => {
        res.send('Hello World');
    });

    app.post("/setListUsefulSelector", urlencodedParser, (req, res) => {
        res.send('Hello World');
        // res.status(200);
        console.log('Ohhhhhh !!!');
        console.log(req.body);

        let data = JSON.parse(Object.keys(req.body)[0]);
        console.log(data);
        console.log(req.signedCookies.userId);

        let id = req.signedCookies.userId;
        db.setListUsefulSelector(id, data);
    });

    // app.use((req, res, next) => {
    //     if(req.url === '/setListUsefulSelector') {
    //         res.status(200);
    //         res.send('OK');
    //         console.log('Ohhhhhh !!!!!!!!!!!!!!');
    //         console.log(req.body);
    //     } else {
    //         next();
    //     }
    // });

    app.get("/subPage", (req, res) => {
        res.sendFile(__dirname + '/public/webPage1/subPage.html');
    });

    app.get("/adForFeedBackPage", (req, res) => {
        res.sendFile(__dirname + '/public/ad/ad.html');
    });

    app.get("/map", (req, res) => {
        res.sendFile(__dirname + '/public/map.html');
    });

    // Обробник 404 помилки
    app.use((req, res, next) => {
        res.status(404);
        // res.render('404.hbs')
        res.send('404!');
    });

// Обробник 500 помилки
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500);
        // res.render('500.hbs');
        res.send('500');
    });

};
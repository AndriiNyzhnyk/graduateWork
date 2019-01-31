const db = require('./dataBase');

module.exports = (app, urlencodedParser) => {
    app.get("/", (req, res) => {
        res.send('Hello World');
    });

    app.post("/setListUsefulSelector", urlencodedParser, (req, res) => {
        res.send('Hello World');
        console.log('save usefulSelectors');

        let data = JSON.parse(Object.keys(req.body)[0]);
        console.log(data);

        db.setListUsefulSelector(req, data);

    });

    // app.use( (req, res, next) => {
    //     if(req.url === '/followUsersCors2/:data') {
    //
    //         let data = param['data'];
    //         console.log(data);
    //
    //         var form = new formidable.IncomingForm();
    //
    //         form.parse(req, function(err, fields, files) {
    //             res.send('ok');
    //             console.log(err, fields, files);
    //
    //         });
    //
    //     } else {
    //         next();
    //     }
    // });

    // app.post("/followUsersCors", urlencodedParser, (req, res) => {
    //     res.send('ok');
    //     console.log('Cors Working');
    // });

    app.get("/followUsersCors1/", (req, res) => {
        let data = req.query;

        console.log(data, '  - result');
        db.setListUsefulSelector(req, data);

        res.send('ok');
    });

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
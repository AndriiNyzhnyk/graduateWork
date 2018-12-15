module.exports = (app) => {
    app.get("/", (req, res) => {
        res.send('Hello World');
    });

    app.get("/subPage", (req, res) => {
        res.sendFile(__dirname + '/public/webPage1/subPage.html');
    });

    app.get("/adForFeedBackPage", (req, res) => {
        res.sendFile(__dirname + '/public/ad/ad.html');
    });

    // Обробник 404 помилки
    app.use((req, res, next) => {
        res.status(404);
        // res.render('404.hbs')
        res.send('404');
    });

// Обробник 500 помилки
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500);
        // res.render('500.hbs');
        res.send('500');
    });

};
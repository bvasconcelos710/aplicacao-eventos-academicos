const express = require('express');
const app = express();
const nunjucks = require('nunjucks');

const HomeRouter = require('./src/routes/HomeRouter');

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

nunjucks.configure('src/views', {
    express: app,
    autoescape: true,
    noCache: true,
});

app.use('/', HomeRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal server error');
});

app.listen(3000, () => {
    console.log('Food App is running!');
});

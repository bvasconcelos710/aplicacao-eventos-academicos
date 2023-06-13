const express = require('express');
const app = express();
app.use(express.json());
const nunjucks = require('nunjucks');


const HomeRouter = require('./src/routes/HomeRouter');
const EventoRouter = require('./src/routes/EventoRouter');

const cors = require('cors');
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

nunjucks.configure('src/views', {
    express: app,
    autoescape: true,
    noCache: true,
});

app.use('/', HomeRouter);
app.use('/evento', EventoRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal server error');
});

app.listen(3000, () => {
    console.log('Food App is running!');
});

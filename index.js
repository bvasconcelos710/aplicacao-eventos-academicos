const express = require('express');
const app = express();
app.use(express.json());
const flash = require('connect-flash');
const dotenv = require('dotenv').config();
const nunjucks = require('nunjucks');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const SQLiteStore = require('connect-sqlite3')(session);


const routes = require('./src/routes');

const cors = require('cors');
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());
app.use(flash());
app.use(
    session({
        store: new SQLiteStore(),
        secret: process.env.SECRET_KEY, // used to sign the cookie
        name: 'sessionId', // change session name for better security
        resave: false, // deactivates saving a session when it's not modified
        saveUninitialized: true, // save new sessions even if they're not modified
        cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 }, // 1 week
    })
);


nunjucks.configure('src/views', {
    express: app,
    autoescape: true,
    noCache: true,
});



app.use('/', routes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal server error');
});

app.listen(3000, () => {
    console.log('Food App is running!');
});

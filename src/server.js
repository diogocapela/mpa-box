/* eslint-disable global-require */
/* eslint-disable no-console */
const path = require('path');
const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const expressHandlebars = require('express-handlebars');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const expressMinifyHtml = require('express-minify-html');

if (process.env.NODE_ENV === 'development') {
    require('dotenv').config();
} else {
    require('dotenv').config({ path: `${__dirname}/../.env` });
}

const { withAuth, withAlerts, withEnvironment } = require('./utils/middlewares');
const passport = require('./config/passport');
const handlebarsHelpers = require('./utils/handlebarsHelpers');

const app = express();
const port = process.env.PORT || 3000;

app.disable('view cache');

/* express */
app.set('port', port);
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '/../public')));
/* compression */
app.use(compression());
/* helmet */
app.use(helmet());
app.use(helmet.noCache());
/* express-handlebars */
const hbs = expressHandlebars.create({
    extname: 'hbs',
    helpers: handlebarsHelpers,
    defaultLayout: 'MainLayout',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/components'),
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
/* morgan */
app.use(morgan('dev'));
/* body-parser */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/* cookie-parser */
app.use(cookieParser());
/* express-session */
const expressSessionOptions = {
    secret: process.env.EXPRESS_SESSION_COOKIE_SECRET,
    resave: false, // if session must be updated whether or not user made changes (if false the session will only be saved when a user made changes)
    saveUninitialized: true, // if true, it creates cookies for every visitor (even logged-out ones)
    cookie: {},
};
if (app.get('env') === 'production') {
    app.set('trust proxy', 1); // trust first proxy
    expressSessionOptions.cookie.secure = true; // serve secure cookies
}
app.use(expressSession(expressSessionOptions));
/* passport */
app.use(passport.initialize());
app.use(passport.session());
/* express-minify-html */
app.use(expressMinifyHtml({
    override: true,
    exception_url: false,
    htmlMinifier: {
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: true,
        removeEmptyAttributes: true,
        minifyJS: true,
    },
}));

app.use([
    withAuth,
    withAlerts,
    withEnvironment,
]);

app.use('/', require('./routes/MainRouter'));
app.use('/', require('./routes/AuthRouter'));
app.use('/', require('./routes/ListingsRouter'));
app.use('/', require('./routes/LegalRouter'));

app.listen(app.get('port'), 'localhost', () => {
    console.log('The server is running at http://localhost:%d in %s mode.', app.get('port'), app.get('env'));
    console.log('Press CTRL-C to stop.\n');
});

module.exports = app;

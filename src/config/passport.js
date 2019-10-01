/* eslint-disable no-console */
const bcrypt = require('bcrypt');
const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const database = require('../database');
const { logError } = require('../utils/logger');

passport.use(new LocalStrategy({ usernameField: 'login', passwordField: 'password' }, async (login, password, done) => {
    console.log(`Username or Email: ${login}`);
    console.log(`Password: ${password}`);
    try {
        let user;
        if (login.includes('@')) {
            user = await database.getUserByEmail(login);
        } else {
            user = await database.getUserByUsername(login);
        }
        if (!user) return done(null, false, { message: 'Whoops! Something went wrong.' });
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) return done(null, false, { message: 'Wrong password.' });
        return done(null, user);
    } catch (error) {
        logError(error);
        return done(null, false, { message: error });
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await database.getUserById(id);
        done(null, user);
    } catch (error) {
        logError(error);
        done(error, null);
    }
});

module.exports = passport;

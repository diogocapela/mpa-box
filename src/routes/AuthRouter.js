const express = require('express');
const bcrypt = require('bcrypt');
const controller = require('../controllers');
const passport = require('../config/passport');
const {
    onlyAllowLoggedOut,
    onlyAllowLoggedIn,
} = require('../utils/middlewares');
const {
    isValidEmail,
    isValidUsername,
    isValidPassword,
    isValidName,
} = require('../utils/validation');
const { logError } = require('../utils/logger');

const router = express.Router();

/* GET: /user/:username
============================================================================================= */
router.get('/user/:username', async (req, res) => {
    try {
        const user = await controller.getUserByUsername(req.params.username);
        const userListings = await controller.getAllListingsOfUsername(req.params.username);
        res.render('pages/auth/user', {
            user,
            userListings,
        });
    } catch (error) {
        logError(error);
    }
});

/* GET: /register
============================================================================================= */
router.get('/register', onlyAllowLoggedOut, (req, res) => {
    res.render('pages/auth/register');
});

/* POST: /register
============================================================================================= */
router.post('/register', onlyAllowLoggedOut, async (req, res) => {
    const {
        email,
        username,
        password,
        passwordConfirmation,
        name,
    } = req.body;
    if (password !== passwordConfirmation) {
        req.session.alert = { type: 'danger', text: 'Passwords don\t match.' };
        return res.redirect('/register');
    }
    if (!isValidEmail(email)) {
        req.session.alert = { type: 'danger', text: 'Invalid email.' };
        return res.redirect('/register');
    }
    if (!isValidUsername(username)) {
        req.session.alert = { type: 'danger', text: 'Invalid username.' };
        return res.redirect('/register');
    }
    if (!isValidPassword(password)) {
        req.session.alert = { type: 'danger', text: 'Invalid password.' };
        return res.redirect('/register');
    }
    if (!isValidName(name)) {
        req.session.alert = { type: 'danger', text: 'Invalid name.' };
        return res.redirect('/register');
    }
    try {
        const user = await controller.register({
            email: email.toLowerCase().trim(),
            username: username.toLowerCase().trim(),
            password,
            name: name.trim(),
        });
        req.login(user, (error) => {
            if (error) {
                logError(error);
                req.session.alert = { type: 'danger', text: 'Whoops! Something went wrong.' };
                return res.redirect('/register');
            }
            if (!user) {
                req.session.alert = { type: 'danger', text: 'Whoops! Something went wrong.' };
                return res.redirect('/register');
            }
            req.session.alert = { type: 'success', text: `You are now logged-in as <b>@${username}</b>.` };
            return res.redirect(`/user/${username}`);
        });
    } catch (error) {
        logError(error);
        req.session.alert = { type: 'danger', text: 'Whoops! Something went wrong.' };
        res.redirect('/register');
    }
});


/* GET: /login
============================================================================================= */
router.get('/login', onlyAllowLoggedOut, (req, res) => {
    res.render('pages/auth/login');
});


/* POST: /login
============================================================================================= */
router.post('/login', onlyAllowLoggedOut, (req, res, next) => {
    passport.authenticate('local', (error, user) => {
        if (error) {
            logError(error);
            req.session.alert = { type: 'danger', text: 'Wrong credentials.' };
            return res.redirect('/login');
        }
        if (!user) {
            req.session.alert = { type: 'danger', text: 'Wrong credentials.' };
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            if (err) {
                logError(err);
                req.session.alert = { type: 'danger', text: 'Whoops! Something went wrong.' };
                return res.redirect('/login');
            }
            req.session.alert = { type: 'success', text: `You are now logged-in as <b>@${user.username}</b>.` };
            return res.redirect(`/user/${user.username}`);
        });
    })(req, res, next);
});


/* GET: /recover-password
============================================================================================= */
router.get('/recover-password', onlyAllowLoggedOut, (req, res) => {
    res.render('pages/auth/recover-password');
});

/* POST: /recover-password
============================================================================================= */
router.post('/recover-password', onlyAllowLoggedOut, (req, res) => {
    res.render('pages/auth/recover-password');
});

/* GET: /profile
============================================================================================= */
router.get('/profile/', onlyAllowLoggedIn, (req, res) => {
    res.redirect(`/user/${req.user.username}`);
});

/* GET: /settings
============================================================================================= */
router.get('/settings', onlyAllowLoggedIn, (req, res) => {
    res.render('pages/auth/settings', {
        page: '/settings/update-profile',
    });
});
router.get('/settings/:option', onlyAllowLoggedIn, (req, res) => {
    res.render('pages/auth/settings', {
        page: req.url,
    });
});

/* POST: /settings/update-profile
============================================================================================= */
router.post('/settings/update-profile', onlyAllowLoggedIn, async (req, res) => {
    const {
        name,
        bio,
    } = req.body;
    if (!isValidName(name)) {
        req.session.alert = { type: 'danger', text: 'Invalid name.' };
        return res.redirect('/settings/update-profile');
    }
    try {
        await controller.updateProfileById(req.user._id, { name, bio });
        req.session.alert = { type: 'success', text: 'Profile updated successfully!' };
        return res.redirect('/settings/update-profile');
    } catch (error) {
        logError(error);
    }
});

/* POST: /settings/update-password
============================================================================================= */
router.post('/settings/update-password', onlyAllowLoggedIn, async (req, res) => {
    const {
        oldPassword,
        newPassword,
        passwordConfirmation,
    } = req.body;
    if (newPassword !== passwordConfirmation) {
        req.session.alert = { type: 'danger', text: 'Passwords entered do not match!' };
        return res.redirect('/settings/update-password');
    }
    if (!isValidPassword(newPassword)) {
        req.session.alert = { type: 'danger', text: 'Invalid password.' };
        return res.redirect('/settings/update-password');
    }
    const isPasswordCorrect = await bcrypt.compare(oldPassword, req.user.password);
    if (!isPasswordCorrect) {
        req.session.alert = { type: 'danger', text: 'Wrong password!' };
        return res.redirect('/settings/update-password');
    }
    try {
        await controller.updatePasswordById(req.user._id, newPassword);
        req.session.alert = { type: 'success', text: 'Password updated successfully!' };
        return res.redirect('/settings/update-password');
    } catch (error) {
        logError(error);
    }
});

/* POST: /settings/delete-account
============================================================================================= */
router.post('/settings/delete-account', onlyAllowLoggedIn, async (req, res) => {
    res.redirect('/settings/delete-account');
});

/* GET: /logout
============================================================================================= */
router.get('/logout', onlyAllowLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
});


module.exports = router;

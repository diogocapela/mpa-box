const express = require('express');
const controller = require('../controllers');
const { onlyAllowLoggedIn } = require('../utils/middlewares');
const { logError } = require('../utils/logger');

const router = express.Router();

/* GET: /listings
============================================================================================= */
router.get('/listings', async (req, res) => {
    try {
        const listings = await controller.getAllListtings();

        res.render('pages/listings/listings', {
            listings,
        });
    } catch (error) {
        logError(error);
    }
});

/* GET: /listing/:slug
============================================================================================= */
router.get('/listing/:slug', async (req, res) => {
    try {
        const listing = await controller.getListingBySlug(req.params.slug);

        res.render('pages/listings/listing', {
            listing,
        });
    } catch (error) {
        logError(error);
    }
});

/* GET: /my-listings
============================================================================================= */
router.get('/my-listings', onlyAllowLoggedIn, async (req, res) => {
    try {
        const userListings = await controller.getAllListingsOfUsername(req.user.username);
        res.render('pages/listings/my-listings', {
            userListings,
        });
    } catch (error) {
        logError(error);
    }
});

/* GET: /add/listing
============================================================================================= */
router.get('/add-listing', onlyAllowLoggedIn, (req, res) => {
    res.render('pages/listings/add-listing');
});

/* POST: /add/listing
============================================================================================= */
router.post('/add-listing', onlyAllowLoggedIn, async (req, res) => {
    try {
        await controller.addListing({ ...req.body, owner: req.user });
        req.session.alert = { type: 'success', text: 'Listing successfully created!' };
        res.redirect('/add-listing');
    } catch (error) {
        logError(error);
        req.session.alert = { type: 'danger', text: 'Whoops! Something went wrong.' };
        res.redirect('/add-listing');
    }
});

module.exports = router;

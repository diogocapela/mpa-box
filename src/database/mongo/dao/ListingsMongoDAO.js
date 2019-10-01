const Listing = require('../models/Listing.model');

module.exports = {
    getAllListings: () => Listing.find().populate({
        path: 'owner',
        options: { limit: 25 },
    }).exec(),
    getAllListingsOfUsername: username => Listing.find().populate({
        path: 'owner',
        match: { username },
        options: { limit: 5 },
    }).exec(),
    getAllListingsOfEmail: email => Listing.find().populate({
        path: 'owner',
        match: { email },
        options: { limit: 5 },
    }).exec(),
    getListingById: id => Listing.findOne({ _id: id }).populate('owner').exec(),
    getListingBySlug: slug => Listing.findOne({ slug }).populate('owner').exec(),
    addListing: data => new Listing(data).save(),
};

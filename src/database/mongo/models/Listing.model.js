/* eslint-disable func-names */
const kebabCase = require('lodash/kebabCase');
const mongoose = require('../mongoose');
const googleMaps = require('../../../services/googleMaps');

const Listing = new mongoose.Schema({
    slug: {
        type: String,
        unique: true,
        lowercase: true,
    },
    title: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    satelliteImageUrl: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },
    phoneNumber: {
        type: Number,
    },
    coordinates: [
        {
            _id: false,
            lat: Number,
            lng: Number,
        },
    ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
        timestamps: true,
    });

Listing.pre('save', function (next) {
    this.slug = kebabCase(this.title);
    googleMaps.getImageFromAddress(this.address, (cloudinaryImageUrl) => {
        this.satelliteImageUrl = cloudinaryImageUrl;
        next();
    });
});

module.exports = mongoose.model('Listing', Listing);

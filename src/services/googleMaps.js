const cloudinary = require('./cloudinary');
const { logError } = require('../utils/logger');

module.exports = {
    getImageFromAddress: (address, callback) => {
        cloudinary.uploader.upload(`https://maps.googleapis.com/maps/api/staticmap?center=${address}&zoom=16&size=600x300&maptype=hybrid&key=${process.env.GOOGLE_MAPS_API_KEY}`, (result, error) => {
            if (error) {
                logError(error);
                callback(null);
            } else {
                callback(result.secure_url);
            }
        });
    },
};

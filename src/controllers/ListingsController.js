const database = require('../database');
const {
    curateTitle,
    curateAddress,
    curateDescription,
    curatePhoneNumber,
    curateCoordinates,
} = require('../utils/validation');

module.exports = {
    getAllListtings: () => database.getAllListings(),
    getAllListingsOfUsername: username => database.getAllListingsOfUsername(username),
    getAllListingsOfEmail: email => database.getAllListingsOfEmail(email),
    getListingBySlug: slug => database.getListingBySlug(slug),
    addListing: async (data) => {
        const listing = await database.addListing({
            ...data,
            title: curateTitle(data.title),
            address: curateAddress(data.address),
            description: curateDescription(data.description),
            phoneNumber: curatePhoneNumber(data.phoneNumber),
            coordinates: curateCoordinates(data.coordinates),
        });

        return listing;
    },
    deleteListing: async () => {

    },
};

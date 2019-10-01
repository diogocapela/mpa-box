/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
const firebase = require('../firebase');
const timeUtils = require('../../../utils/time');

module.exports = {
    getAllServices: (callback) => {
        firebase.database().ref('services').once('value').then((snapshot) => {
            const data = [];
            snapshot.forEach((dataSnapshot) => {
                const d = dataSnapshot.val();
                d.slug = dataSnapshot.key;
                data.push(d);
            });
            callback(data);
        });
    },
    getAllServicesSortedBy: (attribute, callback) => {
        firebase.database().ref('services').orderByChild(attribute).once('value')
            .then((snapshot) => {
                let data = [];
                snapshot.forEach((dataSnapshot) => {
                    const d = dataSnapshot.val();
                    d.slug = dataSnapshot.key;
                    data.push(d);
                });
                data = data.reverse();
                callback(data);
            });
    },
    getService: (slug, callback) => {
        firebase.database().ref(`services/${slug}`).once('value').then((snapshot) => {
            const data = {
                ...snapshot.val(),
                slug: snapshot.key,
            };
            callback(data);
        });
    },
    getServicesWithPaginationSortedBy: (attribute, currentPage, itemsPerPage, callback) => {
        firebase.database().ref('services').orderByChild(attribute).once('value')
        .then((snapshot) => {
            let data = [];
            snapshot.forEach((dataSnapshot) => {
                const d = dataSnapshot.val();
                d.slug = dataSnapshot.key;
                data.push(d);
            });
            data = data.reverse();
            const itemsOnPage = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
            const numberOfPages = Math.ceil(data.length / itemsPerPage);

            const pagesNumbers = [];
            for (let i = 1; i <= numberOfPages; i++) {
                pagesNumbers.push(i);
            }
            const previousPage = parseInt(currentPage, 10) - 1;
            const nextPage = parseInt(currentPage, 10) + 1;

            const itemsWithPagination = {
                services: itemsOnPage,
                currentPage: parseInt(currentPage, 10),
                previousPage,
                nextPage,
                lastPage: numberOfPages,
                pagesNumbers,
            };

            callback(itemsWithPagination);
        });
    },
    addService: (data, callback) => {
        data.createdAt = timeUtils.getFormattedTimestamp();
        data.updatedAt = timeUtils.getFormattedTimestamp();
        firebase.database().ref(`services/${data.slug}`).set(data).then(() => {
            callback();
        });
    },
    addServiceImage: (slug, imageUrl, callback) => {
        firebase.database().ref(`services/${slug}/images`).push(imageUrl).then(() => {
            firebase.database().ref(`services/${slug}/primaryImage`).set(imageUrl).then(() => {
                callback();
            });
        });
    },
    setServicePrimaryImage: (slug, imageUrl, callback) => {
        firebase.database().ref(`services/${slug}/primaryImage`).set(imageUrl).then(() => {
            callback();
        });
    },
    updateService: (slug, data, callback) => {
        data.updatedAt = timeUtils.getFormattedTimestamp();
        firebase.database().ref(`services/${slug}`).update(data).then(() => {
            callback();
        });
    },
    deleteService: (slug, callback) => {
        firebase.database().ref(`services/${slug}`).remove().then(() => {
            callback();
        });
    },
    deleteServiceImage: (slug, imageKey, callback) => {
        firebase.database().ref(`services/${slug}/images/${imageKey}`).remove().then(() => {
            callback();
        });
    },
};

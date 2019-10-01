/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
const firebase = require('../firebase');
const timeUtils = require('../../../utils/time');

module.exports = {
    getAllEvents: (callback) => {
        firebase.database().ref('events').once('value').then((snapshot) => {
            const data = [];
            snapshot.forEach((dataSnapshot) => {
                const d = dataSnapshot.val();
                d.slug = dataSnapshot.key;
                data.push(d);
            });
            callback(data);
        });
    },
    getAllEventsSortedBy: (attribute, callback) => {
        firebase.database().ref('events').orderByChild(attribute).once('value')
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
    getEvent: (slug, callback) => {
        firebase.database().ref(`events/${slug}`).once('value').then((snapshot) => {
            const data = {
                ...snapshot.val(),
                slug: snapshot.key,
            };
            callback(data);
        });
    },
    getEventsWithPaginationSortedBy: (attribute, currentPage, itemsPerPage, callback) => {
        firebase.database().ref('events').orderByChild(attribute).once('value')
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
                events: itemsOnPage,
                currentPage: parseInt(currentPage, 10),
                previousPage,
                nextPage,
                lastPage: numberOfPages,
                pagesNumbers,
            };

            callback(itemsWithPagination);
        });
    },
    addEvent: (data, callback) => {
        data.createdAt = timeUtils.getFormattedTimestamp();
        data.updatedAt = timeUtils.getFormattedTimestamp();
        firebase.database().ref(`events/${data.slug}`).set(data).then(() => {
            callback();
        });
    },
    addEventImage: (slug, imageUrl, callback) => {
        firebase.database().ref(`events/${slug}/images`).push(imageUrl).then(() => {
            firebase.database().ref(`events/${slug}/primaryImage`).set(imageUrl).then(() => {
                callback();
            });
        });
    },
    setEventPrimaryImage: (slug, imageUrl, callback) => {
        firebase.database().ref(`events/${slug}/primaryImage`).set(imageUrl).then(() => {
            callback();
        });
    },
    updateEvent: (slug, data, callback) => {
        data.updatedAt = timeUtils.getFormattedTimestamp();
        firebase.database().ref(`events/${slug}`).update(data).then(() => {
            callback();
        });
    },
    deleteEvent: (slug, callback) => {
        firebase.database().ref(`events/${slug}`).remove().then(() => {
            callback();
        });
    },
    deleteEventImage: (slug, imageKey, callback) => {
        firebase.database().ref(`events/${slug}/images/${imageKey}`).remove().then(() => {
            callback();
        });
    },
};

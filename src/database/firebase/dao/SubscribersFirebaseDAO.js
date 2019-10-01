/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
const firebase = require('../firebase');
const timeUtils = require('../../../utils/time');

module.exports = {
    getAllSubscribers: (callback) => {
        firebase.database().ref('subscribers').once('value').then((snapshot) => {
            const data = [];
            snapshot.forEach((dataSnapshot) => {
                const d = dataSnapshot.val();
                d.slug = dataSnapshot.key;
                data.push(d);
            });
            callback(data);
        });
    },
    getAllSubscribersSortedBy: (attribute, callback) => {
        firebase.database().ref('subscribers').orderByChild(attribute).once('value')
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
    getSubscriber: (slug, callback) => {
        firebase.database().ref(`subscribers/${slug}`).once('value').then((snapshot) => {
            const data = {
                ...snapshot.val(),
                slug: snapshot.key,
            };
            callback(data);
        });
    },
    addSubscriber: (data, callback) => {
        data.createdAt = timeUtils.getFormattedTimestamp();
        data.updatedAt = timeUtils.getFormattedTimestamp();
        firebase.database().ref(`subscribers/${data.slug}`).set(data).then(() => {
            callback();
        });
    },
    updateSubscriber: (slug, data, callback) => {
        data.updatedAt = timeUtils.getFormattedTimestamp();
        firebase.database().ref(`subscribers/${slug}`).update(data).then(() => {
            callback();
        });
    },
    deleteSubscriber: (slug, callback) => {
        firebase.database().ref(`subscribers/${slug}`).remove().then(() => {
            callback();
        });
    },
};

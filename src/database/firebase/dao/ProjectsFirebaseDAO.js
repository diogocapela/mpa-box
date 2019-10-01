/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
const firebase = require('../firebase');
const timeUtils = require('../../../utils/time');

module.exports = {
    getAllProjects: (callback) => {
        firebase.database().ref('projects').once('value').then((snapshot) => {
            const data = [];
            snapshot.forEach((dataSnapshot) => {
                const d = dataSnapshot.val();
                d.slug = dataSnapshot.key;
                data.push(d);
            });
            callback(data);
        });
    },
    getAllProjectsSortedBy: (attribute, callback) => {
        firebase.database().ref('projects').orderByChild(attribute).once('value')
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
    getProject: (slug, callback) => {
        firebase.database().ref(`projects/${slug}`).once('value').then((snapshot) => {
            const data = {
                ...snapshot.val(),
                slug: snapshot.key,
            };
            callback(data);
        });
    },
    getProjectsWithPaginationSortedBy: (attribute, currentPage, itemsPerPage, callback) => {
        firebase.database().ref('projects').orderByChild(attribute).once('value')
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
                projects: itemsOnPage,
                currentPage: parseInt(currentPage, 10),
                previousPage,
                nextPage,
                lastPage: numberOfPages,
                pagesNumbers,
            };

            callback(itemsWithPagination);
        });
    },
    addProject: (data, callback) => {
        data.createdAt = timeUtils.getFormattedTimestamp();
        data.updatedAt = timeUtils.getFormattedTimestamp();
        firebase.database().ref(`projects/${data.slug}`).set(data).then(() => {
            callback();
        });
    },
    addProjectImage: (slug, imageUrl, callback) => {
        firebase.database().ref(`projects/${slug}/images`).push(imageUrl).then(() => {
            firebase.database().ref(`projects/${slug}/primaryImage`).set(imageUrl).then(() => {
                callback();
            });
        });
    },
    setProjectPrimaryImage: (slug, imageUrl, callback) => {
        firebase.database().ref(`projects/${slug}/primaryImage`).set(imageUrl).then(() => {
            callback();
        });
    },
    updateProject: (slug, data, callback) => {
        data.updatedAt = timeUtils.getFormattedTimestamp();
        firebase.database().ref(`projects/${slug}`).update(data).then(() => {
            callback();
        });
    },
    deleteProject: (slug, callback) => {
        firebase.database().ref(`projects/${slug}`).remove().then(() => {
            callback();
        });
    },
    deleteProjectImage: (slug, imageKey, callback) => {
        firebase.database().ref(`projects/${slug}/images/${imageKey}`).remove().then(() => {
            callback();
        });
    },
};

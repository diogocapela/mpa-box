/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
const firebase = require('../firebase');
const timeUtils = require('../../../utils/time');

module.exports = {
    getAllBlogPosts: (callback) => {
        firebase.database().ref('blog').once('value').then((snapshot) => {
            const data = [];
            snapshot.forEach((dataSnapshot) => {
                const d = dataSnapshot.val();
                d.slug = dataSnapshot.key;
                data.push(d);
            });
            callback(data);
        });
    },
    getAllBlogPostsSortedBy: (attribute, callback) => {
        firebase.database().ref('blog').orderByChild(attribute).once('value')
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
    getBlogPost: (slug, callback) => {
        firebase.database().ref(`blog/${slug}`).once('value').then((snapshot) => {
            const data = {
                ...snapshot.val(),
                slug: snapshot.key,
            };
            callback(data);
        });
    },
    getBlogPostsWithPaginationSortedBy: (attribute, currentPage, itemsPerPage, callback) => {
        firebase.database().ref('blog').orderByChild(attribute).once('value')
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
                    blogPosts: itemsOnPage,
                    currentPage: parseInt(currentPage, 10),
                    previousPage,
                    nextPage,
                    lastPage: numberOfPages,
                    pagesNumbers,
                };

                callback(itemsWithPagination);
            });
    },
    addBlogPost: (data, callback) => {
        data.createdAt = timeUtils.getFormattedTimestamp();
        data.updatedAt = timeUtils.getFormattedTimestamp();
        firebase.database().ref(`blog/${data.slug}`).set(data).then(() => {
            callback();
        });
    },
    addBlogPostImage: (slug, imageUrl, callback) => {
        firebase.database().ref(`blog/${slug}/images`).push(imageUrl).then(() => {
            firebase.database().ref(`blog/${slug}/primaryImage`).set(imageUrl).then(() => {
                callback();
            });
        });
    },
    setBlogPostPrimaryImage: (slug, imageUrl, callback) => {
        firebase.database().ref(`blog/${slug}/primaryImage`).set(imageUrl).then(() => {
            callback();
        });
    },
    updateBlogPost: (slug, data, callback) => {
        data.updatedAt = timeUtils.getFormattedTimestamp();
        firebase.database().ref(`blog/${slug}`).update(data).then(() => {
            callback();
        });
    },
    deleteBlogPost: (slug, callback) => {
        firebase.database().ref(`blog/${slug}`).remove().then(() => {
            callback();
        });
    },
    deleteBlogPostImage: (slug, imageKey, callback) => {
        firebase.database().ref(`blog/${slug}/images/${imageKey}`).remove().then(() => {
            callback();
        });
    },
};

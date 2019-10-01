/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
const firebase = require('../firebase');
const timeUtils = require('../../../utils/time');

module.exports = {
    getAllArticles: (callback) => {
        firebase.database().ref('articles').once('value').then((snapshot) => {
            const data = [];
            snapshot.forEach((dataSnapshot) => {
                const d = dataSnapshot.val();
                d.slug = dataSnapshot.key;
                data.push(d);
            });
            callback(data);
        });
    },
    getAllArticlesSortedBy: (attribute, callback) => {
        firebase.database().ref('articles').orderByChild(attribute).once('value')
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
    getArticle: (slug, callback) => {
        firebase.database().ref(`articles/${slug}`).once('value').then((snapshot) => {
            const data = {
                ...snapshot.val(),
                slug: snapshot.key,
            };
            callback(data);
        });
    },
    getArticlesWithPaginationSortedBy: (attribute, currentPage, itemsPerPage, callback) => {
        firebase.database().ref('articles').orderByChild(attribute).once('value')
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
                    articles: itemsOnPage,
                    currentPage: parseInt(currentPage, 10),
                    previousPage,
                    nextPage,
                    lastPage: numberOfPages,
                    pagesNumbers,
                };

                callback(itemsWithPagination);
            });
    },
    addArticle: (data, callback) => {
        data.createdAt = timeUtils.getFormattedTimestamp();
        data.updatedAt = timeUtils.getFormattedTimestamp();
        firebase.database().ref(`articles/${data.slug}`).set(data).then(() => {
            callback();
        });
    },
    addArticleImage: (slug, imageUrl, callback) => {
        firebase.database().ref(`articles/${slug}/images`).push(imageUrl).then(() => {
            firebase.database().ref(`articles/${slug}/primaryImage`).set(imageUrl).then(() => {
                callback();
            });
        });
    },
    setArticlePrimaryImage: (slug, imageUrl, callback) => {
        firebase.database().ref(`articles/${slug}/primaryImage`).set(imageUrl).then(() => {
            callback();
        });
    },
    updateArticle: (slug, data, callback) => {
        data.updatedAt = timeUtils.getFormattedTimestamp();
        firebase.database().ref(`articles/${slug}`).update(data).then(() => {
            callback();
        });
    },
    deleteArticle: (slug, callback) => {
        firebase.database().ref(`articles/${slug}`).remove().then(() => {
            callback();
        });
    },
    deleteArticleImage: (slug, imageKey, callback) => {
        firebase.database().ref(`articles/${slug}/images/${imageKey}`).remove().then(() => {
            callback();
        });
    },
};

/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
const firebase = require('../firebase');
const timeUtils = require('../../../utils/time');

module.exports = {
    getAllProducts: (callback) => {
        firebase.database().ref('products').once('value').then((snapshot) => {
            const data = [];
            snapshot.forEach((dataSnapshot) => {
                const d = dataSnapshot.val();
                d.slug = dataSnapshot.key;
                data.push(d);
            });
            callback(data);
        });
    },
    getAllProductsSortedBy: (attribute, callback) => {
        firebase.database().ref('products').orderByChild(attribute).once('value')
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
    getProduct: (slug, callback) => {
        firebase.database().ref(`products/${slug}`).once('value').then((snapshot) => {
            const data = {
                ...snapshot.val(),
                slug: snapshot.key,
            };
            callback(data);
        });
    },
    getProductsWithPaginationSortedBy: (attribute, currentPage, itemsPerPage, callback) => {
        firebase.database().ref('products').orderByChild(attribute).once('value')
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
                products: itemsOnPage,
                currentPage: parseInt(currentPage, 10),
                previousPage,
                nextPage,
                lastPage: numberOfPages,
                pagesNumbers,
            };

            callback(itemsWithPagination);
        });
    },
    addProduct: (data, callback) => {
        data.createdAt = timeUtils.getFormattedTimestamp();
        data.updatedAt = timeUtils.getFormattedTimestamp();
        firebase.database().ref(`products/${data.slug}`).set(data).then(() => {
            callback();
        });
    },
    addProductImage: (slug, imageUrl, callback) => {
        firebase.database().ref(`products/${slug}/images`).push(imageUrl).then(() => {
            firebase.database().ref(`products/${slug}/primaryImage`).set(imageUrl).then(() => {
                callback();
            });
        });
    },
    setProductPrimaryImage: (slug, imageUrl, callback) => {
        firebase.database().ref(`products/${slug}/primaryImage`).set(imageUrl).then(() => {
            callback();
        });
    },
    updateProduct: (slug, data, callback) => {
        data.updatedAt = timeUtils.getFormattedTimestamp();
        firebase.database().ref(`products/${slug}`).update(data).then(() => {
            callback();
        });
    },
    deleteProduct: (slug, callback) => {
        firebase.database().ref(`products/${slug}`).remove().then(() => {
            callback();
        });
    },
    deleteProductImage: (slug, imageKey, callback) => {
        firebase.database().ref(`products/${slug}/images/${imageKey}`).remove().then(() => {
            callback();
        });
    },
};

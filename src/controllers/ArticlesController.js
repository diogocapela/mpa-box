const get = require('lodash/get');
const database = require('../database');

module.exports = {
    getAllArticles: async () => {
        const data = await database.getAllArticles();

        return data.map(d => ({
            slug: get(d, 'slug'),
            title: get(d, 'title'),
            content: get(d, 'content'),
            authorUsername: get(d, 'author.username'),
        }));
    },
    createArticle: async (data) => {
        const article = await database.addArticle(data);

        return article;
    },
    deleteArticle: async () => {

    },
};

const ArticlesMongoDAO = require('./dao/ArticlesMongoDAO');
const ListingsMongoDAO = require('./dao/ListingsMongoDAO');
const PostsMongoDAO = require('./dao/PostsMongoDAO');
const UsersMongoDAO = require('./dao/UsersMongoDAO');

module.exports = {
    ...ArticlesMongoDAO,
    ...ListingsMongoDAO,
    ...PostsMongoDAO,
    ...UsersMongoDAO,
};

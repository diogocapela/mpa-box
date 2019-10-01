const ArticlesController = require('./ArticlesController');
const AuthController = require('./AuthController');
const ListingsController = require('./ListingsController');

module.exports = {
    ...ArticlesController,
    ...AuthController,
    ...ListingsController,
};

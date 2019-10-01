const Article = require('../models/Article.model');

module.exports = {
    getAllArticles: () => Article.find({}).exec(),
    getArticleById: id => Article.findOne({ _id: id }).exec(),
    getArticleBySlug: slug => Article.findOne({ slug }).exec(),
};

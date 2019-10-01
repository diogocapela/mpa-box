const ArticlesFirebaseDAO = require('./dao/ArticlesFirebaseDAO');
const BlogFirebaseDAO = require('./dao/BlogFirebaseDAO');
const EventsFirebaseDAO = require('./dao/EventsFirebaseDAO');
const MessagesFirebaseDAO = require('./dao/MessagesFirebaseDAO');
const ProductsFirebaseDAO = require('./dao/ProductsFirebaseDAO');
const ProjectsFirebaseDAO = require('./dao/ProjectsFirebaseDAO');
const ServicesFirebaseDAO = require('./dao/ServicesFirebaseDAO');
const SubscribersFirebaseDAO = require('./dao/SubscribersFirebaseDAO');
const UsersFirebaseDAO = require('./dao/UsersFirebaseDAO');

module.exports = {
    ...ArticlesFirebaseDAO,
    ...BlogFirebaseDAO,
    ...EventsFirebaseDAO,
    ...MessagesFirebaseDAO,
    ...ProductsFirebaseDAO,
    ...ProjectsFirebaseDAO,
    ...ServicesFirebaseDAO,
    ...SubscribersFirebaseDAO,
    ...UsersFirebaseDAO,
};

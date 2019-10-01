const ArticlesPostgresDAO = require('./dao/ArticlesPostgresDAO');
const EventsPostgresDAO = require('./dao/EventsPostgresDAO');
const MessagesPostgresDAO = require('./dao/MessagesPostgresDAO');
const SubscribersPostgresDAO = require('./dao/SubscribersPostgresDAO');
const UsersPostgresDAO = require('./dao/UsersPostgresDAO');

module.exports = {
    ...ArticlesPostgresDAO,
    ...EventsPostgresDAO,
    ...MessagesPostgresDAO,
    ...SubscribersPostgresDAO,
    ...UsersPostgresDAO,
};

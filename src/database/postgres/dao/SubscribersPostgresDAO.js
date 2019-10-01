const pool = require('../postgres');

module.exports = {
    getAllSubscribers: (callback) => {
        pool.query('select * from "Subscriber"', (error, result) => {
            if (error) return callback(null, error.stack);
            return callback(result.rows, null);
        });
    },
    getSubscriberById: (id, callback) => {
        pool.query('select * from "Subscriber" where subscriber_id = $1', [id], (error, result) => {
            if (error) return callback(null, error.stack);
            return callback(result.rows[0], null);
        });
    },
    getSubscriberByEmail: (email, callback) => {
        pool.query('select * from "Subscriber" where subscriber_email = $1', [email], (error, result) => {
            if (error) return callback(null, error.stack);
            return callback(result.rows[0], null);
        });
    },
    addSubscriber: (data, callback) => {
        pool.query('insert into "Subscriber"(subscriber_email) values($1)', [
            data.email,
        ], (error, result) => {
            if (error) return callback(null, error.stack);
            return callback(result, null);
        });
    },
    deleteSubscriberById: (id, callback) => {
        pool.query('delete from "Subscriber" where subscriber_id = $1', [id], (error, result) => {
            if (error) return callback(null, error.stack);
            return callback(result, null);
        });
    },
    deleteSubscriberByEmail: (email, callback) => {
        pool.query('delete from "Subscriber" where subscriber_email = $1', [email], (error, result) => {
            if (error) return callback(null, error.stack);
            return callback(result, null);
        });
    },
};

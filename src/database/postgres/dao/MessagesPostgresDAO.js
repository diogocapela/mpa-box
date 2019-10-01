const pool = require('../postgres');

module.exports = {
    getAllMessages: (callback) => {
        pool.query('select * from "Message"', (error, result) => {
            if (error) return callback(null, error.stack);
            return callback(result.rows, null);
        });
    },
    getMessageById: (id, callback) => {
        pool.query('select * from "Message" where message_id = $1', [id], (error, result) => {
            if (error) return callback(null, error.stack);
            return callback(result.rows[0], null);
        });
    },
    addMessage: (data, callback) => {
        pool.query(`
        insert into "Message"(
            message_name,
            message_email,
            message_phone,
            message_content
        ) values($1, $2, $3, $4)
    `, [
                data.name,
                data.email,
                data.phone,
                data.message,
            ], (error, result) => {
                if (error) return callback(null, error.stack);
                return callback(result, null);
            });
    },
    deleteMessageById: (id, callback) => {
        pool.query('delete from "Message" where message_id = $1', [id], (error, result) => {
            if (error) return callback(null, error.stack);
            return callback(result, null);
        });
    },
};

const pool = require('../postgres');

module.exports = {
    getAllUsers: (callback) => {
        pool.query(`
            select * from "User" as u, "UserRole" as ur
            where u.user_role_id = ur.user_role_id
        `, (error, result) => {
                if (error) return callback(null, error.stack);
                return callback(result.rows, null);
            });
    },
    getUserById: (id, callback) => {
        pool.query('select * from "User" where user_id = $1', [id], (error, result) => {
            if (error) return callback(null, error.stack);
            return callback(result.rows[0], null);
        });
    },
    getUserByUsername: (username, callback) => {
        pool.query('select * from "User" where user_username = $1', [username], (error, result) => {
            if (error) return callback(null, error.stack);
            return callback(result.rows[0], null);
        });
    },
    getUserByEmail: (email, callback) => {
        pool.query('select * from "User" where user_email = $1', [email], (error, result) => {
            if (error) return callback(null, error.stack);
            return callback(result.rows[0], null);
        });
    },
    addUser: (data, callback) => {
        pool.query(`
        insert into "User"(
            user_name,
            user_username,
            user_email,
            user_password
        ) values($1, $2, $3, $4)
    `, [
                data.name,
                data.username,
                data.email,
                data.password,
            ], (error, result) => {
                if (error) return callback(null, error.stack);
                return callback(result, null);
            });
    },
    deleteUserById: (id, callback) => {
        pool.query('delete from "User" where user_id = $1', [id], (error, result) => {
            if (error) return callback(null, error.stack);
            return callback(result, null);
        });
    },
    deleteUserByUsername: (username, callback) => {
        pool.query('delete from "User" where user_username = $1', [username], (error, result) => {
            if (error) return callback(null, error.stack);
            return callback(result, null);
        });
    },
    deleteUserByEmail: (email, callback) => {
        pool.query('delete from "User" where user_email = $1', [email], (error, result) => {
            if (error) return callback(null, error.stack);
            return callback(result, null);
        });
    },
};

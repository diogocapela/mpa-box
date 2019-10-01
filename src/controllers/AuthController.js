const bcrypt = require('bcrypt');
const get = require('lodash/get');
const database = require('../database');

module.exports = {
    register: async ({ email, username, password, name }) => {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await database.addUser({
            email,
            username,
            password: hashedPassword,
            name,
        });

        return user;
    },
    login: async ({ login, password }) => {
        let user;
        if (login.includes('@')) {
            user = await database.getUserByEmail(login);
        } else {
            user = await database.getUserByUsername(login);
        }

        const match = await bcrypt.compare(password, user.password);
        if (match) {
            return user;
        }
        throw new Error('Wrong password.');
    },
    getAllUsers: async () => {
        const data = await database.getAllUsers();

        return data.map(d => ({
            username: get(d, 'username'),
            name: get(d, 'name'),
        }));
    },
    getUserByUsername: async (username) => {
        const user = await database.getUserByUsername(username);

        return {
            username: get(user, 'username'),
            name: get(user, 'name'),
        };
    },
    updatePasswordById: async (id, newPassword) => {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const user = await database.updatePasswordById(id, hashedPassword);
        return user;
    },
    updateProfileById: async (id, data) => {
        const user = await database.updateProfileById(id, data);
        return user;
    },
};

/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
const bcrypt = require('bcrypt');
const firebase = require('../firebase');
const timeUtils = require('../../../utils/time');

module.exports = {
    getAllUsers: (callback) => {
        firebase.database().ref('users').once('value').then((snapshot) => {
            const users = [];
            snapshot.forEach((userSnapshot) => {
                const u = userSnapshot.val();
                users.push(u);
            });
            callback(users);
        });
    },
    getUser: (username, callback) => {
        firebase.database().ref(`users/${username}`).once('value').then((snapshot) => {
            callback(snapshot.val());
        });
    },
    registerUser: (user, callback) => {
        /* encrypt the password before saving user to the database */
        const saltRounds = 10;
        bcrypt.genSalt(saltRounds, (errorGenSalt, salt) => {
            console.log(errorGenSalt);
            bcrypt.hash(user.password, salt, (errorHash, hash) => {
                console.log(errorHash);
                const userData = {
                    ...user,
                    password: hash,
                    createdAt: timeUtils.getFormattedTimestamp(),
                };
                firebase.database().ref(`users/${user.username}`).set(userData).then(() => {
                    callback();
                });
            });
        });
    },
    updateUser: (username, userNewData, callback) => {
        firebase.database().ref(`users/${username}`).update(userNewData).then(() => {
            callback();
        });
    },
    deleteUser: (username, callback) => {
        firebase.database().ref(`users/${username}`).remove().then(() => {
            callback();
        });
    },
};

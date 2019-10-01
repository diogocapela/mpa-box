/* eslint-disable global-require */
const firebase = require('firebase-admin');

const serviceAccount = require('../../../private/FIREBASE_PRIVATE_KEY.json');

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

module.exports = firebase;

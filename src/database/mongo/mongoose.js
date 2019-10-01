/* eslint-disable global-require */
/* eslint-disable no-console */
const mongoose = require('mongoose');
const { logError } = require('../../utils/logger');

const {
    MONGO_HOST,
    MONGO_PORT,
    MONGO_DATABASE,
    MONGO_USERNAME,
    MONGO_PASSWORD,
} = process.env;

mongoose.connect(`mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
});


const db = mongoose.connection;

db.on('open', () => {
    console.log('Mongo database running...');
});

db.on('error', (error) => {
    logError(error);
    logError(error.message);
});


if (process.env.NODE_ENV === 'development') {
    mongoose.set('debug', true);
}

module.exports = mongoose;

/* eslint-disable no-console */
const fs = require('fs');
const chalk = require('chalk');
const time = require('./time');

function appendToLog(message) {
    fs.appendFile(`${__dirname}/../../logger.log`, `${time.getFormattedTimestamp()}\n${message}\n\n\n`, (error) => {
        if (error) {
            console.log(chalk.bgGreen(time.getFormattedTimestamp()));
            console.log(chalk.bgRed(error));
        }
    });
}

module.exports = {
    logError: (error) => {
        console.log(chalk.bgGreen(time.getFormattedTimestamp()));
        if (typeof error === 'object') {
            console.log(chalk.bgRed(JSON.stringify(error, 2)));
        } else {
            console.log(chalk.bgRed(error));
        }
        appendToLog(error);
    },
};

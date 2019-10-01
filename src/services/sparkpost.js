const SparkPost = require('sparkpost');
const timeUtils = require('../utils/time');
const { logError } = require('../utils/logger');

const client = new SparkPost(process.env.SPARKPOST_API_KEY);

const SENDER_MASTER_EMAIL = 'no-reply@example.com';
const RECIPIENT_MASTER_EMAIL = 'catch-all@example.com';

module.exports = {
    sendNotificationEmail: (dataObject, optionalSubject, optionalReq) => {
        let html = '<html><body>';
        Object.keys(dataObject).forEach((key) => {
            html += `<p><b>${key}:</b><br />${dataObject[key]}</p>`;
        });
        if (optionalReq) {
            html += `<p><b>req.headers['x-forwarded-for'] || req.connection.remoteAddress:</b><br />${optionalReq.headers['x-forwarded-for'] || optionalReq.connection.remoteAddress}</p>`;
            html += `<p><b>JSON.stringify(req.headers, null, 2):</b><pre>${JSON.stringify(optionalReq.headers, null, 2)}</pre></p>`;
        }
        html += `<p><b>timestamp:</b><br />${timeUtils.getFormattedTimestamp()}</p>`;
        html += '</body></html>';
        client.transmissions.send({
            options: {
                sandbox: false,
            },
            content: {
                from: SENDER_MASTER_EMAIL,
                subject: `${optionalSubject || 'New notification email!'}`,
                html,
            },
            recipients: [
                {
                    address: RECIPIENT_MASTER_EMAIL,
                },
            ],
        }).then((data) => {
            // eslint-disable-next-line no-console
            console.log(data);
        }).catch((error) => {
            logError(error);
        });
    },
};

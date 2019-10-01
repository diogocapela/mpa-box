module.exports = {
    ifEquals(v1, v2, options) {
        if (v1 === v2) return options.fn(this);
        return options.inverse(this);
    },
    ifNotEquals(v1, v2, options) {
        if (v1 !== v2) return options.fn(this);
        return options.inverse(this);
    },
    /* Usage:
    <pre>{{{renderJSON @root}}}</pre>
    */
    renderJSON(context) {
        return JSON.stringify(context, null, 1);
    },
    json(context) {
        return JSON.stringify(context);
    },
    /* Usage:
    {{{translate
        text=lang.text.userDescription
        params='{"username": "gattaca"}'
    }}}
    */
    translate({ hash }) {
        const {
            text,
            params: jsonParams,
        } = hash;
        const params = JSON.parse(jsonParams);
        const translatedText = Object.keys(params).reduce((a, c) => a.replace(new RegExp(`%{${c}}`, 'g'), params[c]), text);
        return translatedText;
    },
    trimDescription(passedString) {
        let result = passedString;
        let resultArray = result.split(' ');
        if (resultArray.length > 26) {
            resultArray = resultArray.slice(0, 26);
            result = `${resultArray.join(' ')} (...)`;
        }
        return result;
    },
    getDomain(url) {
        const match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
        if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
            return match[2];
        }
        return null;
    },
    loopXTimes(from, to, block) {
        let accumulator = '';
        // eslint-disable-next-line no-plusplus
        for (let i = from; i <= to; i++) {
            accumulator += block.fn(i);
        }
        return accumulator;
    },
    countdownXTimes(from, to, block) {
        let accumulator = '';
        // eslint-disable-next-line no-plusplus
        for (let i = from; i >= to; i--) {
            accumulator += block.fn(i);
        }
        return accumulator;
    },
    listItem(from, to, context, options) {
        let item = '';
        // eslint-disable-next-line no-plusplus
        for (let i = from, j = to; i < j; i++) {
            item += options.fn(context[i]);
        }
        return item;
    },
    ifBetween(index, numLow, numHigh, options) {
        if (index >= numLow && index < numHigh) {
            return options.fn(this);
        }
        return options.inverse(this);
    },
    percentage(amount, total) {
        if (total === 0) return 0;
        return (amount / total) * 100;
    },
    capitalizeSlug(slug) {
        if (!slug) return null;
        return slug
            .replace('-', ' ')
            .toLowerCase()
            .split(' ')
            .map(s => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
    },
};

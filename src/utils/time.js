module.exports = {
    // returns a string with current date formatted as YYYY/MM/DD HH:MM:SS
    getFormattedTimestamp: () => {
        const dt = new Date();
        const year = dt.getFullYear();
        let month = dt.getMonth() + 1;
        let day = dt.getDate();
        let hours = dt.getHours();
        let minutes = dt.getMinutes();
        let seconds = dt.getSeconds();
        if (month < 10) month = `0${month}`;
        if (day < 10) day = `0${day}`;
        if (hours < 10) hours = `0${hours}`;
        if (minutes < 10) minutes = `0${minutes}`;
        if (seconds < 10) seconds = `0${seconds}`;
        return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
    },
    // returns current date and time as a positive integer
    getIntegerTimestamp: () => {
        const dt = new Date();
        const year = dt.getFullYear();
        let month = dt.getMonth() + 1;
        let day = dt.getDate();
        let hours = dt.getHours();
        let minutes = dt.getMinutes();
        let seconds = dt.getSeconds();
        if (month < 10) month = `0${month}`;
        if (day < 10) day = `0${day}`;
        if (hours < 10) hours = `0${hours}`;
        if (minutes < 10) minutes = `0${minutes}`;
        if (seconds < 10) seconds = `0${seconds}`;
        return parseInt(`${year}${month}${day}${hours}${minutes}${seconds}`, 10);
    },
    // receives as a parameter a string with format DD/MM/YYYY and returns the correspondent positive integer
    craftIntegerDate: (date) => {
        const arr = date.split('/');
        if (arr[0] < 10) arr[0] = `0${arr[0]}`;
        if (arr[1] < 10) arr[1] = `0${arr[1]}`;
        return parseInt(`${arr[2]}${arr[1]}${arr[0]}`, 10);
    },
};

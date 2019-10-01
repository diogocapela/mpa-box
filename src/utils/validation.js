module.exports = {
    isValidUsername: username => !(username.length < 3 || username.length > 15),
    isValidEmail: (email) => {
        // eslint-disable-next-line no-useless-escape
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email.toLowerCase());
    },
    isValidPassword: (password) => {
        const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/;
        return re.test(password);
    },
    isValidName: (name) => {
        const re = /^[A-Za-z\s]+$/;
        return re.test(name);
    },
    isValidPhone: phone => phone.length >= 6,
    isValidMessage: message => message.length >= 0,
    curateTitle: title => title.trim(),
    curateDescription: description => description.trim(),
    curateAddress: address => address.trim(),
    curatePhoneNumber: phoneNumber => phoneNumber.trim(),
    curateCoordinates: (coordinatesString) => {
        const coordinates = [];
        const pairs = coordinatesString.split('\n');
        pairs.forEach((pair) => {
            coordinates.push({
                lat: pair.split(',')[0],
                lng: pair.split(',')[1],
            });
        });
        return coordinates;
    },
};

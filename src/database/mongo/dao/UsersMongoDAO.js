const User = require('../models/User.model');

module.exports = {
    addUser: ({ email, username, password, name }) => {
        const user = new User({
            email,
            username,
            password,
            name,
        });

        return user.save();
    },
    getAllUsers: () => User.find({}).exec(),
    // GetUser
    getUserById: id => User.findOne({ _id: id }).exec(),
    getUserByEmail: email => User.findOne({ email }).exec(),
    getUserByUsername: username => User.findOne({ username }).exec(),
    // UpdatePassword
    updatePasswordById: (id, newPassword) => User.findOneAndUpdate({ _id: id }, { password: newPassword }).exec(),
    updatePasswordByEmail: (email, newPassword) => User.findOneAndUpdate({ email }, { password: newPassword }).exec(),
    updatePasswordByUsername: (username, newPassword) => User.findOneAndUpdate({ username }, { password: newPassword }).exec(),
    // UpdateProfile
    updateProfileById: (id, { name, bio }) => User.findOneAndUpdate({ _id: id }, { name, bio }).exec(),
    updateProfileByEmail: (email, { name, bio }) => User.findOneAndUpdate({ email }, { name, bio }).exec(),
    updateProfileByUsername: (username, { name, bio }) => User.findOneAndUpdate({ username }, { name, bio }).exec(),
};

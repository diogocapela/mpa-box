const mongo = require('./mongo');
const postgres = require('./postgres');
const firebase = require('./firebase');

module.exports = {
    // Users Module
    addUser: mongo.addUser,
    getAllUsers: mongo.getAllUsers,
    getUserById: mongo.getUserById,
    getUserByEmail: mongo.getUserByEmail,
    getUserByUsername: mongo.getUserByUsername,
    updatePasswordById: mongo.updatePasswordById,
    updatePasswordByEmail: mongo.updatePasswordByEmail,
    updatePasswordByUsername: mongo.updatePasswordByUsername,
    updateProfileById: mongo.updateProfileById,
    updateProfileByEmail: mongo.updateProfileByEmail,
    updateProfileByUsername: mongo.updateProfileByUsername,
    // Listings Module
    getAllListings: mongo.getAllListings,
    getAllListingsOfUsername: mongo.getAllListingsOfUsername,
    getAllListingsOfEmail: mongo.getAllListingsOfEmail,
    getListingById: mongo.getListingById,
    getListingBySlug: mongo.getListingBySlug,
    addListing: mongo.addListing,
    // Articles Module
    getAllArticles: mongo.getAllArticles,
    getArticleById: mongo.getArticleById,
    getArticleBySlug: mongo.getArticleBySlug,
    // Posts Module
    addPost: mongo.addPost,
    getAllPosts: mongo.getAllPosts,
    getPostById: mongo.getPostById,
    getPostBySlug: mongo.getPostBySlug,
    // Events Module
    getAllEvents: postgres.getAllEvents,
    // Messages Module
    getAllMessages: postgres.getAllMessages,
    // Subscribers Module
    getAllSubscribers: postgres.getAllSubscribers,
    // Blog Module
    getAllBlogPosts: firebase.getAllBlogPosts,
    // Products Module
    getAllProducts: firebase.getAllProducts,
    // Projects Module
    getAllProjects: firebase.getAllProjects,
    // Services Module
    getAllServices: firebase.getAllServices,
};

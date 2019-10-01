const Post = require('../models/Post.model');

module.exports = {
    addPost: ({ slug, title, content, author }) => {
        const post = new Post({
            slug,
            title,
            content,
            author,
        });

        return post.save();
    },
    getAllPosts: () => Post.find({}).populate('author').exec(),
    getPostById: id => Post.findOne({ _id: id }).populate('author').exec(),
    getPostBySlug: slug => Post.findOne({ slug }).populate('author').exec(),
};

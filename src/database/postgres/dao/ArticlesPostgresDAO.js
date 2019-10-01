const pool = require('../postgres');

module.exports = {
    getAllArticles: (callback) => {
        pool.query('select * from "Article"', (error, result) => {
            if (error) return callback(null, error.stack);
            return callback(result.rows, null);
        });
    },
    getAllArticlesByCategoryId: (categoryId, callback) => {
        pool.query('select * from "Article" where article_category_id = $1', [categoryId], (error, result) => {
            if (error) return callback(null, error.stack);
            return callback(result.rows, null);
        });
    },
    getAllArticleCategories: (callback) => {
        pool.query('select * from "ArticleCategory"', (error, result) => {
            if (error) return callback(null, error.stack);
            return callback(result.rows, null);
        });
    },
    getArticleById: (id, callback) => {
        pool.query('select * from "Article" where article_id = $1', [id], (error, result) => {
            if (error) return callback(null, error.stack);
            return callback(result.rows[0], null);
        });
    },
    getArticleBySlug: (slug, callback) => {
        pool.query('select * from "Article" where article_slug = $1', [slug], (error, result) => {
            if (error) return callback(null, error.stack);
            return callback(result.rows[0], null);
        });
    },
    getArticleCategoryById: (id, callback) => {
        pool.query('select * from "ArticleCategory" where article_category_id = $1', [id], (error, result) => {
            if (error) return callback(null, error.stack);
            return callback(result.rows[0], null);
        });
    },
    getArticleCategoryBySlug: (slug, callback) => {
        pool.query('select * from "ArticleCategory" where article_category_slug = $1', [slug], (error, result) => {
            if (error) return callback(null, error.stack);
            return callback(result.rows[0], null);
        });
    },
    addArticle: ({
        slug,
        title,
        content,
        primaryImage,
        date,
    }, callback) => {
        pool.query(`
        insert into "Article"(
            article_slug,
            article_title,
            article_content,
            article_primary_image,
            article_date
        ) values($1, $2, $3, $4, $5)
    `, [
                slug,
                title,
                content,
                primaryImage,
                date,
            ], (error, result) => {
                if (error) return callback(null, error.stack);
                return callback(result, null);
            });
    },
    addArticleCategory: ({ slug, title }, callback) => {
        pool.query(`
        insert into "ArticleCategory"(
            article_category_slug,
            article_category_title
        ) values($1, $2)
    `, [
                slug,
                title,
            ], (error, result) => {
                if (error) return callback(null, error.stack);
                return callback(result, null);
            });
    },
    deleteArticleById: (id, callback) => {
        pool.query('delete from "Article" where article_id = $1', [id], (error, result) => {
            if (error) return callback(null, error.stack);
            return callback(result, null);
        });
    },
    deleteArticleBySlug: (slug, callback) => {
        pool.query('delete from "Article" where article_slug = $1', [slug], (error, result) => {
            if (error) return callback(null, error.stack);
            return callback(result, null);
        });
    },
    deleteArticleCategoryById: (id, callback) => {
        pool.query('delete from "ArticleCategory" where article_category_id = $1', [id], (error, result) => {
            if (error) return callback(null, error.stack);
            return callback(result, null);
        });
    },
    deleteArticleCategoryBySlug: (slug, callback) => {
        pool.query('delete from "ArticleCategory" where article_category_slug = $1', [slug], (error, result) => {
            if (error) return callback(null, error.stack);
            return callback(result, null);
        });
    },
};

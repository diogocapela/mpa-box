const pool = require('../postgres');

module.exports = {
    getAllEvents: (callback) => {
        pool.query('select * from "Event"', (error, result) => {
            if (error) return callback(null, error.stack);
            return callback(result.rows, null);
        });
    },
    getAllEventCategories: (callback) => {
        pool.query('select * from "EventCategory"', (error, result) => {
            if (error) return callback(null, error.stack);
            return callback(result.rows, null);
        });
    },
    getAllEventDifficulties: (callback) => {
        pool.query('select * from "EventDifficulty"', (error, result) => {
            if (error) return callback(null, error.stack);
            return callback(result.rows, null);
        });
    },
    getEventById: (id, callback) => {
        pool.query('select * from "Event" where event_id = $1', [id], (error, result) => {
            if (error) return callback(null, error.stack);
            return callback(result.rows[0], null);
        });
    },
    getEventBySlug: (slug, callback) => {
        pool.query('select * from "Event" where event_slug = $1', [slug], (error, result) => {
            if (error) return callback(null, error.stack);
            return callback(result.rows[0], null);
        });
    },
    getEventCategoryById: (id, callback) => {
        pool.query('select * from "EventCategory" where event_category_id = $1', [id], (error, result) => {
            if (error) return callback(null, error.stack);
            return callback(result.rows[0], null);
        });
    },
    getEventCategoryBySlug: (slug, callback) => {
        pool.query('select * from "EventCategory" where event_category_slug = $1', [slug], (error, result) => {
            if (error) return callback(null, error.stack);
            return callback(result.rows[0], null);
        });
    },
    getEventDifficultyById: (id, callback) => {
        pool.query('select * from "EventDifficulty" where event_difficulty_id = $1', [id], (error, result) => {
            if (error) return callback(null, error.stack);
            return callback(result.rows[0], null);
        });
    },
    getEventDifficultyBySlug: (slug, callback) => {
        pool.query('select * from "EventDifficulty" where event_difficulty_slug = $1', [slug], (error, result) => {
            if (error) return callback(null, error.stack);
            return callback(result.rows[0], null);
        });
    },
    addEvent: (data, callback) => {
        pool.query(`
        insert into "Event"(
            event_category_id,
            event_difficulty_id,
            event_slug,
            event_title,
            event_description,
            event_distance,
            event_duration_days,
            event_meeting_point,
            event_meeting_point_time,
            event_min_participants,
            event_max_participants,
            event_primary_image,
            event_price,
            event_price_adult,
            event_price_child,
            event_price_description,
            event_price_includes,
            event_price_not_includes,
            event_google_maps,
            event_date_start,
            event_date_end,
            event_time_start,
            event_time_end
        ) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23)
    `, [
                data.category,
                data.difficulty,
                data.slug,
                data.title,
                data.description,
                data.distance,
                data.duration_days,
                data.meeting_point,
                data.event_meeting_point_time,
                data.event_min_participants,
                data.event_max_participants,
                data.event_primary_image,
                data.event_price,
                data.event_price_adult,
                data.event_price_child,
                data.event_price_description,
                data.event_price_includes,
                data.event_price_not_includes,
                data.event_google_maps,
                data.event_date_start,
                data.event_date_end,
                data.event_time_start,
                data.event_time_end,
            ], (error, result) => {
                if (error) return callback(null, error.stack);
                return callback(result, null);
            });
    },
    addEventCategory: ({ slug, title }, callback) => {
        pool.query(`
        insert into "EventCategory"(
            event_category_slug,
            event_category_title
        ) values($1, $2)
    `, [
                slug,
                title,
            ], (error, result) => {
                if (error) return callback(null, error.stack);
                return callback(result, null);
            });
    },
    addEventDifficulty: ({ slug, title }, callback) => {
        pool.query(`
        insert into "EventDifficulty"(
            event_difficulty_slug,
            event_difficulty_title
        ) values($1, $2)
    `, [
                slug,
                title,
            ], (error, result) => {
                if (error) return callback(null, error.stack);
                return callback(result, null);
            });
    },
    deleteEventById: (id, callback) => {
        pool.query('delete from "Event" where event_id = $1', [id], (error, result) => {
            if (error) return callback(null, error.stack);
            return callback(result, null);
        });
    },
    deleteEventBySlug: (slug, callback) => {
        pool.query('delete from "Event" where event_slug = $1', [slug], (error, result) => {
            if (error) return callback(null, error.stack);
            return callback(result, null);
        });
    },
    deleteEventCategoryById: (id, callback) => {
        pool.query('delete from "EventCategory" where event_category_id = $1', [id], (error, result) => {
            if (error) return callback(null, error.stack);
            return callback(result, null);
        });
    },
    deleteEventCategoryBySlug: (slug, callback) => {
        pool.query('delete from "EventCategory" where event_category_slug = $1', [slug], (error, result) => {
            if (error) return callback(null, error.stack);
            return callback(result, null);
        });
    },
    deleteEventDifficultyById: (id, callback) => {
        pool.query('delete from "EventDifficulty" where event_difficulty_id = $1', [id], (error, result) => {
            if (error) return callback(null, error.stack);
            return callback(result, null);
        });
    },
    deleteEventDifficultyBySlug: (slug, callback) => {
        pool.query('delete from "EventDifficulty" where event_difficulty_slug = $1', [slug], (error, result) => {
            if (error) return callback(null, error.stack);
            return callback(result, null);
        });
    },
};

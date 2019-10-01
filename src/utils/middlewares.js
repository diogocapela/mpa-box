const get = require('lodash/get');

module.exports = {
    withEnvironment: (req, res, next) => {
        res.locals.isDevelopment = process.env.NODE_ENV === 'development';
        res.locals.isProduction = process.env.NODE_ENV === 'production';
        next();
    },
    withAlerts: (req, res, next) => {
        if (req.session) {
            res.locals.alert = req.session.alert;
            req.session.alert = null;
        }
        next();
    },
    withAuth: (req, res, next) => {
        const isAuthenticated = req.isAuthenticated();
        res.locals.loggedUser = get(req, 'user');
        res.locals.isAuthenticated = isAuthenticated;
        next();
    },
        onlyAllowLoggedIn: (req, res, next) => {
        // console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);
        const isAuthenticated = req.isAuthenticated();
        if (isAuthenticated) return next();
        return res.redirect('/login');
    },
    onlyAllowLoggedOut: (req, res, next) => {
        // console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);
        const isAuthenticated = req.isAuthenticated();
        if (!isAuthenticated) return next();
        return res.redirect('/profile');
    },
    withSEO: (req, res, next) => {
        /* get environment variables */

        const {
            /* meta */
            WEBSITE_NAME,
            WEBSITE_DESCRIPTION,
            WEBSITE_URL,
            WEBSITE_EMAIL,
            WEBSITE_PHONE,
            /* social usernames */
            WEBSITE_FACEBOOK,
            WEBSITE_TWITTER,
            /* social links */
            ANGELLIST_URL,
            BEHANCE_URL,
            CANVA_URL,
            CRUNCHBASE_URL,
            DRIBBBLE_URL,
            FACEBOOK_URL,
            FIVERR_URL,
            GITHUB_URL,
            GOOGLEPLUS_URL,
            INSTAGRAM_URL,
            LINKEDIN_URL,
            MEDIUM_URL,
            PINTEREST_URL,
            REDDIT_URL,
            SOUNDCLOUD_URL,
            TWITTER_URL,
            VIMEO_URL,
            YOUTUBE_URL,
            /* mobile social links */
            MESSENGER_URL,
            TELEGRAM_URL,
            WHATSAPP_URL,
        } = process.env;

        /* write meta data to @meta */

        res.locals.meta = {
            ...res.locals.meta,
            /* page specific */
            pageTitle: WEBSITE_NAME,
            pageDescription: WEBSITE_DESCRIPTION,
            pageImageUrl: `${WEBSITE_URL}/public/img/thumbnail.png`,
            pageUrl: `${WEBSITE_URL}${req.originalUrl}`,
            pageSlug: null,
            /* website specific */
            websiteName: WEBSITE_NAME,
            websiteDescription: WEBSITE_DESCRIPTION,
            websiteUrl: WEBSITE_URL,
            websiteEmail: WEBSITE_EMAIL,
            websitePhone: WEBSITE_PHONE,
            websiteFacebook: WEBSITE_FACEBOOK,
            websiteTwitter: WEBSITE_TWITTER,
        };

        res.locals.socialLinks = {
            /* social links */
            angellist: ANGELLIST_URL,
            behance: BEHANCE_URL,
            canva: CANVA_URL,
            crunchbase: CRUNCHBASE_URL,
            dribbble: DRIBBBLE_URL,
            facebook: FACEBOOK_URL,
            fiverr: FIVERR_URL,
            github: GITHUB_URL,
            googleplus: GOOGLEPLUS_URL,
            instagram: INSTAGRAM_URL,
            linkedin: LINKEDIN_URL,
            medium: MEDIUM_URL,
            pinterest: PINTEREST_URL,
            reddit: REDDIT_URL,
            soundcloud: SOUNDCLOUD_URL,
            twitter: TWITTER_URL,
            vimeo: VIMEO_URL,
            youtube: YOUTUBE_URL,
            /* mobile social links */
            messenger: MESSENGER_URL,
            telegram: TELEGRAM_URL,
            whatsapp: WHATSAPP_URL,
        };

        const socialLinksArray = [
            ANGELLIST_URL,
            BEHANCE_URL,
            CANVA_URL,
            CRUNCHBASE_URL,
            DRIBBBLE_URL,
            FACEBOOK_URL,
            FIVERR_URL,
            GITHUB_URL,
            GOOGLEPLUS_URL,
            INSTAGRAM_URL,
            LINKEDIN_URL,
            MEDIUM_URL,
            PINTEREST_URL,
            REDDIT_URL,
            SOUNDCLOUD_URL,
            TWITTER_URL,
            VIMEO_URL,
            YOUTUBE_URL,
            MESSENGER_URL,
            TELEGRAM_URL,
            WHATSAPP_URL,
        ];

        res.locals.socialLinksArray = socialLinksArray.filter(el => el !== null && el !== '' && el !== undefined);

        next();
    },
};

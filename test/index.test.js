/* eslint-disable no-undef */
const supertest = require('supertest');

const server = require('../src/server.js');

const testRoutes200 = [
    '/',
    '/register',
    '/login',
    '/listings',
];

const testRoutes302 = [
    '/my-listings',
    '/settings',
    '/settings/update-profile',
    '/settings/update-password',
    '/settings/delete-account',
    '/add-listing',
];

const testRoutes404 = [
    /* placeholder */
];

testRoutes200.forEach((route) => {
    describe(`GET ${route}`, () => {
        it('should return 200 OK', (done) => {
            supertest(server)
                .get(route)
                .set('Content-Type', 'text/html')
                .expect(200, done);
        });
    });
});

testRoutes302.forEach((route) => {
    describe(`GET ${route}`, () => {
        it('should return 302 Found Redirection', (done) => {
            supertest(server)
                .get(route)
                .set('Content-Type', 'text/html')
                .expect(302, done);
        });
    });
});

testRoutes404.forEach((route) => {
    describe(`GET ${route}`, () => {
        it('should return 404 Not Found', (done) => {
            supertest(server)
                .get(route)
                .set('Content-Type', 'text/html')
                .expect(404, done);
        });
    });
});

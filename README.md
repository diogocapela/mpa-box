
[![Build Status][build-status-img]][build-status-url] [![Dependencies Status][dependencies-status-img]][dependencies-status-url] [![Dev Dependencies Status][dev-dependencies-status-img]][dev-dependencies-status-url] [![Code Style][code-style-img]][code-style-url]

[build-status-url]: https://travis-ci.org/diogocapela/mpa-box
[build-status-img]: https://travis-ci.org/diogocapela/mpa-box.svg?branch=master
[dependencies-status-url]: https://david-dm.org/diogocapela/mpa-box
[dependencies-status-img]: https://img.shields.io/david/diogocapela/mpa-box.svg
[dev-dependencies-status-url]: https://david-dm.org/diogocapela/mpa-box?type=dev
[dev-dependencies-status-img]: https://img.shields.io/david/dev/diogocapela/mpa-box.svg
[code-style-url]: https://github.com/prettier/prettier
[code-style-img]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square

CRUD multi-page application built using Node.js, Express and Handlebars.

## **Setup**

```bash
# Get the latest snapshot
$ git clone https://github.com/diogocapela/mpa-box.git && cd mpa-box

# Install all the dependencies
$ yarn

# Generate a .env file
$ cp .env.sample .env

# Get a FIREBASE_PRIVATE_KEY.json config file
$ open https://console.firebase.google.com
```

## **Scripts**

```bash
# Start the development server
$ yarn dev

# Run the tests
$ yarn test

# Builds a sitemap at /public/sitemap.xml
$ yarn build:sitemap

# Build for production
$ yarn build

# Start the production server
$ yarn start

# Clean node_modules
$ yarn clean
```

## **License**

Open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

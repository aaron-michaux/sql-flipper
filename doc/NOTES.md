
### Battle Plan

 + Connect to psql using Knex, and run some queries
 + Serve static index.html with Express
 * Login form in React
 * Error messages between server and client
 * Wait indicator...
 * Manage (and hydrate) client state
 * Load in React/Redux application
 * Redux logging/exception middleware -- see redux website
 * Database credentials "window"
 * "(emotion)[https://github.com/emotion-js/emotion/tree/main/packages/react]" style 
 * Query window with tables in sidebar
 * Run SQL query, and show results underneath

### Install

```bash
# Creates a package file
npm init

# Install some stuff
npm i lodash express
npm i -D nodemon
npm i knex --save
npm i pg
npm i express express-session redis connect-redis

```

### Useful stuff

```bash
# Install everything listed in the packages.json file
npm install

# See all the dependencies
npm list
npm list --depth=3

# View a package
npm view lodash

# See all versions of a package
npm view lodash versions

# Show outdated packages
npm outdated

# Update outdated packages -- minor.patch releases only
npm update

```

### Frameworks

 * [Express](expressjs.com), REST endpoints
 * [LoopBack](https://loopback.io/), Building Microservices over Express
 * [knex](https://knexjs.org), Building SQL queries
 * [emotion](https://emotion.sh/docs/keyframes), Javascript CSS

### Libraries

 * [Lodash](https://lodash.com/), helper methods.


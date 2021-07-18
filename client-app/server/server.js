
// -------------------------------------------------------------------- Includes

const path = require("path");
const express = require('express');
const expressSession = require('express-session');
const redis = require('redis');
const connectRedis = require('connect-redis');
const knex = require('knex');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

const dbConn = require('./src/database-functions');

// const RedisStore = connectRedis(expressSession);
// const redisClient = redis.createClient({
//     host: 'localhost',
//     port: 6379
// });

// redisClient.on('error', function (err) {
//     console.log('Could not establish a connection with redis. ' + err);
// });
// redisClient.on('connect', function (err) {
//     console.log('Connected to redis successfully');
// });

// ------------------------------------------------- Cross Origin from Localhost

const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];
app.use(cors({
    origin: function(origin, callback){    // allow requests with no origin 
        // (like mobile apps or curl requests)
        if(!origin) return callback(null, true);

        if(allowedOrigins.indexOf(origin) === -1){
            var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }    return callback(null, true);
    }
}));

// ------------------------------------------------------------- Set up Sessions
// NOTE: We have no session store, so this is a 1-user app
app.use(express.json());
//app.use(cookieParser());
app.use(expressSession({
    secret: 'a-secret!', // We don't have https... ignoring security
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: false,  // we got not https!
        httpOnly: false // true=>prevent client-js from reading cookie
    }
}));

// ---------------------------------------------------------- Serve Static Pages

app.use(express.static(`${__dirname}/../build`));
app.use(express.static('public'));

// -------------------------------------------------------------------- Sessions
// We could have a multi-user system
// with a sophisticated session store =)
var sessionData = { connection: null };

// ------------------------------------------------------------------- Endpoints

app.post('/api/connect', (req, res) => {
    let params = req.body;
    console.log(params);
    const sendResponse = (data) => {
        setTimeout(() => {
            res.json(data);
        }, 110);
    };
    
    dbConn.destroy(sessionData.connection); // Clear any existing connection
    dbConn.connect(knex, params, (connection, err) => {
        if(err) {
            sendResponse({ status: 'complete', error: 'Connection Failed' }); 
        } else {
             // Save the connection for later
            sessionData = { connection: connection };
            sendResponse({ status: 'complete', error: null });            
        }
    });
});

app.post('/api/tables', (req, res) => {    
    dbConn.getTables(sessionData.connection, (data) => {
        console.log(data);
        res.json(data);
    });
});

// ---------------------------------------------------------------------- Listen

app.listen(PORT, () => console.log(`App is running at port ${PORT}`));



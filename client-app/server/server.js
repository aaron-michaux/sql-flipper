
// -------------------------------------------------------------------- Includes

const path = require("path");
const express = require('express');
const expressSession = require('express-session');
const knex = require('knex');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

const dbConn = require('./src/database-functions');

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

// ---------------------------------------------------------- Serve Static Pages
// NOTE: We have no session store, so this is a 1-user app
app.use(express.json());
app.use(express.static(`${__dirname}/../build`));
app.use(express.static('public'));

// -------------------------------------------------------------------- Sessions
// We could have a multi-user system
// with a sophisticated session store =)
var sessionData = { connection: null };

// ------------------------------------------------------------------- Endpoints

app.post('/api/connect', (req, res) => {
    let params = req.body;
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

app.post('/api/disconnect', (req, res) => {
    dbConn.destroy(sessionData.connection); // Clear any existing connection
    const sendResponse = (data) => {
        setTimeout(() => {
            res.json(data);
        }, 110);
    };
    sendResponse({status: 'complete', error: null});
});

app.post('/api/tables', (req, res) => {
    dbConn.getTables(sessionData.connection, (data) => {
        res.json(data);
    });
});

app.post('/api/execute-query', (req, res) => {
    const rawSql = req.body.sql;
    dbConn.execSql(sessionData.connection, rawSql, (result) => {
        result.data = dbConn.convertRawSqlResult(result.data);
        res.json(result);
    });
});

// ---------------------------------------------------------------------- Listen

app.listen(PORT, () => console.log(`App is running at port ${PORT}`));



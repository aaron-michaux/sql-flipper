
function makeSessionStore(session) {
    const redis = require('redis');
    const connectRedis = require('connect-redis');
    const RedisStore = connectRedis(session);
    const redisClient = redis.createClient({
        host: 'localhost',
        port: 6379
    });
    redisClient.on('error', function (err) {
        console.log('Error connecting to redis: ' + err);
    });
    redisClient.on('connect', function (err) {
        console.log('Established connection to the session store.');
    });
    return new RedisStore({ client: redisClient });
};


module.exports = { makeSessionStore };

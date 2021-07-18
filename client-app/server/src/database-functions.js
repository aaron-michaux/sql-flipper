
function makeNewDatabaseConnection(knex, connectionParams, thunk)
{
    const connection = knex({
        client: 'pg',
        debug: true,
        connection: connectionParams
    });

    // Run a query to establish the connection
    connection.select('table_name').from('information_schema.tables').limit(1)
        .then((obj) => { thunk(connection, null); })
        .catch((err) => { thunk(connection, err); connection.destroy(); });
}

function destroyConnection(obj)
{
    if(obj) obj.destroy();
}

function getTables(connection, thunk)
{
    try {
        connection.select('table_name').from('information_schema.tables')
            .where('table_schema', 'public').orderBy('table_name')
            .then((obj) => { thunk({ data: obj, error: null }); })
            .catch((err) => { thunk({ data: null, error: err }); });
    } catch(err) {
        thunk({ data: null, error: 'Exception processing request' });
    }
}

module.exports = {
    connect: makeNewDatabaseConnection,
    destroy: destroyConnection,
    getTables: getTables,
};
 

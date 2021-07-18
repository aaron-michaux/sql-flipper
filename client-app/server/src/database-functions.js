
function makeNewDatabaseConnection(knex, connectionParams, thunk)
{
    const connection = knex({
        client: 'pg',
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

function convertDbError(obj)
{
    if(typeof obj === 'string' || obj instanceof String) {
        return obj;
    } else if(typeof obj === 'object' && obj !== null) {
        return obj?.message;        
    }
    return obj;
}

function getTables(connection, thunk)
{
    try {
        connection.select('table_name').from('information_schema.tables')
            .where('table_schema', 'public').orderBy('table_name')
            .then((obj) => { thunk({ data: obj, error: null }); })
            .catch((err) => { thunk({ data: null, error: convertDbError(err) }); });
    } catch(err) {
        thunk({ data: null, error: 'Exception processing request' });
    }
}

function execSql(connection, rawSql, thunk)
{
    try {
        connection.raw(rawSql)
            .then((obj) => { thunk({ data: obj, error: null }); })
            .catch((err) => { thunk({ data: null, error: convertDbError(err) }); });
    } catch(err) {
        thunk({ data: null, error: 'Exception processing request' });
    }
}

function convertRawSqlResult(data)
{
    if(data == null) return data; // nothing to do
    switch(data.command) {
    case 'SELECT':
        return {
            command: 'SELECT',
            rows: data.rows,
            fields: data.fields.map((field) => { return field.name; })
        };
    case 'DELETE':
        return {
            command: 'DELETE',
            rowCount: data.rowCount,
        };
    case 'UPDATE':
        return {
            command: 'UPDATE',
            rowCount: data.rowCount,
        };
    case 'INSERT':
        return {
            command: 'INSERT',
            rowCount: data.rowCount,
        };
    default:
        console.log(`UNKNOWN COMMAND: ${data.command}`);
        return data;
    }
}

module.exports = {
    connect: makeNewDatabaseConnection,
    destroy: destroyConnection,
    getTables: getTables,
    execSql: execSql,
    convertRawSqlResult: convertRawSqlResult,
};
 

var sql = require('mssql');
var config = require("config");


const data_cnn = {
    user: config.get("mssql.user"),
    password: config.get("mssql.password"),
    server: config.get("mssql.server"),
    database: config.get("mssql.database")
};

var pool = sql.connect(data_cnn);

function getConnection(){
    if(!pool)
    {
        pool.connect(data_cnn);
    }
    return pool;
}

module.exports= {
    getConnection: getConnection
}
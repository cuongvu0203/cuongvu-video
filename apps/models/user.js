var q = require("q");
var db = require("../common/datatbase")

var conn = db.getConnection();

function addUser(user){
    if(user)
    {
        const result = conn.query`select * from [DAN_TOC]`
        console.dir(result)

    }
    return false;
}

module.exports = {
    addUser: addUser
}
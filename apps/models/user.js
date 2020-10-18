var q = require("q");
var db = require("../common/database");

var conn = db.getConnection();
function addUser(user) {
    if (user) {
        console.log(user);
        var defer = q.defer();
        conn.query("INSERT INTO users SET ?", user, function (err, result) {
            if (err) {
                defer.reject(err);
            }
            else {
                defer.resolve(result);

            }

        });
        return defer.promise;

    }
    return false;
}

function getUserbyUsername(username) {
    if (username) {
        var defer = q.defer();
        conn.query("SELECT * FROM Users WHERE ?", {username: username}, function (err, result) {
            if (err) {
                defer.reject(err);
            }
            else {
                defer.resolve(result);
            }

        });
        return defer.promise;

    }
    return false;

}

module.exports = {
    addUser: addUser,
    getUserbyUsername: getUserbyUsername
}
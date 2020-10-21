var q = require("q");
var db = require("../common/database");

//Lưu ý: Khi select , update, delete, insert cần viết đúng tên bảng kể cả hoa lẫn thường mysql không hiểu giống mssql

var conn = db.getConnection();
function addUser(user) {
    if (user) {
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
        conn.query("SELECT * FROM users WHERE ?", {USERNAME: username}, function (err, result) {
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
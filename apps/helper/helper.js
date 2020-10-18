var bycrypt = require("bcrypt");
var config = require("../../config/default.json");

function hash_password(password) {
    var saltRounds = config.salt;
    var salt = bycrypt.genSaltSync(saltRounds);
    var hash = bycrypt.hashSync(password, salt);

    return hash;

};

function compare_password(password, hash) {
    return bcrypt.compareSync(password, hash);
};

module.exports = {
    hash_password: hash_password,
    compare_password:compare_password
}

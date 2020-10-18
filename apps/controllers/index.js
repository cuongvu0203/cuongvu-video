var express = require("express");

var router = express.Router();

router.use('/admin', require(__dirname +'/admin'));
router.use('/home', require(__dirname + '/home'));

module.exports = router;
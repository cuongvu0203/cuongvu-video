var express = require("express");

var router = express.Router();

router.use('/admin', require(__dirname +'/admin'));
router.use('/home', require(__dirname + '/home'));

router.get("/",function(req,res){
    //res.json({"messenger": "this is homepage"});
    res.render("test");
});

module.exports = router;
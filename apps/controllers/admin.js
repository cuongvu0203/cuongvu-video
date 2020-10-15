var express = require("express");

var router = express.Router();

var users_model = require("../models/user");

router.get("/",function(req,res){
    res.json({"messenger": "this is Admin"});
});

router.get("/signup",function(req,res){
    res.render("signup", {data: {}});
});

router.post("/signup",function(req,res){
    var user = req.body;
    if(user.email.trim().length == 0)
    {
        res.render("signup",{data: {error:"Email req"}});
    }

    if(user.passwd != user.repasswd && user.passwd.trim().length != 0)
    {
        res.render("signup",{data: {error:"Sai password"}});
    }

    //insert db
    user = {
        email: user.email,
        password: user.passwd
    };
    var result = users_model.addUser(user);
    if(!result){
        res.render("signup",{data: {error:"loi insert db"}});
    }
    else{
        res.json({message: "Insert ok"});
    }
});

module.exports = router;
var express = require("express");

var router = express.Router();
var users_model = require("../models/user");
var helper = require("../helper/helper")

router.get("/", function (req, res) {
    res.json({"Messenger":"This is Adminpage"});
});

router.get("/signup", function (req, res) {
    res.render("signup", { data: {} });
});

router.get("/signin", function (req, res) {
    res.render("signin", { data: {} });
});

router.post("/signin", function (req, res) {
    var user_login = req.body;

    if (user_login.username.trim().length == 0) {
        res.render("signin", { data: { error: "Bạn phải nhập username" } });
    }
    if (user_login.password.trim().length == 0) {
        res.render("signin", { data: { error: "Bạn phải nhập password" } });
    }
    var data = users_model.getUserbyUsername(user_login.username);
    if (data) {
        data.then(function(users){
            var user = users[0];       
            var status = helper.compare_password(user_login.password, user.PASSWORD);
            if (!status) {
                res.render("signin", { data: { error: "Sai mật khẩu" } });
            }
            else {
                req.session.user = user;
                console.log(req.session.user);
                res.redirect("/admin");
            }
        });
    }
    else {
        res.render("signin", { data: { error: "Tài khoản không tồn tại" } });
    }

});


router.post("/signup", function (req, res) {
    var user = req.body;
    if (user.username.trim().length == 0) {
        res.render("signup", { data: { error: "Bạn phải nhập username" } });
    }
    if (user.email.trim().length == 0) {
        res.render("signup", { data: { error: "Bạn phải nhập email" } });
    }
    if (user.password != user.repassword && user.password.trim().length != 0) {
        res.render("signup", { data: { error: "Password nhập lại không trùng khớp nhau" } });
    }
    var ck_sex = 0;
    if (user.gender == "Male") {
        ck_sex = 1;
    }

    var password = helper.hash_password(user.password);
    //insert db
    user = {
        username: user.username,
        password: password,
        is_admin: 1,
        email: user.email,
        sex: ck_sex
    };
    var result = users_model.addUser(user);

    result.then(function (data) {
        //res.json({ message: "Insert ok" });
        res.redirect("/admin/signin");

    }).catch(function (err) {
        res.render("signup", { data: { error: "error" } });
    });
});

module.exports = router;
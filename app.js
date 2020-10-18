var express = require("express");
var config = require("config");
var bodyParser = require("body-parser");
var sesion = require("express-session");
var app = express();

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('trust proxy', 1)
app.use(sesion({
    secret: config.get("secret-key"),
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }

}));

//using ejs
app.set("views", __dirname + "/apps/views");
app.set("view engine", "ejs");

//cấu hình các folder static
app.use("/static", express.static(__dirname + "/public"));

var controllers = require(__dirname + "/apps/controllers");
app.use(controllers);

var host = config.get("server.host");
var port = config.get("server.port");

app.listen(port, host, function () {
    console.log("server on port ", port);
});

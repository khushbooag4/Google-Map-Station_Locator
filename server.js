var express = require('express');
var logger = require("morgan");
require("dotenv").config();
var cors = require("cors");
var path = require('path');
var dbconfig = require("./config/db.config");

var app = express();
var port = 5000 || process.env.PORT;

// view engine setup

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));



app.use('/',require('./routes/route'));


app.listen(port, () => 
    console.log(`App listening on port ${port}!`)
);
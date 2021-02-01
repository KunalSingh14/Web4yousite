// jshint esversion:6


// ----Requirements----
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));





app.get("/",function(req,res){
    res.render("home");
});

app.get("/compose",function(req,res){
    res.render("compose");
});

app.post("/compose",function(req,res){
    res.redirect("/");
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
});
  
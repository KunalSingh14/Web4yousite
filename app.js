// jshint esversion:6


// ----Requirements----
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { identity, remove } = require("lodash");

const adminRoutes = require('./routes/admin')
const multer = require('multer');

const app = express();

const filestorage =  multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,'./images');
    },
    filename : (req,file,cb)=> {
        cb(null,file.fieldname + Date.now() + '-' + file.originalname )
    }
})

const filefilter = (req,file,cb) => {
    if(file.mimetype === 'image/jpg'
       || file.mimetype === 'image/jpeg'
       || file.mimetype === 'image/png'){
           cb(null,true)
       }else{
           cb(null,false)
       }
}


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// ----Startng the database----

mongoose.connect("mongodb://localhost:27017/web4you", {useNewUrlParser: true});




var delID;




app.use('/images',express.static("images"));
app.use(multer (
      {
        storage : filestorage,
        fileFilter : filefilter
     }
 ).single('postimg')
)



app.use(adminRoutes);



app.listen(3000, function() {
    console.log("Server started on port 3000");
}); //no comment
  

var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function currentDiv(n) {
  showDivs(slideIndex = n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" w3-white", "");
  }
  x[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " w3-white";
}
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}

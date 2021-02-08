"use strict";

var Post = require('../models/post');

exports.getHome = function (req, res, next) {
  Post.find({}, function (err, posts) {
    console.log(posts);
    res.render("home", {
      posts: posts
    });
  });
};

exports.getCompose = function (req, res, next) {


  res.render("compose");
};

// exports.postDelCnf = function(req,res,next) {

//   const currID = req.params.id;
//   console.log(currID);

//   res.render("delCnf",{id : currID});
// };

// exports.getDelCnf = function(req,res,next) {
//   res.render("delCnf")
// }

// exports.postDelete = function(req,res,next){
//   const currEmail = req.body.delEmail;
//   const currID = req.body.button;
//   console.log(currID);
//   Post.findOne({_id: currID},function(err,obj){
//     if(obj.email == currEmail){
//       Post.findByIdAndRemove(currID,function(err){
//         if(!err){
//           console.log("Successfully Deleted");
//           res.redirect("/");
//         }
//       });
//     }else{
//       res.render("Delete");
//     }
//   })
// };


exports.postCompose = function (req, res, next) {
  var post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody,
    name: req.body.composerName,
    email: req.body.composerEmail
  });
  Post.findOne({
    title: req.body.postTitle
  }, function (err, obj) {
    if (!obj) {
      post.save(function (err) {
        if (!err) {
          res.redirect("/");
        }
      });
    } else {
      res.redirect("/exists");
    }
  });
};

exports.getExists = function (req, res, next) {
  res.render("exists");
};


exports.getSignup = function (req,res,next) {
  res.render("signup");
};

exports.postSignup = function (req,res,next) {
  console.log("postSignup");
  const email = req.body.signup_email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const password = req.body.password; 
  console.log(email + " " + firstName + " " + lastName + " " + password);
  res.redirect("/login");
};

exports.getLogin = function(req,res,next) {
  res.render("login");
};

exports.postLogin = function(req,res,next){
  res.redirect("/");
};

exports.deletePost = function (req,res,next) {
  const postId = req.params.postId
 console.log('post deleting')
 console.log(postId);

  Post.findById({_id : postId})
      .then(post => {
        console.log('image deleting')
        return deleteFile(post.imageUrl)
      })
      .then(result => {
        console.log('post deleted')
        Post.deleteOne({_id : postId} ,(err) => {
          if(err){
            console.log(err);
            return
          }
          res.status(200).json({redirect : '/'})
        })
      })
      .catch(err => {
        console.log(err);
      })
};
const Post = require('../models/post')



exports.getHome = (req,res,next) => {
    Post.find({}, function(err, posts){
        console.log(posts);
        res.render("home", {
          posts: posts
          });
      });
}

exports.getCompose = (req,res,next)=> {
    res.render("compose");
}


// exports.getDelCnf = (req, res, next)=> {
//   res.render("delCnf");
// }

exports.postDelCnf = (req,res,next)=> {

    const currID =req.params.id;
    console.log(currID);
    res.render("delCnf",{id : currID});
  }


exports.postDelete = (req,res,next)=> {
    const currEmail = req.body.delEmail;
    const currID = req.body.button;
    console.log(currID);
    Post.findOne({_id: currID},function(err,obj){
      if(obj.email == currEmail){
        Post.findByIdAndRemove(currID,function(err){
          if(!err){
            console.log("Successfully Deleted");
            res.redirect("/");
          }
        });
      }else{
        res.render("Delete");
      }
    })
}

exports.postCompose = (req,res,next) => {
    const title = req.body.postTitle;
    const imageUrl = req.file.path;
    const content = req.body.postBody;
    console.log(imageUrl)
    const post = new Post({
        title: title,
        imageUrl : imageUrl,
        content: content,
        name: req.body.composerName,
        email: req.body.composerEmail
      });
      console.log('post created')
      Post.findOne({title: title},function(err,obj){
          console.log('post finding')
          if(!obj){
            post.save(function(err){
                console.log('post save')
                if (!err){
                    res.redirect("/");
                }
              });
          }else{
              res.redirect("/exists");
          }
      });
}

exports.getExists = (req,res,next)=> {
    res.render("exists"); 
}

const User = require('../models/userModel') 
const Post = require('../models/postModel')
const path = require('path');
const jwt = require('jsonwebtoken');
const { getSuitableDate } = require('./../midddleware/middlewares')

// Adding a new Tour
exports.createPost = (req, res) => {

    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'machineLearningGrocery', async (err, decodedToken) => {
          if (!err) {
            let user = await User.findById(decodedToken.id);

            req.body.autherName = `${user.firstName} ${user.lastName}`
            req.body.autherGmail = user.gmail  
            req.body.created = getSuitableDate()
            const post = await Post.create(req.body)
            res.send(post)
          }
        });
      }     
}

// Getting all the tours
exports.getAllThePosts = async(req, res) => {
    
    const posts = await Post.find().sort({date : -1})       
    res.locals.posts = posts
    res.render('index',{title: 'Home'})
}



// Getting a single Tour by ID
exports.updateLike = async (req, res) => {
    try{
        if(req.body.like === true){

            const post = await Post.findByIdAndUpdate(req.body._id, {$push: {likes: req.body.gmail}}, {new: true})
        }else if (req.body.like === false){
            const post = await Post.findByIdAndUpdate(req.body._id, {$pull: {likes: req.body.gmail}}, {new: true})

        }
        console.log(post)
        
    } catch(err){
        res.status(404).json({
            status: "failed",
            data: err
        })
    }
    
}

exports.logout = (req, res) => {

    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/login');

} 


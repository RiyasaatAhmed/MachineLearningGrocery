const jwt = require('jsonwebtoken');
const User = require('../models/userModel')
const Post = require('../models/postModel')
const Job = require('../models/jobModel')



const path = require('path')

exports.getProfile = async(req, res) => {
    const posts = await Post.find().sort({date : -1}) 
    res.locals.posts = posts   
    const jobs = await Job.find().sort({date : -1})
    res.locals.jobs = jobs   
    res.render('profile', {title: 'Profile'});
    
} 

exports.profilePhoto = async(req, res) => {
    const token = req.cookies.jwt;
    const filePath = req.file.path
    jwt.verify(token, 'machineLearningGrocery', async (err, decodedToken) =>{
        const user = await User.findByIdAndUpdate(decodedToken.id, { profilePicture : filePath}, {new: true})

      });
}
exports.coverPhoto = async(req, res) => {
    const token = req.cookies.jwt;
    const filePath = req.file.path
    jwt.verify(token, 'machineLearningGrocery', async (err, decodedToken) =>{
        const user = await User.findByIdAndUpdate(decodedToken.id, { coverPicture : filePath}, {new: true})
      });
}

exports.profileUpdate = async(req, res) => {
    if(req.body.type === "bio") {
        const user = await User.findByIdAndUpdate(req.body._id, {bio : req.body.update}, {new: true})
    }
    if(req.body.type === "designation") {
        const user = await User.findByIdAndUpdate(req.body._id, {designation : req.body.update}, {new: true})
    }
    if(req.body.type === "university") {
        const user = await User.findByIdAndUpdate(req.body._id, {university : req.body.update}, {new: true})
    }
    if(req.body.type === "college") {
        const user = await User.findByIdAndUpdate(req.body._id, {college : req.body.update}, {new: true})
    }
    if(req.body.type === "school") {
        const user = await User.findByIdAndUpdate(req.body._id, {school : req.body.update}, {new: true})
    }
    if(req.body.type === "organization") {
        const user = await User.findByIdAndUpdate(req.body._id, {organization : req.body.update}, {new: true})
    }
    if(req.body.type === "gmail") {
        const user = await User.findByIdAndUpdate(req.body._id, {gmail : req.body.update}, {new: true})
    }
}


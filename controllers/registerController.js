const User = require('./../models/userModel')
const Post = require('./../models/postModel')
const Job = require('./../models/jobModel')
const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'machineLearningGrocery', {
    expiresIn: maxAge
  });
};

exports.getRegistrationPage = (req, res) => {

    res.render('register', {title: 'Registration'})
}

exports.createUser = async(req, res) => {

    try {
        req.body.fullName = `${req.body.firstName} ${req.body.lastName}`
        req.body.balance = 0
        const user = await User.create(req.body);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: user._id });
    } catch(err) {
        res.status(400).json({ err });
    }
}


exports.deleteUser = async(req, res) => {
  const user = await User.findOneAndDelete({gmail: req.body.gmail})
  const posts = await Post.deleteMany({autherGmail: req.body.gmail})
  const jobs = await Job.deleteMany({gmail: req.body.gmail})

}
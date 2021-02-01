const User = require('./../models/userModel')
const jwt = require('jsonwebtoken');


const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'machineLearningGrocery', {
    expiresIn: maxAge
  });
};


exports.login_get = (req, res) => {
    res.render('login', {title: 'Login'});
  }

exports.login_post = async (req, res) => {
  // console.log(gmail, password)
  try {
        const { gmail, password } = req.body;
        const user = await User.login(gmail, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user });
    } 
    catch (err) {
        res.status(400).json({ err });
        console.log(err)
    }
}
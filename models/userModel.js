const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({

    firstName : {
        type: String,
        required: true
    },
    lastName : {
        type: String,
        required: true
    },
    fullName : {
        type: String
    },
    gmail : {
        type: String,
        unique: true,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    balance : {
      type: Number
    },
    bio : {
      type: String
    },
    school : {
      type: String
    },
    college : {
      type: String
    },
    university : {
      type: String
    },
    designation : {
      type: String
    },
    organization : {
      type : String
    },
    profilePicture : {
      type: String
    },
    coverPicture : {
      type: String
    }
})


userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });


userSchema.statics.login = async function(gmail, password) {
    const user = await this.findOne({ gmail });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
    }
  };

const User = mongoose.model('User', userSchema)

module.exports = User;
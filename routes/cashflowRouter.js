const express = require("express")
const User = require("../models/userModel")

const router = express.Router()

const updateCash = async(req, res) => {
    await User.findByIdAndUpdate(req.body._id, 
        {$inc:{balance: req.body.update}}, 
        {new: true})
}
router.route('/').put(updateCash)
module.exports = router
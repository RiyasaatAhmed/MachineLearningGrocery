const express = require("express")
const Report = require("../models/reportModel")
const User = require("../models/userModel")
const router = express.Router()


const getReportPage = (req, res) => {
    res.render('report', {title: 'Report'})
}
const createReport = async(req, res) => { 
    const single = await User.findOne({fullName: req.body.reportedAgainstName})
    req.body.reportedAgainstGmail = single.gmail
    const report = await Report.create(req.body)
}
router.route('/').get(getReportPage).post(createReport)




module.exports = router




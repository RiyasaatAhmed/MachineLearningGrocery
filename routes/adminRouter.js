const express = require('express')
const User = require("../models/userModel")
const Job = require("../models/jobModel")
const Report = require("../models/reportModel")

const router = express.Router()

const getAdminPage = async(req, res) => {
    const users = await User.find()
    const reports = await Report.find()
    const jobs = await Job.find({isCompleted: true})

    res.locals.users = users
    res.locals.reports = reports
    res.locals.jobs = jobs
    res.render('admin', {title: 'Admin'})
}
router.route('/').get(getAdminPage)


module.exports = router

const Job = require('../models/jobModel')
const User = require('../models/userModel')
const { getSuitableDate } = require('./../midddleware/middlewares')
const fs = require('fs')



exports.createJob = async(req, res) => {

    const user = await User.findOne({gmail : req.body.gmail})
    req.body.name = user.firstName + " " + user.lastName;
    req.body.donePayment = false;
    req.body.created = getSuitableDate()
    const job = await Job.create(req.body)
}

exports.getJobs = async (req, res) => {
    const jobs = await Job.find().sort({date : -1})
    res.locals.jobs = jobs
    res.render('jobs', {title: 'Jobs'})
}

exports.addSample = async (req, res) => {

    await Job.findByIdAndUpdate(req.body._id, {$addToSet: { workSamples: req.body.sample}},{new: true})
    await Job.findByIdAndUpdate(req.body._id, {$addToSet : {currentlyWorking: req.body.gmail}}, {new: true})
    const job = await Job.findByIdAndUpdate(req.body._id, {isCompleted: req.body.isCompleted},{new: true})
    if(job.isCompleted) {
        const arr = new Array(job.currentlyWorking.length).fill(0)
        for(let i = 0; i < job.currentlyWorking.length; i++) {
            let cnt = 0
            for(let j = 0; j < job.workSamples.length; j++ ) {
                if(job.workSamples[j].includes(job.currentlyWorking[i])){
                    cnt += 1
                }
            }
            arr[i] = (cnt/job.sampleNumber)*job.budget
        }
        console.log(`arr: ${arr}`)
        const after = await Job.findByIdAndUpdate(job._id,  {moneyAmount:  arr }, {new: true})  
        fs.writeFileSync(`./datasets/${job._id}.json`, JSON.stringify(job.workSamples))
        console.log(after)
    }
}

exports.getDataset = async(req, res) => {
    const job = await Job.findById(req.body._id)
    res.render(job.workSamples)
}


exports.makePayment = async (req, res) => {
    console.log(req.body)
    const job = await Job.findByIdAndUpdate(req.body._id, {donePayment: req.body.donePayment}, {new: true})
    
    for(let i = 0; i < job.currentlyWorking.length; i++){
        const user = await User.findOneAndUpdate(
            {gmail: job.currentlyWorking[i]}, 
            {$inc:{balance:job.moneyAmount[i]}}, 
            {new: true})
        console.log(user)
    }
}

const mongoose = require('mongoose')


const jobSchema = mongoose.Schema({

    title: {
        type: String
    },
    description: {
        type: String
    },
    budget: {
        type: Number
    },
    sampleNumber: {
        type: Number
    },
    type: {
        type: String
    },
    experience: {
        type: String
    },
    gmail: {
        type: String
    },
    name : {
        type : String
    },  
    created : {
        type : String
    },
    date: {
        type: Date,
        default: new Date()
    },
    currentlyWorking : [{
        type: String
    }],
    isCompleted: {
        type: Boolean
    },
    workSamples: [{
        type: Object
    }],
    moneyAmount: {
        type: Array
    },
    donePayment: {
        type: Boolean
    }
})

const Job = mongoose.model('Job', jobSchema)

module.exports = Job;

const mongoose = require('mongoose')

const reportSchema = new mongoose.Schema({

    reportedByGmail : {
        type: String
    },
    reportedByName : {
        type: String
    },
    reportedAgainstName : {
        type: String
    },
    reason : {
        type: String
    },
    reportedAgainstGmail : {
        type: String
    }
})

const Report = mongoose.model('report', reportSchema)
module.exports = Report;
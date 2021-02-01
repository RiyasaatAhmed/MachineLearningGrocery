const express = require('express');
const { createJob, getJobs, addSample, getDataset, makePayment } = require('./../controllers/jobController')

const router = express.Router();
router.route('/').post(createJob).get(getJobs).put(addSample)
router.route('/payment').put(makePayment)
router.route('/view').post(getDataset)

module.exports = router


const express = require('express')
const { sendImgFile } = require('./../controllers/uploadController')


const router = express.Router()
router.route('/:imgname').get(sendImgFile)

module.exports = router

// loading express 
const express = require('express');
const multer  = require('multer')
const storege = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storege })
const {getProfile, profilePhoto, coverPhoto, profileUpdate} = require('./../controllers/profileController')


const router = express.Router()
router.route('/').get(getProfile)
router.route('/update').put(profileUpdate)
router.route('/profile-photo').put(upload.single('photo'), profilePhoto)
router.route('/cover-photo').put(upload.single('photo'), coverPhoto)


module.exports = router

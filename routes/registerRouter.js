
const express = require('express')
const {getRegistrationPage, createUser, updateUserInfo, deleteUser} = require('./../controllers/registerController')

const router = express.Router()
router.route('/').get(getRegistrationPage).post(createUser).delete(deleteUser)

module.exports = router

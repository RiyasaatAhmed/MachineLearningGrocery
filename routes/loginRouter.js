const express = require('express')
const {login_get, login_post} = require('./../controllers/loginController')


const router = express.Router()
router.route('/').get(login_get).post(login_post)

module.exports = router
// loading express 
const express = require('express');
const {getAllThePosts, createPost, updateLike, logout} = require('./../controllers/postController')

// Posts
const router = express.Router()
router.route('/').get(getAllThePosts).post(createPost)
router.route('/likes').put(updateLike)
router.route('/logout').get(logout)

module.exports = router

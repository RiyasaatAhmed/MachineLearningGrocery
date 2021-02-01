const express = require('express')
const path = require('path')

const router = express.Router()

router.route('/:id').get(async(req, res) => {
    const dataset = path.join(__dirname, `../datasets/${req.params.id}`)
    res.sendFile(dataset)

})

module.exports = router
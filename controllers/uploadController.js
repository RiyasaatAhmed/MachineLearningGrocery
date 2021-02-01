const path = require('path')

exports.sendImgFile = (req, res) => {
    const img = path.join(__dirname, `../uploads/${req.params.imgname}`)
    res.sendFile(img)
}
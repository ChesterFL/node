const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/auth')
const {getInfo} = require("../controllers/revenue")

router.use(protect)

router.get('/info', getInfo)


module.exports = router

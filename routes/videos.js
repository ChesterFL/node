const express = require('express')
const {

} = require('../controllers/videos')

const Video = require('../models/Video')

const router = express.Router()

const advancedResults = require('../middleware/advancedResults')
const {protect} = require('../middleware/auth')


module.exports = router

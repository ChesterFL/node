const express = require('express')
const {
    getVideo, createVideo, updateVideo, deleteVideo, getVideos, getCategory
} = require('../controllers/videos')

const Video = require('../models/Video')

const router = express.Router()

const advancedResults = require('../middleware/advancedResults')
const {protect, signatureVer} = require('../middleware/auth')




router.route('/')
    .get(getVideos)
    .post(createVideo)

router.route('/category')
    .get(getCategory)

router.route('/:id')
    .get(getVideo)
    .put(updateVideo)
    .delete(deleteVideo)


module.exports = router

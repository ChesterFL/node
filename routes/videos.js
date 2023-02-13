const express = require('express')
const {
    getVideo, createVideo, updateVideo, deleteVideo, getVideos, getCategory, uploadVideoThumbnail, updateViews
} = require('../controllers/videos')
const {protect} = require("../middleware/auth");

const Video = require('../models/Video')
const advancedResults = require('../middleware/advancedResults')

const router = express.Router()

router.use(protect)

router.route('/')
    .post(createVideo)


router.route('/public')
    .post(advancedResults(Video, [
                {path: 'channelId'},
                {path: 'likes'},
                {path: 'dislikes'},
            ],
            {
                status: 'public'
            }),
        getVideos)
router.route('/private')
    .post(advancedResults(
            Video,
            [
                {path: 'channelId'},
                {path: 'likes'},
                {path: 'dislikes'},
            ],
            {
                status: 'private'
            }
        ),
        getVideos)

router.route('/featured')
    .post(advancedResults(
            Video,
            [
                {path: 'channelId'},
                {path: 'likes'},
                {path: 'dislikes'},
            ],
            {
                status: 'featured'
            }
        ),
        getVideos)


router.route('/category')
    .get(getCategory)

router.route('/:id')
    .get(getVideo)
    .post(updateVideo)
    .delete(deleteVideo)

router.route('/:id/thumbnails')
    .put(uploadVideoThumbnail)

router.route('/:id/views').put(updateViews)

module.exports = router

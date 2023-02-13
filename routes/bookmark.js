const express = require('express')
const {
    getChannels,
    getBookmarks,
    getBookmarkVideos,
    checkBookmark,
    deleteBookmark
} = require('../controllers/bookmark')

const Bookmark = require('../models/Bookmark')

const router = express.Router()

const advancedResults = require('../middleware/advancedResults')
const {protect} = require('../middleware/auth')

router.use(protect)

router.route('/')
    .post(checkBookmark)
    .delete(deleteBookmark)

router.post('/check', checkBookmark)

router.route('/bookmarks').get(
    advancedResults(Bookmark, [{path: 'bookmarkId'}], {
        status: 'private',
        filter: 'channel'
    }),
    getBookmarks
)

router
    .route('/channels')
    .get(
        advancedResults(Bookmark, [
            {path: 'channelId', select: 'avatar name'}
        ]),
        getChannels
    )

router.route('/videos').get(getBookmarkVideos)

module.exports = router

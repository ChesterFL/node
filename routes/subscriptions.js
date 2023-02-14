const express = require('express')
const {
    getChannels,
    getSubscribers,
    createSubscriber,
    checkSubscription,
    getSubscribedVideos
} = require('../controllers/subscriptions')

const Subscription = require('../models/Subscription')

const router = express.Router()

const advancedResults = require('../middleware/advancedResults')
const {protect} = require('../middleware/auth')

router.use(protect)

router.post('/', createSubscriber)

router.post('/check', checkSubscription)

// router.route('/subscribers').get(
//     advancedResults(Subscription, [{path: 'subscriberId'}]),
//     getSubscribers
// )

router
    .route('/channels')
    .get(
        advancedResults(Subscription, [
            {path: 'channelId', select: 'avatar name'}
        ]),
        getChannels
    )

router.route('/videos').get(getSubscribedVideos)

module.exports = router

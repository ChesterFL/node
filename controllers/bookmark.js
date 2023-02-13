const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse')
const advancedResultsFunc = require('../utils/advancedResultsFunc')

const Video = require('../models/Video')
const Bookmark = require('../models/Bookmark')

// @desc    Get all subscribers
// @route   GET /api/v1/subscriptions/subscribers
// @access  Private
exports.getBookmarks = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults)
})

// @desc    Get all channels subscribed to
// @route   GET /api/v1/subscriptions/channels
// @access  Private
exports.getChannels = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults)
})

// @desc    Check subscription
// @route   POST /api/v1/subscriptions/check
// @access  Private
exports.checkBookmark = asyncHandler(async (req, res, next) => {
    const channel = await Bookmark.findOne({
        channelId: req.body.channelId,
        bookmarkId: req.user._id
    })

    if (!channel) {
        return res.status(200).json({success: true, data: {}})
    }

    return res.status(200).json({success: true, data: channel})
})

// @desc    Create subscriber
// @route   Post /api/v1/subscriptions
// @access  Private
exports.createBookmark = asyncHandler(async (req, res, next) => {
    const {channelId} = req.body

    if (channelId.toString() === req.user._id.toString()) {
        return next(new ErrorResponse(`You can't subscribe to your own channel`))
    }
    let bookmark = await Bookmark.findOne({
        channelId: channelId,
        subscriberId: req.user._id
    })

    if (!bookmark) {
        bookmark = await Bookmark.create({
            channelId: channelId,
            subscriberId: req.user._id
        })
    }
    res.status(200).json({success: true, data: bookmark})
})

exports.deleteBookmark = asyncHandler(async (req, res, next) => {
    const {channelId} = req.body;
    let bookmark = await Bookmark.deleteOne({
        channelId: channelId,
        subscriberId: req.user._id
    })
    res.status(200).json({success: true, data: bookmark})
})

// @desc    Get subscribed videos
// @route   GET /api/v1/subscriptions/videos
// @access  Private
exports.getBookmarkVideos = asyncHandler(async (req, res, next) => {
    const channels = await Bookmark.find({
        bookmarkId: req.user._id
    })

    if (channels.length === 0)
        return res.status(200).json({success: true, data: {}})


    const channelsId = channels.map((channel) => {
        return {
            channelId: channel.channelId.toString()
        }
    })

    const populates = [{path: 'channelId', select: 'avatar name'}]
    advancedResultsFunc(req, res, Video, populates, 'public', channelsId)
})

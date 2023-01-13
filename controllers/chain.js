const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse')

const Chain = require('../models/Chain')

// @desc    Get Service
// @route   GET /api/v1/Chain
exports.getService = asyncHandler(async (req, res, next) => {
    const data = await Chain.findOne(req.query);
    res.status(200).json({success: true, data})
})

exports.createService = asyncHandler(async (req, res, next) => {
    const data = await Chain.create(req.body);
    res.status(200).json({success: true, data})
})

exports.updateChannelName = asyncHandler(async (req, res, next) => {
    const {address, channelName} = req.body
    const data = await Chain.updateOne({address}, {channelName}, {new: true});
    res.status(200).json({success: true, data})
})

const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse')


const Img = require('../models/Img')

// @desc    Get Service
// @route   GET /api/v1/Chain
exports.getImg = asyncHandler(async (req, res, next) => {
    const data = await Img.findById(req.params.id);
    if (!data) return next(new ErrorResponse(`No Img with id of ${req.params.id}`, 404))
    const dataBuffer = new Buffer(data.base64, 'base64')
    res.setHeader("Content-Type", "image/png");
    res.status(200).write(dataBuffer)
})


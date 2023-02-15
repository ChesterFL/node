const crypto = require('crypto')
const path = require('path')
const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse')
const {customAlphabet} = require('nanoid/async')

const User = require('../models/User')

const {eth} = require('../config/contract')


// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public

exports.login = asyncHandler(async (req, res, next) => {
    let {address, timespan, signature} = req.body
    address = address.toLowerCase()
    let message = `${address} login FavorTube at ${timespan}`
    let addr = eth.accounts.recover(message, signature).toLowerCase();
    if (addr !== address) return next(new ErrorResponse('Invalid credentials', 400))
    let user = await User.findOne({address});
    if (!user) {
        user = await User.create({address, loginTime: new Date()});
    }
    sendTokenResponse(user, 200, res)
})

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken()

    const options = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }

    if (process.env.NODE_ENV === 'production') {
        options.secure = true
    }

    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({success: true, token})
}

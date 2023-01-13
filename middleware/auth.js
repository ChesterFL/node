const jwt = require('jsonwebtoken')
const asyncHandler = require('./async')
const ErrorResponse = require('../utils/errorResponse')
const Eth = require("web3-eth");
const Web3Utils = require("web3-utils");
const Chain = require("../models/Chain")

exports.protect = asyncHandler(async (req, res, next) => {
    let token

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1]
    }
    // Set token from cookie
    // else if (req.cookies.token) {
    //   token = req.cookies.token
    // }

    if (!token) {
        return next(new ErrorResponse('Not authorized to access this route', 401))
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = await User.findById(decoded.id).populate('subscribers').populate({path: 'invitations'})
        next()
    } catch (err) {
        return next(new ErrorResponse('Not authorized to access this route', 401))
    }
})

// Grant access to specific roles
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorResponse(
                    `User role ${req.user.role} is not authorized to access this route`,
                    403
                )
            )
        }
        next()
    }
}


exports.signatureVer = asyncHandler(async (req, res, next) => {
    const {signature} = req.body;
    const message = 'update data';
    const eth = new Eth();
    let address
    try {
        address = eth.accounts.recover(message, signature).toLowerCase()
    }catch (e) {
        return next(new ErrorResponse("Invalid signature"));
    }
    const data = await Chain.findOne({address});
    if (!data) return next(new ErrorResponse("Address not yet created channel"));
    req.user.address = address;
    next();
})
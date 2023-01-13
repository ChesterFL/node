const crypto = require('crypto')
const web3Utils = require("web3-utils");
const path = require('path')
const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse')
const {customAlphabet} = require('nanoid/async')
const Channel = require("../models/Channel");
const nanoid = customAlphabet('6789BCDFGHJKLMNPQRTWbcdfghjkmnpqrtwz', 10)


exports.getInfo = asyncHandler(async (req, res, next) => {
    const {address} = req.params;
    const data = await Channel.findOne({address: address.toLowerCase()})
        .populate("topVideoId");
    res.status(200).json({success: true, data})
})

exports.create = asyncHandler(async (req, res, next) => {
    const data = await Channel.create(req.body);
    res.status(200).json({success: true, data})
})

exports.updateInfo = asyncHandler(async (req, res, next) => {
    const {address} = req.params;
    const data = await Channel.findOneAndUpdate({address: address.toLowerCase()}, {
        $set: req.body
    }, {new: true});
    res.status(200).json({success: true, data})
})




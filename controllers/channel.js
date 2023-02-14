const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse')
const Channel = require("../models/Channel");
const Img = require("../models/Img");


exports.getInfo = asyncHandler(async (req, res, next) => {
    const {address} = req.query;
    const data = await Channel.findOne({address: address?.toLowerCase()})
        .populate("topVideoId");
    res.status(200).json({success: true, data})
})

exports.create = asyncHandler(async (req, res, next) => {
    const data = await Channel.create(req.body);
    res.status(200).json({success: true, data})
})

exports.updateInfo = asyncHandler(async (req, res, next) => {
    const {address} = req.user;
    const data = await Channel.findOneAndUpdate({address: address.toLowerCase()}, {
        $set: req.body
    }, {new: true});
    res.status(200).json({success: true, data})
})

exports.uploadAvatarOrBanner = asyncHandler(async (req, res, next) => {
    const {address} = req.user;
    const {isBanner = false} = req.query;
    const channel = await Channel.findOne({address});
    if (!channel) return next(new ErrorResponse(`No channel with id of ${address}`, 404))
    if (!req.files) return next(new ErrorResponse(`Please upload a file`, 404))
    const key = isBanner ? 'banner' : 'avatar';
    const file = req.files.image;
    if (!file.mimetype.startsWith('image')) return next(new ErrorResponse(`Please upload an image file`, 404))
    const base64 = file.data.toString('base64');
    if (channel[key]) {
        await Img.findByIdAndUpdate(channel[key], {
            $set: {base64}
        });
    } else {
        const img = await Img.create({base64});
        channel[key] = img._id;
        channel.save();
    }
    res.status(200).json({success: true, data: channel})
})




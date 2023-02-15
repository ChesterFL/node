const mongoose = require('mongoose')

const Schema = mongoose.Schema

const BookmarkSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: [true, 'Subscriber id is required']
        },
        channelId: {
            type: mongoose.Schema.ObjectId,
            ref: 'Channel',
            required: true
        },
    },
    {toJSON: {virtuals: true}, toObject: {virtuals: true}, timestamps: true}
)
module.exports = mongoose.model('Chain', BookmarkSchema)

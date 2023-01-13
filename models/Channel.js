const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ChannelSchema = new Schema(
    {
        name: {
            type: String,
            unique: true
        },
        address: {
            type: String,
            unique: true,
            lowercase: true,
            required: true,
        },
        avatar: {
            type: String,
        },
        banner: {
            type: String
        },
        introduction: {
            type: String,
        },
        topVideoId: {
            type: mongoose.Schema.ObjectId,
            ref: 'Video'
        }
    },
    {toJSON: {virtuals: true}, toObject: {virtuals: true}, timestamps: true}
)

module.exports = mongoose.model('Channel', ChannelSchema)

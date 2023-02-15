const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ChannelSchema = new Schema(
    {
        name: {
            type: String,
            default: "",
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
            default: "",
        },
        banner: {
            type: String,
            default: "",
        },
        introduction: {
            type: String,
            default: ""
        },
        topVideoId: {
            type: mongoose.Schema.ObjectId,
            ref: 'Video',
            default: null
        }
    },
    {toJSON: {virtuals: true}, toObject: {virtuals: true}, timestamps: true}
)

module.exports = mongoose.model('Channel', ChannelSchema)

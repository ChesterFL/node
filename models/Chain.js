const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ChainSchema = new Schema(
    {
        address: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            required: true,
        },
        channelName: {
            type: String,
            trim: true,
            index: true,
            unique: true,
            sparse: true
        },
        group: {
            type: String,
            required: true
        },
        overlay: {
            type: String,
            required: true
        },
    },
    {toJSON: {virtuals: true}, toObject: {virtuals: true}, timestamps: true}
)

module.exports = mongoose.model('Chain', ChainSchema)

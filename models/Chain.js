const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ChainSchema = new Schema(
    {
        address: {
            type: String,
            default: '',
            lowercase: true,
            unique: true
        },
        channelName: {
            type: String,
            default: '',
            unique: true
        },
        group: {
            type: String,
            default: ''
        },
        overlay: {
            type: String,
            default: ''
        },
    },
    {toJSON: {virtuals: true}, toObject: {virtuals: true}, timestamps: true}
)

module.exports = mongoose.model('Chain', ChainSchema)

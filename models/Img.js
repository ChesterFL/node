const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ImgSchema = new Schema(
    {
        base64: {
            type: String,
            required: true
        }
    },
    {toJSON: {virtuals: true}, toObject: {virtuals: true}, timestamps: true}
)

module.exports = mongoose.model('Img', ImgSchema);

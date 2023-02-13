const mongoose = require('mongoose')
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema

const UserSchema = new Schema(
    {
        address: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            required: true,
        },
        loginTime: Date,
        operateTime: Date
    },
    {toJSON: {virtuals: true}, toObject: {virtuals: true}, timestamps: true}
)


UserSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({address: this.address}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

module.exports = mongoose.model('User', UserSchema)

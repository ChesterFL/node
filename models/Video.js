const mongoose = require('mongoose')

const Schema = mongoose.Schema

const VideoSchema = new Schema(
    {
        channelId: {
            type: mongoose.Schema.ObjectId,
            ref: 'Channel',
            required: true
        },
        title: {
            type: String,
            minlength: [3, 'Must be three characters long']
        },
        description: {
            type: String,
            default: ''
        },
        views: {
            type: Number,
            default: 0
        },
        status: {
            type: String,
            enum: ['draft', 'private', 'public', 'member','secret'],
            default: 'draft'
        },
        tags: {
            type: Array,
            default: []
        },
        thumbnail: {
            type: String,
            default: ""
        },
        hash: {
            type: String,
            required: true
        },
        category: {
            type: String,
            default: "",
        },
        overlay: {
            type: String,
            required: true
        },
    },
    {toJSON: {virtuals: true}, toObject: {virtuals: true}, timestamps: true}
)

VideoSchema.index({title: 'text'})
VideoSchema.index({channelId: 1})
VideoSchema.index({hash: 1})

VideoSchema.virtual('dislikes', {
    ref: 'Feeling',
    localField: '_id',
    foreignField: 'videoId',
    justOne: false,
    count: true,
    match: {type: 'dislike'}
})

VideoSchema.virtual('likes', {
    ref: 'Feeling',
    localField: '_id',
    foreignField: 'videoId',
    justOne: false,
    count: true,
    match: {type: 'like'}
})

VideoSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'videoId',
    justOne: false,
    count: true
})

module.exports = mongoose.model('Video', VideoSchema)

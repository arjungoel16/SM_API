const {Schema, model, Type} = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const tweetSchema = new Schema({
    tweetText: {
        type: String,
        required: 'Tweet text is required',
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp)
    },
    username: {
        type: String,
        required: 'Username is required'
    }
});

const reactSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Type.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp)
    }
});

tweetSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});
const Tweet = model('Tweet', tweetSchema);
module.exports = Tweet;
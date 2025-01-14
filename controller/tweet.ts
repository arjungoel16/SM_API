const {Tweet, User} = require('../models');
const {list} = require('../models/User');

//function for creating, updating, and getting all tweets
// tweetController is an object that contains all the functions
const tweetController = {
    //getting all tweets
    allTweets:(req, res) => {
        Tweet.find().then((data) => res.json(data)).catch((err) => res.status(500).json(err));
    },
    //creating a tweet
    createTweet: (req, res) => {
        Tweet.create(req.body)
        .then((tweetData) => {
            return User.findByIdAndUpdate(req.body.user, {$push: {tweets: tweetData._id}})
        })
        .then((data) => res.json(data))
        .catch((err) => res.status(500).json(err));
    },
    //updating a tweet
    updateTweet(req, res) {
        Tweet.findOneAndUpdate({
            _id: req.params.id}, {
            $set: req.body}, {
            runValidators: true,
            new: true
        }).then((thought) => {!thought ? res.status(404).json({message: 'No thought by ID'}) : res.json(thought);
         }).catch((err) => res.status(500).json(err));
    },

    // have to find tweets by ids
    getTweetById(req, res) {
        Tweet.findOne({_id: req.params.id}).then((data) => {
            !data ? res.status(404).json({message: 'No thought by ID'}) : res.json(data);
        }).catch((err) =>
            res.status(500).json(err));
    },
    //deleting a tweet
    deleteTweet(req, res) {
        Tweet.findOneAndDelete({_id: req.params.id}).then((data) => {
            !data ? res.status(404).json({message: 'No thought by ID'}) : res.json(data);
        }).catch((err) => res.status(500).json(err));
        // pulling the tweet from the user and deleting the tweet and user
        return User.findByIdAndUpdate(req.body.user, {$pull: {tweets: req.params.id}})
        .then(() =>res.json({message:'Tweet and User are deleted'})).catch((err) => res.status(500).json(err));
    },
    // this const will allow us to add a reaction to a tweet
    addReaction (req, res) {
        console.log('Adding a reaction');
        console.log(req.body);

        Tweet.findByIdAndUpdate(req.params.id, {$push: {reactions: req.body}}, {new: true})
        .then((data) => {
            !data ? res.status(404).json({message: 'No thought by ID'}) : res.json(data);
        }).catch((err) => res.status(500).json(err));
    },

    // this const will allow us to delete a reaction from a tweet
    deleteReaction(req, res) {
        console.log('Deleting a reaction');
        console.log(req.body);

        Tweet.findByIdAndUpdate(req.params.id, {$pull: {reactions: req.body}}, {new: true})
        .then((data) => {
            !data ? res.status(404).json({message: 'No thought by ID'}) : res.json(data);
        }).catch((err) => res.status(500).json(err));
    },
};

module.exports = tweetController;

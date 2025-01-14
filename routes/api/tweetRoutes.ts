const router = require("express").Router();

const {
    getAllTweets,
    getTweetById,
    createTweet,
    updateTweet,
    deleteTweet,
    addReaction,
    removeReaction
} = require('../../controllers/tweetController');

router.route('/').get(getAllTweets).post(createTweet);

router.route('/:id').get(getTweetById).put(updateTweet).delete(deleteTweet);
router.route('/:tweetId/reactions').post(addReaction).delete(removeReaction);

module.exports = router;

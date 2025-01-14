const router = require('express').Router();
const userRoutes = require('./userRoutes');
const tweetRoutes = require('./tweetRoutes');

router.use('/users', userRoutes);
router.use('/tweets', tweetRoutes);

module.exports = router;
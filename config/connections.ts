//mongoose connection

const mongoose = require('mongoose');

mongoose.connect('mongodb:/  /localhost:27017/Usertweet', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

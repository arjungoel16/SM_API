const req = require('express/lib/request');
const {Post, User} = require('../models');

const userController = {
    getAllUsers: (req, res) => {
        User.find().then((data) => res.json(data)).catch((err) => res.status(500).json(err));
    },
    createUser: (req, res) => {
        User.create(req.body).then((userData) => res.json(userData)).catch((err) => res.status(500).json(err));
    },
    updateUser: (req, res) => {
        User.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: req.body
        }, {
            runValidators: true,
            new: true
        }).then((data) => {
            !data ? res.status(404).json({
                message: 'No user by ID'
            }) : res.json(data);
        }).catch((err) => res.status(500).json(err));
    },
    getUserById: (req, res) => {
        User.findOne({
            _id: req.params.id
        }).then((data) => {
            !data ? res.status(404).json({
                message: 'No user by ID'
            }) : res.json(data);
        }).catch((err) => res.status(500).json(err));
    },
    deleteUser: (req, res) => {
        User.findOneAndDelete({
            _id: req.params.id
        }).then((data) => {
            !data ? res.status(404).json({
                message: 'No user by ID'
            }) : res.json(data);
        }).catch((err) => res.status(500).json(err));
    },
    getAllPosts: (req, res) => {
        Post.find().then((data) => res.json(data)).catch((err) => res.status(500).json(err));
    },
    // removing a friend from the user
    removeFriend: (req, res) => {
        User.findByIdAndUpdate(req.body.user, { $pull: { friends: req.params.id } }, { new: true })
        .then((data) => {
            !data ? res.status(404).json({ message: 'No user by ID' }) : res.json(data);
        }).catch((err) => res.status(500).json(err));
    },
    // adding a friend to the user
    addFriend: (req, res) => {
        User.findByIdAndUpdate(req.body.user, { $push: { friends: req.params.id } }, { new: true })
        .then((data) => {
            !data ? res.status(404).json({ message: 'No user by ID' }) : res.json(data);
        }).catch((err) => res.status(500).json(err));
    },
};
module.exports = userController;


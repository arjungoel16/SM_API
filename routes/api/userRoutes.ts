const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/userController');

router.route('/').get(getAllUsers).post(createUser).delete(deleteUser);
router.route('/:id').post(addFriend).post(removeFriend);

module.exports = router;
// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/:userId/add-friend/:friendId', userController.addFriend);

module.exports = router;

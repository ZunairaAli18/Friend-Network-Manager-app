const express = require('express');
const router = express.Router();
const userController = require('../controllers/controller');
const authenticateToken = require('../middleware/firebaseAuth');

router.post('/:userId/add-friend-by-email', authenticateToken, userController.addFriendByEmail);

module.exports = router;

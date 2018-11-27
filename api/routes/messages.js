const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const messageController = require('../Controller/MessageController');

router.post('/',messageController.CreateNewMessage);
router.get('/ShowMessages', messageController.fetchallMessages);

module.exports = router;
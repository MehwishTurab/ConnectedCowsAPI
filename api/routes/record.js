const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const RecordController = require('../Controller/RecordController');


router.post('/',RecordController.CreatenewRecord);

module.exports = router;
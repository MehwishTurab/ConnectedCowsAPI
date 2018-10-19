const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const cattleController = require('../Controller/CattleController');

router.post('/',cattleController.CreatenewCattle);


module.exports = router;
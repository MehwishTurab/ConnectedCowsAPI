const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const cattleController = require('../Controller/CattleController');

router.post('/',cattleController.CreatenewCattle);
router.get('/ShowCattles', cattleController.fetchallCattles);
router.get('/SearchCattle/:id',cattleController.fetchoneCattle);

module.exports = router;
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const cattleController = require('../Controller/CattleController');

router.post('/',cattleController.CreatenewCattle);
router.get('/ShowCattles', cattleController.fetchallCattles);
router.get('/SearchCattle/:id',cattleController.fetchoneCattle);
router.get('/Searchbyfarm/:id',cattleController.fetchbyfarm);
router.delete('/DeleteCattle/:id', cattleController.DeleteCattle);
router.patch('/UpdateCattle/:id',cattleController.UpdateCattle);
router.get('/SearchbyOwner/:id',cattleController.fetchbyOwner);

module.exports = router;
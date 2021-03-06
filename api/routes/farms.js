const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const farmController = require('../Controller/farmController');

router.post('/',farmController.CreatenewFarm);
router.get('/ShowFarms', farmController.fetchallFarms);
router.get('/SearchFarm/:id',farmController.fetchonefarm);
router.delete('/DeleteFarm/:id', farmController.DeleteFarm);
router.patch('/UpdateFarm/:id', farmController.UpdateFarm);

module.exports = router;
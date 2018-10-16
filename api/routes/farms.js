const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const farmController = require('../Controller/farmController');

router.post('/',farmController.CreatenewFarm);
router.get('/searchfarm/:id',farmController.fetchonefarm);
router.get('/showfarms', farmController.fetchallFarms);
router.post('/DeleteFarm', farmController.DeleteFarm);
router.post('/UpdateFarm', farmController.UpdateFarm);

module.exports = router;
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Analysis = require('../Controller/analysis');

router.get('/ShowRecords', Analysis.fetchallRecords);
router.get('/SearchRecord/:id',Analysis.fetchoneRecord);


module.exports = router;
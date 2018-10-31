const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const RecordController = require('../Controller/RecordController');


router.post('/',RecordController.CreatenewRecord);
router.get("/ShowRecords",RecordController.fetchallRecords);
router.get("/SearchRecord/:id",RecordController.fetchoneRecord);
router.patch("/UpdateRecord/:id",RecordController.UpdateRecord);
router.delete("/DeleteRecord/:id",RecordController.DeleteRecord);
router.get("/SearchByCattle/:id",RecordController.fetchbyCattle);


module.exports = router;
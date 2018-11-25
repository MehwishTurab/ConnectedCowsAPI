const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const ownerController = require('../Controller/OwnerController');



router.get('/login/:name/:password', ownerController.login);


module.exports = router;
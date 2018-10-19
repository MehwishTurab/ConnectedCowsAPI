const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const ownerController = require('../Controller/OwnerController');


router.post('/',ownerController.CreatenewOwner);
router.get('/ShowOwners', ownerController.fetchallOwners);
router.get('/SearchOwner/:id',ownerController.fetchoneOwner);
router.delete('/DeleteOwner/:id', ownerController.DeleteOwner);
router.patch('/UpdateOwner/:id', ownerController.UpdateOwner);


module.exports = router;
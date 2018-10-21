const express = require('express');
const mongoose = require('mongoose');
const Cattle = require('../model/cattleSch');
const Owner = require('../model/ownerSch');
const Farm = require('../model/farmSch');

exports.CreatenewCattle = function (req, res) {
    Owner.findOne(
        {
           _id: req.body.owner_id
        },
        
        (err, owner) => {
            if (err) return res.status(200).send(err)
            if (owner == null)
                return res.status(200).json(message = 'No Owner With this ID exist')
            else
                {
                    var cattle = new Cattle({
                        ownerid: req.body.owner_id,
                        farmid: owner.farmid
                    });
                    cattle.save(function (err) {
                        if (err)
                            return res.json(err);
                        else
                            res.send({
                                message: "Cattle created Successfully",
                            });
                        console.log("Data entered");
                    });
                }
        }
    );
}

exports.fetchallCattles = function (req, res) {
    Cattle.find()
    .select('_id farmid ownerid')
    .exec()
    .then(doc => {
        const response = {
            count: doc.length,
            info: doc.map(docs => {
                return {
                    _id: docs._id,
                    farmid: docs.farmid,
                    ownerid: docs.ownerid
                }
            })
        }
            res.status(200).json(response);  
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
};

exports.fetchoneCattle =  function (req,res){
    Cattle.findOne(
        {
           _id: req.params.id
        },
        {
            farmid: true,
            ownerid: true
        },
        // callback function
        (err, cattle) => {
            if (err) return res.status(200).send(err)
            if (cattle == null)
                return res.status(200).json(message = 'No cattle With this ID')
            else
                return res.status(200).json(cattle)
        }
    );
};

exports.UpdateCattle = function (req, res) {
    const id = req.params.id;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Cattle.update({ _id: id}, { $set: updateOps})
        .then(cattle => {
            if (!cattle) {
                return res.status(404).send({
                    message: "Cattle not found with ID " + req.params.id
                });
            }
            res.send({
                message: "Cattle Updated successfully!"
            });
        }).catch(err => {
            if (err.kind === '_id' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Cattle not found with ID " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not update Cattle with ID " + req.params.id
            });
        });
}
   
//Function to Delete an Employee
exports.DeleteCattle = function (req, res) {
    Cattle.findOneAndRemove({
            _id: req.params.id
        })
        .then(cattle => {
            if (!cattle) {
                return res.status(404).send({
                    message: "Cattle not found with ID " + req.body._id
                });
            }
            res.send({
                message: "Cattle deleted successfully!"
            });
        }).catch(err => {
            if (err.kind === 'cattle_id' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Cattle not found with ID " + req.body._id
                });
            }
            return res.status(500).send({
                message: "Could not delete Cattle with ID " +  req.body._id
            });
        });
}

exports.fetchbyfarm = function (req, res) {
    Cattle.find(
        {
            farmid: req.params.id
         },
         {
             cattle_id: true,
             ownerid: true
         }
    )
    .select('_id farmid ownerid')
    .exec()
    .then(doc => {
        const response = {
            count: doc.length,
            info: doc.map(docs => {
                return {
                    _id: docs._id,
                    farmid: docs.farmid,
                    ownerid: docs.ownerid
                }
            })
        }
            res.status(200).json(response);  
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
};

exports.fetchbyOwner = function (req, res) {
    Cattle.find(
        {
            ownerid: req.params.id
         },
         {
             cattle_id: true,
             farmid: true
         }
    )
    .select('_id farmid ownerid')
    .exec()
    .then(doc => {
        const response = {
            count: doc.length,
            info: doc.map(docs => {
                return {
                    _id: docs._id,
                    farmid: docs.farmid,
                    ownerid: docs.ownerid
                }
            })
        }
            res.status(200).json(response);  
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
};





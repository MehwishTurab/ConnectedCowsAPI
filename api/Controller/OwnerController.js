const express = require('express');
const mongoose = require('mongoose');
const Owner = require('../model/ownerSch');
const Farm = require('../model/farmSch');

exports.CreatenewOwner = function (req, res) {
    Farm.findOne(
        {
           _id: req.body.farm_id
        },
        
        (err, farm) => {
            if (err) return res.status(200).send(err)
            if (farm == null)
                return res.status(200).json(message = 'No farm With this ID exist')
            else
                {
                    var owner = new Owner({
                        farmid: req.body.farm_id,
                        o_name : req.body.o_name,
                        o_address : req.body.o_address,
                    });
                    owner.save(function (err) {
                        if (err)
                            return res.json(err);
                        else
                            res.send({
                                message: "Owner created Successfully",
                            });
                        console.log("Data entered");
                    });
                }
        }
    );
}

exports.fetchallOwners = function (req, res) {
    Owner.find()
    .select('_id farmid o_name o_address')
    .exec()
    .then(doc => {
        const response = {
            count: doc.length,
            info: doc.map(docs => {
                return {
                    _id: docs._id,
                    farmid: docs._id,
                    o_name: docs.o_name,
                    o_address: docs.o_address
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

exports.fetchoneOwner =  function (req,res){
    Owner.findOne(
        {
           _id: req.params.id
        },
        {
            farmid: true,
            o_name: true,
            o_address: true
        },
        // callback function
        (err, owner) => {
            if (err) return res.status(200).send(err)
            if (owner == null)
                return res.status(200).json(message = 'No owner With this ID')
            else
                return res.status(200).json(owner)
        }
    );
};

exports.UpdateOwner = function (req, res) {
    const id = req.params.id;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Owner.update({ _id: id}, { $set: updateOps})
        .then(owner => {
            if (!owner) {
                return res.status(404).send({
                    message: "Owner not found with ID " + req.params.id
                });
            }
            res.send({
                message: "Owner Updated successfully!"
            });
        }).catch(err => {
            if (err.kind === '_id' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Owner not found with ID " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not update Owner with ID " + req.params.id
            });
        });
}
   
//Function to Delete an Employee
exports.DeleteOwner = function (req, res) {
    Owner.findOneAndRemove({
            _id: req.params.id
        })
        .then(owner => {
            if (!owner) {
                return res.status(404).send({
                    message: "Owner not found with ID " + req.body.owner_id
                });
            }
            res.send({
                message: "Owner deleted successfully!"
            });
        }).catch(err => {
            if (err.kind === 'owner_id' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Owner not found with ID " + req.body.owner_id
                });
            }
            return res.status(500).send({
                message: "Could not delete Owner with ID " +  req.body.owner_id
            });
        });
}

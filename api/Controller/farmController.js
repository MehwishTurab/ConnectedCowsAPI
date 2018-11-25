const express = require('express');
const mongoose = require('mongoose');
const Farm = require('../model/farmSch');

//Function to create farm
exports.CreatenewFarm = function (req, res) {
    var farm = new Farm({
        f_name : req.body.f_name,
        f_address : req.body.f_address
    });
    farm.save(function (err) {
        if (err)
            return res.json(err);
        else
            res.send({
                message: "Farm created Successfully",
                
            });
        console.log("Data entered");
    });
}

//Function to Fetch all Farms
exports.fetchallFarms = function (req, res) {
    Farm.find()
    .select('_id f_name f_address')
    .exec()
    .then(doc => {
        const response = {
            count: doc.length,
            info: doc.map(docs => {
                return {
                    _id: docs._id,
                    f_name: docs.f_name,
                    f_address: docs.f_address
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

//Function To Fetch a farm
exports.fetchonefarm =  function (req,res){
    Farm.findOne(
        {
           _id: req.params.id
        },
        {
            f_name: true,
            f_address: true
        },
        // callback function
        (err, farm) => {
            if (err) return res.status(200).send(err)
            if (farm == null)
                return res.status(200).json(message = 'No farm With this id')
            else
                return res.status(200).json(farm)
        }
    );
};

exports.UpdateFarm = function (req, res) {
    const id = req.params.id;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Farm.update({ _id: id}, { $set: updateOps})
        .then(farm => {
            if (!farm) {
                return res.status(404).send({
                    message: "Farm not found with ID " + req.params.id
                });
            }
            res.send({
                message: "Farm Updated successfully!"
            });
        }).catch(err => {
            if (err.kind === '_id' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Farm not found with ID " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not update farm with ID " + req.params.id
            });
        });
}
   

exports.DeleteFarm = function (req, res) {
    Farm.findOneAndRemove({
            _id: req.params.id
        })
        .then(farm => {
            if (!farm) {
                return res.status(404).send({
                    message: "Farm not found with ID " + req.body.farm_id
                });
            }
            res.send({
                message: "Farm deleted successfully!"
            });
        }).catch(err => {
            if (err.kind === 'farm_id' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Farm not found with ID " + req.body.farm_id
                });
            }
            return res.status(500).send({
                message: "Could not delete farm with ID " + req.params.farm
            });
        });
}






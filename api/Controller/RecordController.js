const express = require('express');
const mongoose = require('mongoose');
const Record = require('../model/RecordSch');
const Cattle = require('../model/cattleSch');


exports.CreatenewRecord = function (req, res) {
    Cattle.findOne(
        {
           _id: req.body.cattleid
        },
        
        (err, cattle) => {
            if (err) return res.status(200).send(err)
            if (cattle == null)
                return res.status(200).json(message = 'No Cattle With this ID exist')
            else
                {
                    var record = new Record({
                        cattleid: req.body.cattleid,
                        temp : req.body.temp
                    });
                    record.save(function (err) {
                        if (err)
                            return res.json(err);
                        else
                            res.send({
                                message: "Record created Successfully",
                            });
                        console.log("Data entered");
                    });
                }
        }
    );
}

exports.fetchallRecords = function (req, res) {
    Record.find()
    .select('_id cattleid createdOn temp')
    .exec()
    .then(doc => {
        const response = {
            count: doc.length,
            info: doc.map(docs => {
                return {
                    _id: docs._id,
                    cattleid: docs.cattleid,
                    createdOn: docs.createdOn,
                    temp: docs.temp
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

exports.fetchoneRecord =  function (req,res){
    Record.findOne(
        {
           _id: req.params.id
        },
        {
            cattleid: true,
            createdOn: true,
            temp: true
        },
        // callback function
        (err, record) => {
            if (err) return res.status(200).send(err)
            if (record == null)
                return res.status(200).json(message = 'No Record With this ID')
            else
                return res.status(200).json(record)
        }
    );
};

exports.UpdateRecord = function (req, res) {
    const id = req.params.id;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Record.update({ _id: id}, { $set: updateOps})
        .then(record => {
            if (!record) {
                return res.status(404).send({
                    message: "Record not found with ID " + req.params.id
                });
            }
            res.send({
                message: "Record Updated successfully!"
            });
        }).catch(err => {
            if (err.kind === '_id' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Record not found with ID " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not update Record with ID " + req.params.id
            });
        });
}
   
//Function to Delete an Employee
exports.DeleteRecord = function (req, res) {
    Record.findOneAndRemove({
            _id: req.params.id
        })
        .then(record => {
            if (!record) {
                return res.status(404).send({
                    message: "Record not found with ID " + req.body._id
                });
            }
            res.send({
                message: "Record deleted successfully!"
            });
        }).catch(err => {
            if (err.kind === 'record_id' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Record not found with ID " + req.body._id
                });
            }
            return res.status(500).send({
                message: "Could not delete Record with ID " +  req.body._id
            });
        });
}

exports.fetchbyCattle = function (req, res) {
    Record.find(
        {
            cattleid: req.params.id
         },
         {
             record_id: true,
             createdOn: true,
             temp: true
         }
    )
    .select('_id cattleid createdOn temp')
    .exec()
    .then(doc => {
        const response = {
            count: doc.length,
            info: doc.map(docs => {
                return {
                    _id: docs._id,
                    cattleid: docs.cattleid,
                    createdOn: docs.createdOn,
                    temp: docs.temp
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

exports.fetchbyDate = function (req, res) {
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

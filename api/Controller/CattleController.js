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


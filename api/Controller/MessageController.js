const express = require('express');
const mongoose = require('mongoose');
const Message = require('../model/messageSch');

//Function to create farm
exports.CreateNewMessage = function (req, res) {
    var message = new Message({
        message : req.body.message,
    });
    message.save(function (err) {
        if (err)
            return res.json(err);
        else
            res.send({
                message: "MSG created Successfully",
                
            });
        console.log("Data entered");
    });
}

//Function to Fetch all Farms
exports.fetchallMessages = function (req, res) {
    Message.find()
    .select('message')
    .exec()
    .then(doc => {
        const response = {
            count: doc.length,
            info: doc.map(docs => {
                return {
                    message:docs.message
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


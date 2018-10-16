const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Record = require('../model/recordSch');

router.get("/",(req,res,next) => {
    Record.find()
    .select('_id temp')
    .exec()
    .then(doc => {
        const response = {
            count: doc.length,
            info: doc.map(docs => {
                return {
                    _id: docs._id,
                    temp: docs.temp,
                }
            })
        }
            res.status(200).json(response);  
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

router.post("/",(req,res,next) => {
    const info = new Record({
        _id: new mongoose.Types.ObjectId(),
        temp: req.body.temp
    });
    info.save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Created record Successfully',
            _id: result._id,
            temp: result.temp
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

router.get('/:cattleid',(req,res,next) => {
    const id = req.params.cattleid;
    Record.findById(id)
    .select('_id temp')
    .exec()
    .then(doc => {
        console.log("From Database",doc);
        res.status(200).json(doc);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

router.patch('/:cattleid',(req,res,next) => {
    const id = req.params.cattleid;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Record.update( { _id: id}, { $set: updateOps} )
    .exec()
    .then(res => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});
router.delete('/:cattleid',(req,res,next) => {
    const id = req.params.cattleid;
    Record.remove({ _id: id })
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});

module.exports = router;
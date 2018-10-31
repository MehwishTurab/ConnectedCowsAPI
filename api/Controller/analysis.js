const express = require('express');
const mongoose = require('mongoose');
const Record = require('../model/RecordSch');
const Cattle = require('../model/cattleSch');


exports.AnalyseData = function() {
    Cattle.find()
    .select('_id farmid ownerid')
    .exec()
    .then(doc => {
        const response = doc.map(
            docs => docs._id
        )
            for(var i=0;i<response.length;i++){
                console.log("cattle: "+response[i]);
                Record.find(
                    {
                        cattleid: response[i]
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
                            info: doc.map(docs => {
                            return {
                                cattleid: docs.cattleid,
                                temp: docs.temp
                            }
                        })
                    }
                    const temp = doc.map(
                        docs => docs.temp
                    )
                    console.log(response);
                    console.log(temp);
                        
                }
                
            ) 
            }
           
    })
    .catch(err => {
        console.log(err);
    });
  }

  
  
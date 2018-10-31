const express = require('express');
const mongoose = require('mongoose');
const Record = require('../model/recordSch');
const Cattle = require('../model/cattleSch');

const Health = require('../model/healthSch');


exports.AnalyseData = function() {
    Cattle.find()
    .select('_id farmid ownerid')
    .exec()
    .then(doc => {
        const response = doc.map(
            docs => docs._id
        )
           findRecords(response);  
    })
    .catch(err => {
        console.log(err);
    });
  }

  function findRecords(x) {
    for(var i=0;i<x.length;i++){
        console.log("cattle "+(i+1)+": "+x[i]);
        Record.find(
            {
                
                cattleid: x[i]
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
                        cattle: docs.cattleid,
                        temperature: docs.temp
                    }
                })
            }
            const temp = doc.map(
                docs => docs.temp
            )
            const ids = doc.map(
                docs => docs.cattleid
            )
            console.log(response);
            console.log("Average temperature "+average(temp));
            insertdata(ids[0],average(temp));
        } 
    ) 
    }
  }

  function average(x)
  {
      var sum = 0;
      for(var i=0;i<x.length;i++) {
          sum = sum + x[i];
      }
      var avg = sum/x.length;
      return avg;
  }

  function insertdata(id,temp) {
    var health = new Health({
        cattleid : id,
        avg_temp : temp,
        status: "Well"
    });
    health.save(function (err) {
       console.log(err);
        console.log("Data entered");
    });
  }
  
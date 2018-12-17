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
        .select('_id cattleid createdOn temp env_temp env_humidity')
        .exec()
        .then(doc => {
            const response = {
                info: doc.map(docs => {
                    return {
                        cattle: docs.cattleid,
                        temperature: docs.temp,
                        env_temprature : docs.env_temp,
                        env_humidity : docs.env_humidity,
                    }
                })
            }
            const temp = doc.map(
                docs => docs.temp
            )
            const env_temp = doc.map(
                docs => docs.env_temp
            )
            const env_humidity = doc.map(
                docs => docs.env_humidity
            )
            const ids = doc.map(
                docs => docs.cattleid
            )
            console.log(response);
            console.log(`Average temperature ${average(temp)} Avg humidity ${average(env_humidity)} Avg env temp ${average(env_temp)}`);
            insert(ids[0],average(temp),average(env_temp),average(env_humidity));
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

  function insertdata(id,temp,humidity,envTemp) {
    var s;
    if(temp > 37 && temp < 40){
        s = "Normal";
    }
    else if (temp < 38){
        s = "Possibility of milk infection, poisoning or indigestion";
    }
    else if (temp > 39 && temp < 42) {
        s = "Not normal"
    }
    else if (temp > 41 && temp < 45) {
        s = "Possibility of anthrax, influenza or foot or mouth disease";
    }
    else {
        s = "Possibility of death"
    }

    var health = new Health({
        cattleid : id,
        avg_temp : temp,
        avg_env_humidity : humidity,
        avg_env_temp : envTemp,
        status: s
    });
    health.save(function (err) {
        console.log("Data entered");
    });
  }

  function insert(id,temp,envTemp,envHumidity) {
    Health.findOne(
        {
           cattleid: id
        },
        
        (err, health) => {
            if (health != null){
                deletedata(id);
                console.log("deleted !!");
            }
            
        }
    );
    insertdata(id,temp,envHumidity,envTemp);
  }
  
  function deletedata(id) {
    Health.deleteOne({
            cattleid: id
        })
        .then(health => {
            if (!health) {
                console.log("Not found !!");
            }
            
        })
}

exports.fetchallRecords = function (req, res) {
    Health.find()
    .select('_id cattleid avg_temp status')
    .exec()
    .then(doc => {
        const response = {
            count: doc.length,
            info: doc.map(docs => {
                return {
                    cattleid: docs.cattleid,
                    avg_temp: docs.avg_temp,
                    status: docs.status
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
    Health.findOne(
        {
           cattleid: req.params.id
        },
        {
            cattleid: true,
            avg_temp: true,
            status: true
        },
       
        (err, health) => {
            if (err) return res.status(200).send(err)
            if (health == null)
                return res.status(200).json(message = 'No record found')
            else
                return res.status(200).json(health)
        }
    );
};

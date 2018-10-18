const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const RecRoutes = require('./api/routes/record');
const FarmRoutes = require('./api/routes/farms');
const mongoose = require('mongoose');
var mongoURI = 'mongodb://faizi:faizi@cluster0-shard-00-00-aquse.mongodb.net:27017,cluster0-shard-00-01-aquse.mongodb.net:27017,cluster0-shard-00-02-aquse.mongodb.net:27017/IoT?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//setting up mongoDB connection
mongoose.Promise = global.Promise;
mongoose.connect(mongoURI).catch((error) => {
    console.log("Exception \n"+error);
  });
mongoose.connection.on('error',function(){
    console.log("Could not connect to DB, exiting now. ");
    process.exit();
});
mongoose.connection.once('open',function(){
    console.log("Connected to MongoDB");
});
app.use('/record',RecRoutes);
app.use('/farms',FarmRoutes);
app.use((req,res,next) => {
    const error = new Error('Not found');
    error.status = 404;
});

module.exports = app;
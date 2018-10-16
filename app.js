const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const RecRoutes = require('./api/routes/record');
const FarmRoutes = require('./api/routes/farms');
const mongoose = require('mongoose');
var mongoURI = "mongodb://localhost:27017/IoT";
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//setting up mongoDB connection
mongoose.Promise = global.Promise;
mongoose.connect(mongoURI).catch((error) => {
    console.log("Exception \n"+error);
  });
mongoose.connection.on('error',function(){
    console.log("Could not connect to DB, exiting now ...");
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
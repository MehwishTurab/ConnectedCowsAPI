const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const FarmRoutes = require('./api/routes/farms');
const OwnerRoutes = require('./api/routes/owner');
const CattleRoutes = require('./api/routes/cattle');
const RecordRoutes = require('./api/routes/record');
const HealthRoutes = require('./api/routes/health');
const Login = require('./api/routes/login');

const mongoose = require('mongoose');
const path = require('path');

// var mongoURI = 'mongodb://localhost:27017/IoT'; // for prodcution use.mongodb.net:27017,cluster0-shard-00-01-aquse.mongodb.net:27017,cluster0-shard-00-02-aquse.mongodb.net:27017/IoT?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true
var mongoURI = 'mongodb://faizi:faizi@cluster0-shard-00-00-aquse.mongodb.net:27017,cluster0-shard-00-01-aquse.mongodb.net:27017,cluster0-shard-00-02-aquse.mongodb.net:27017/IoT?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';


// setting up Middle ware

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('MobApp'));

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

////ROUTES

//Landing Page Route

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/MobApp/index.html'));
});

//API ROUTES

app.use('/farms',FarmRoutes);
app.use('/owners',OwnerRoutes);
app.use('/cattles',CattleRoutes);
app.use('/records',RecordRoutes);
app.use('/health',HealthRoutes);
app.use('/owner',Login);

app.use((req,res,next) => {
    const error = new Error('Not found');
    error.status = 404;
});

module.exports = app;
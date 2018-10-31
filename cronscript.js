const app = require('./app')

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log("Magic happens");
});

const cron = require("node-cron");

const analysis = require("./api/Controller/analysis.js");

cron.schedule("*/5 * * * * *",analysis.AnalyseData);


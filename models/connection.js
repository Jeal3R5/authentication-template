//Mongoose config
require('dotenv').config();
const { on } = require('events');
const mongoose = require('mongoose');
const { disconnect } = require('process');

// Config for DB Connection
const DATABASE_URL = process.env.DATABASE_URL;
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

//Connect to the DB
mongoose.connect(DATABASE_URL, CONFIG);


//Log status messages for connection events
mongoose.connection
    .on("open", () => { console.log("Connected to Mongoose") })
    .on("close", () => { console.log("Mongoose disconnected") })
    .on("error", () => { console.log(error) });


module.exports = mongoose;
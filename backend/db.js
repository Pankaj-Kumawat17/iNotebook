const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const pass = process.env.PASS;
const mongoURI = "mongodb+srv://rashik16:" + pass + "@cluster0.tv4xvnp.mongodb.net/iNotebook";

// mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false

function connectToMongo(){
    // await mongoose.connect(mongoURI).then(()=>console.log("Connected to mongo successfully")).catch(err=>console.log(err));
    // console.log("Connected successfully");

    mongoose.connect(mongoURI).then(()=>console.log("Connected successfully")).catch(()=>console.log("error"));
};

module.exports = {connectToMongo};
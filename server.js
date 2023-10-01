const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
// const express = require('express');
const app = require('./app');
// const morgan = require('morgan');    //Use morgan for logging purposes

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

//connecting to the database
const mongoose = require('mongoose');

//asynchronous DB connection with parameterized DB connection string
mongoose.connect(`mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@${process.env.ATLAS_DBSERVER}/${process.env.DATABASE}`
,{useNewUrlParser: true})
    .then(() => console.log(`MongoDB connection succeeded with ${process.env.DATABASE}...`))
    .catch((err) => console.log('Error in DB connection: ' + err));

console.log(`The DB connection string is: 
mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@${process.env.ATLAS_DBSERVER}/${process.env.DATABASE}`);
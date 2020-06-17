require('dotenv').config({
  path: '../.env'
});

const mongoose = require('mongoose');

// Declare promise globally to be used when connecting to the database
mongoose.Promise = global.Promise;

// Remote mongodb connection url
// const mongoDbUrl = process.env.MONGODB_URL;
const mongoDbUrl = `mongodb://${process.env.DBUSER}:${process.env.DBPASSWORD}@ds035177.mlab.com:35177/forethought`;

// Mongo connection
mongoose.connect(mongoDbUrl,
  { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }).catch((err) => {
  console.log('MongoDB connection error:', err.message);
  console.log("mongoDbUrl", mongoDbUrl);
});

// Declare variable to be exported for other modules
const dbCon = mongoose.connection;

module.exports = dbCon;

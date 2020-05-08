// Import express web framework for node.js

require('dotenv').config();

const mongoose = require('mongoose');

// Declare promise globally to be used when connecting to the database
mongoose.Promise = global.Promise;

// Remote mongodb connection "either of both can be use"
const mongoDbUrl = process.env.MONGODB_URL;

// Mongo connection code
mongoose.connect(mongoDbUrl,
  { useNewUrlParser: true, useUnifiedTopology: true }).catch((err) => {
  console.log('MongoDB connection error:', err.message);
});

// Declare variable to be exported for other modules
const dbCon = mongoose.connection;

module.exports = dbCon;

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('./services/auth');
require('./services/dbCon');


const testRouter = require('./routes/test');
const usersRoute = require('./routes/users');
const consultantsRoute = require('./routes/consultants');


const apiPort = process.env.PORT || 4001;

const app = express();

app.use(jwt);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Test routes
app.use('/api/test', testRouter);

// User routes
app.use('/api/users', usersRoute);

// Consultant routes
app.use('/api/consultants', consultantsRoute);


app.get('/', (req, res) => res.send('#BuildForSDG'));


// Start listening to the app port to handle request
app.listen(apiPort, () => {
  console.log(`Server running on port ${apiPort}`);
});

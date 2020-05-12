require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('./services/dbCon');
const testRouter = require('./routes/test');

const apiPort = process.env.PORT || 4001;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

// API Routes
app.use('/api/test', testRouter);

app.get('/', (req, res) => res.send('#BuildForSDG'));


// Start listening to the app port to handle request
app.listen(apiPort, () => {
  console.log(`Server running on port ${apiPort}`);
});

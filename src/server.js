require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('./services/dbCon');

const apiPort = process.env.PORT || 4001;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());


app.get('/', (req, res) => res.send('Hello World!'));


// Start listening to the app port to handle request
app.listen(apiPort, () => {
  console.log(`Server running on port ${apiPort}`);
});

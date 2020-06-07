require('dotenv').config();

// Import express app configurations
const app = require('./app');

const apiPort = process.env.PORT || 4001;

// Database connection
require('./services/dbCon');


// Start listening to the app port to handle request
app.listen(apiPort, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${apiPort}`);
});

require('dotenv').config();

const consultantsRoute = require('./routes/consultants');
const appointmentRoute = require('./routes/appointment');


// Import express app configurations
const app = require('./app');

const apiPort = process.env.PORT || 4001;

// Database connection
require('./services/dbCon');


// Consultant routes
app.use('/api/consultants', consultantsRoute);
app.use('/api/appointments', appointmentRoute);

app.get('/', (req, res) => res.send('#BuildForSDG'));

app.use(express.static(path.join(__dirname, 'static')));

app.get('/screening', (req, res) => {
  res.sendFile(path.join(__dirname, "views/interactive", "index.html"));
});


// Start listening to the app port to handle request
app.listen(apiPort, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${apiPort}`);
});

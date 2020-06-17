const express = require('express');
const cors = require('cors');
const path = require('path');
const flash = require('express-flash');
const session = require('express-session');


// const jwt = require('./services/auth');

// Frontend Routes
const authRoute = require('./routes/auth');

// import dashboard route module
const dashboardRoute = require('./routes/dashboard');

// import consultant_connect module
const consultantConnect = require('./routes/consultant_connect');

// import extras module
const extrasRoute = require('./routes/extras');

// API Routes

const testRouter = require('./routes/test');
const usersRoute = require('./routes/users');
const consultantsRoute = require('./routes/consultants');
const appointmentRoute = require('./routes/appointment');

// const userUI = require('./routes/auth');

const app = express();

// app.use(jwt);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use(session({
  secret: process.env.SECRET,
  saveUninitialized: true,
  resave: true,
  cookie: { maxAge: 6000 }
}));

app.use(flash());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Test routes
app.use('/api/test', testRouter);

// User routes
app.use('/api/users', usersRoute);
// app.use('/users', userUI);

// Consultant routes
app.use('/api/consultants', consultantsRoute);
app.use('/api/appointments', appointmentRoute);

app.get('/', (req, res) => res.render('index'));


app.use(authRoute);

// use dashboard route
app.use(dashboardRoute);

// use consultant_connect route
app.use(consultantConnect);

// use extras route
app.use(extrasRoute);

app.use(express.static(path.join(__dirname, 'static')));

// app.get('/screening', (req, res) => {
//   res.sendFile(path.join(__dirname, 'views/interactive', 'index.html'));
// });

module.exports = app;

// export default app;

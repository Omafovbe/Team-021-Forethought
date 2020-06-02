const mongoose = require('mongoose');

// #region Mongoose jest database connection

// Instantiate mongoose test connection created by jest;
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

// Open the connection to jest mongodb
const dbConnect = mongoose.connection;

// #endregion


// #region Various Mock Objects

const mockUser = {
  // _id: 1,
  firstname: 'Joseph',
  lastname: 'Ayetola',
  location: 'Warri',
  email: 'joseph.ayetola@sdg.org',
  password: 'qwerty12345',
  phone: '08022334455',
  birth_date: new Date()
};

const mockTestAnswer = {
  userId: 1,
  ques_1: 2,
  ques_2: 2,
  ques_3: 2,
  ques_4: 2,
  ques_5: 2,
  ques_6: 2
};

// #endregion

module.exports = {
  dbConnect,
  mockTestAnswer,
  mockUser
};

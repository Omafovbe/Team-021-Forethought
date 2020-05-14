const MentalStatus = require('../models/mentalTestSchema');
const Users = require('../models/user');

/** Severity of a mental illness
 *
 *  @description - Returns an object of the grade and class of a mental illness
 *
 *  @param {number} mGrade - A number between 0 - 2
 *  @param {string} mClass - describes the severity of the case as Mild, Moderate or Severe
 */
const severityCase = (mGrade, mClass) => ({ grade: mGrade, class: mClass });


// Calculate, save and return the mental state of a user
const testCalculate = async (reqParam) => {
  // Extract user ID and questions...
  const { userId, ...questAnswers } = reqParam;

  // Search for the user with the ID
  const user = await Users.findById(userId);


  if (user.length) {
    // Extract answers from the questions in the request body
    const answerValues = Object.values(questAnswers);

    // Calculate mental status by summing the answers from the questions
    const sum = answerValues.reduce((acc, val) => acc + Number(val), 0) || 0;

    let message = null;
    let mSeverity = null;

    if (sum >= 0 && sum <= 4) {
      mSeverity = severityCase(0, 'mild');
      message = { score: sum, status: 'No serious mental illness' };
    }
    if (sum >= 5 && sum <= 12) {
      mSeverity = severityCase(1, 'moderate');
      message = { score: sum, status: 'Moderate mental illness' };
    }
    if (sum >= 13 && sum <= 24) {
      mSeverity = severityCase(2, 'severe');
      message = { score: sum, status: 'Serious mental illness. Please consult with a psychologist' };
    }

    // Save to database
    const mentalHealthResult = new MentalStatus({
      userId,
      ques_1: reqParam.ques_1,
      ques_2: reqParam.ques_2,
      ques_3: reqParam.ques_3,
      ques_4: reqParam.ques_4,
      ques_5: reqParam.ques_5,
      ques_6: reqParam.ques_6,
      testResult: sum,
      severity: mSeverity
    });

    await mentalHealthResult.save();

    // Return result to API call
    return message;
  }

  // When we can't find a user throw an error
  throw new Error({ message: `User with ID: ${userId} not found` });
};


// Retrive Mental Health test of users
const getMentalResults = async (userId) => {
  // Get result from database
  const mentalHealthResult = await MentalStatus.find({ userId }, { _id: 0, __v: 0, userId: 0 });

  // When we do not have a mental health result for the user.
  if (!Array.isArray(mentalHealthResult) || !mentalHealthResult.length) return 'No test result found';

  // Otherwise display his/her results
  return mentalHealthResult;
};

module.exports = {
  testCalculate,
  getMentalResults
};

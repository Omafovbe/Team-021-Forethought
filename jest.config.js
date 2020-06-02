module.exports = {
  moduleFileExtensions: ['js', 'json'],
  preset: '@shelf/jest-mongodb',
  rootDir: '__tests__',
  testRegex: ['.spec.js$', '.test.js$'],
  coverageDirectory: './coverage',
  testEnvironment: 'node'
};

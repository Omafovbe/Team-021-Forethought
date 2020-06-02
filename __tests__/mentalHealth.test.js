const User = require('../src/models/user');
const Mentalhealth = require('../src/models/mentalTestSchema');
const utils = require('../src/utils');
const services = require('../src/controller/testCtrl');


describe('test', () => {
  let savedId;
  beforeAll(async () => {
    await utils.dbConnect;

    await User.insertMany(utils.mockUser);
  });

  afterAll(async () => {
    // Clears database
    await User.deleteMany({ });
    await Mentalhealth.deleteMany({ });

    await utils.dbConnect.close();
  });

  it('mentalHealt is defined', () => {
    expect(Mentalhealth).toBeDefined();
  });

  it('gets a user id', async () => {
    const savedUser = await User.findOne({ email: utils.mockUser.email });
    // eslint-disable-next-line no-underscore-dangle
    savedId = savedUser._id;
    expect(savedUser.lastname).toBe(utils.mockUser.lastname);
  });

  it('calculates the test for a saved user', async () => {
    utils.mockTestAnswer.userId = savedId;

    await expect(services.testCalculate(utils.mockTestAnswer)).rejects.toThrow();
  });

  it('gets no test result for a user', async () => {
    const res = await services.getMentalResults(savedId);
    expect(res).toBe('No test result found');
    // await expect(services.getMentalResults(savedId)).resolves.toHaveLength(20);
  });
});

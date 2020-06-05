
const User = require('../src/models/user');
const services = require('../src/controller/userCtrl');
const { mockUser, dbConnect } = require('../src/utils');


describe('user model, register and login functions', () => {
  beforeAll(async () => {
    await dbConnect;
    // clear all data from the jest database. If any...
    await User.deleteMany({ });

    // Register mock user
    await services.create(mockUser);
  });


  afterAll(async () => {
    // clear all data from the jest database
    await User.deleteMany({ });
    // close mongoose connection
    await dbConnect.close();
  });


  it('has a user defined module', () => {
    expect(User).toBeDefined();
  });

  // #region Registering User
  it('get the registered user', async () => {
    const savedUser = await User.findOne({ email: mockUser.email });
    expect(savedUser.firstname).toBe(mockUser.firstname);
  });

  it('throw an error for already registered user', async () => {
    await expect(services.create(mockUser)).rejects.toThrowError(/User already registered/);
  });
  // #endregion

  // #region Login test
  it('login successfully', async () => {
    await expect(services.authenticate(mockUser)).resolves.toHaveProperty('token');
  });

  it('login not successful', async () => {
    const mockLogin = { email: mockUser.email, password: 'wrong_password' };
    await expect(services.authenticate(mockLogin)).not.toHaveProperty('token');
  });
  // #endregion
});

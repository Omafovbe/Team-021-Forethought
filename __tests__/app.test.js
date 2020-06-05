const request = require('supertest');
const app = require('../src/app');

describe('app module', () => {
  it('returns program name with SDGs', async () => {
    const result = await request(app).get('/');
    const sdgPos = (result.text || '').indexOf('SDG');
    expect(sdgPos).toBeGreaterThanOrEqual(0);
  });

  // it('returns a test result', async () => {
  //   const result = await request(app)
  //   .post('/api/test/')
  // });
});

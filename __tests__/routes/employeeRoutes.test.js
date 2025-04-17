const request = require('supertest');
const app = require('../../server');
const db = require('../../database');

jest.mock('../../database', () => ({
  getAllEmployees: jest.fn()
}));

describe('Employee Routes', () => {
  let server;

  beforeAll(() => {
    // Start server only if needed (for other tests)
  });

  afterAll(async () => {
    if (server) {
      await new Promise(resolve => server.close(resolve));
    }
  });

  test('GET /employeeData returns employees', async () => {
    const mockEmployees = [{ employeeID: 'EMP001' }];
    db.getAllEmployees.mockResolvedValue(mockEmployees);

    const res = await request(app) // Use the app directly
      .get('/employeeData')
      .expect(200);

    expect(res.body).toEqual(mockEmployees);
  });
});
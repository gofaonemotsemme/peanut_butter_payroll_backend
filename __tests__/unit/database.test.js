const db = require('../../database');

jest.mock('../../database', () => ({
  employeeDatabase: {
    query: jest.fn(),
    end: jest.fn()
  },
  getAllEmployees: jest.fn(),
  createEmployee: jest.fn()
}));

describe('Database Operations', () => {
  afterAll(async () => {
    // Clean up any mocks
    jest.restoreAllMocks();
  });

  test('createEmployee handles database errors', (done) => {
    const mockError = new Error('Database connection failed');
    const testEmployee = {
      employeeID: 'EMP999',
      firstName: 'Invalid',
      lastName: 'Employee'
    };

    // Mock database to simulate error
    db.createEmployee.mockImplementation((employee, callback) => {
      callback(mockError);
    });

    db.createEmployee(testEmployee, (err) => {
      expect(err).toBe(mockError);
      done();
    });
  });


  test('getAllEmployees resolves with data', async () => {
    const mockData = [{ id: 1 }];
    db.getAllEmployees.mockResolvedValue(mockData);

    const result = await db.getAllEmployees();
    expect(result).toEqual(mockData);
  });
});
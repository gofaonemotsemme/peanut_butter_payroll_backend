module.exports = {
  employeeDatabase: {
    query: jest.fn((sql, callback) => callback(null, []))
  },
  getAllEmployees: jest.fn(() => Promise.resolve([])),
  createEmployee: jest.fn((employee, callback) => callback(null, 1)),
  updateEmployee: jest.fn(),
  deleteEmployee: jest.fn()
};
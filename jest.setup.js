// Global teardown if needed
module.exports = async () => {
  // Close any open connections
  const db = require('./database');
  if (db.employeeDatabase && db.employeeDatabase.end) {
    await new Promise(resolve => db.employeeDatabase.end(resolve));
  }
};
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const employeeRoutes = require('./employeeRoutes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Root route (optional)
app.get('/', (req, res) => {
    res.send('Welcome to the Peanut Payroll API');
});

// Employee routes
app.use('/', employeeRoutes);

if (process.env.NODE_ENV !== 'test') {
  // Production server startup remains exactly the same
  const server = app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
  module.exports = server;
} else {
  module.exports = app; // Only for testing
}

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

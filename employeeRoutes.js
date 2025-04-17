const router = require('express').Router();
const {
    getAllEmployees,
    getEmployeeByID,
    createEmployee,
    updateEmployee,
    deleteEmployee
} = require('./database');

const isNumeric = (value) => {
    return !isNaN(parseFloat(value)) && isFinite(value);
};

// Helper function to check if a value is a positive number
const isPositiveNumber = (value) => {
    return isNumeric(value) && parseFloat(value) > 0;
};

// Define the helper function at the top of your route file
const isAlphaOnly = (str) => {
    return /^[a-zA-Z\s]+$/.test(str);
};

// Get all employees
router.get('/employeeData', async (req, res) => {
    try {
        const data = await getAllEmployees();
        res.status(200).json(data);
    } catch (err) {
        console.error('Error fetching employees:', err);
        res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
});

// Get employee by ID
router.get('/employeeData/:employeeID', (req, res) => {
    getEmployeeByID(req.params.employeeID, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Internal Server Error', details: err.message });
        }
        if (results.length === 0) return res.status(404).json({ error: 'Employee not found' });
        res.status(200).json(results[0]);
    });
});


// Create new employee
router.post('/employeeData', (req, res) => {
    const employee = req.body;

    // Check for missing required fields
    if (!employee.employeeID || !employee.firstName || !employee.lastName ||
        !employee.salutation || !employee.gender || !employee.grossSalary || !employee.profileColour) {
        return res.status(400).json({
            error: 'Missing required employee data',
            required: ['employeeID', 'firstName', 'lastName', 'salutation', 'gender', 'grossSalary', 'profileColour']
        });
    }

    // Validate employeeID is numeric
    if (!isNumeric(employee.employeeID)) {
        return res.status(400).json({ error: 'Employee ID must be a number' });
    }

    // Validate grossSalary is a positive number
    if (!isPositiveNumber(employee.grossSalary)) {
        return res.status(400).json({ error: 'Gross salary must be a positive number' });
    }

    // Validate firstName and lastName contain only alphabets
    if (!isAlphaOnly(employee.firstName)) {
        return res.status(400).json({ error: 'First name can only contain alphabets' });
    }
    if (!isAlphaOnly(employee.lastName)) {
        return res.status(400).json({ error: 'Last name can only contain alphabets' });
    }

    // Ensure fullName is set
    employee.fullName = `${employee.firstName} ${employee.lastName}`.trim();

    // Validate fullName contains only alphabets and spaces
    if (!isAlphaOnly(employee.fullName)) {
        return res.status(400).json({ error: 'Full name can only contain alphabets and spaces' });
    }

    createEmployee(employee, (err, id) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Internal Server Error', details: err.message });
        }
        res.status(201).json({ message: 'Employee created', id });
    });
});


// Update existing employee
router.put('/employeeData/:employeeID', (req, res) => {
    console.log('Update request for:', req.params.employeeID, 'Data:', req.body);
    const employee = req.body;  // Define employee here

    // Validate employeeID in URL is numeric
    if (!isNumeric(req.params.employeeID)) {
        return res.status(400).json({ error: 'Employee ID must be a number' });
    }

    // Validate grossSalary if it's being updated
    if (employee.grossSalary && !isPositiveNumber(employee.grossSalary)) {
        return res.status(400).json({ error: 'Gross salary must be a positive number' });
    }

    // Validate firstName if it's being updated
    if (employee.firstName && !isAlphaOnly(employee.firstName)) {
        return res.status(400).json({ error: 'First name can only contain alphabets' });
    }

    // Validate lastName if it's being updated
    if (employee.lastName && !isAlphaOnly(employee.lastName)) {
        return res.status(400).json({ error: 'Last name can only contain alphabets' });
    }

    // Validate fullName if either firstName or lastName is being updated
    if (employee.firstName || employee.lastName) {
        const fullName = `${employee.firstName || ''} ${employee.lastName || ''}`.trim();
        if (!isAlphaOnly(fullName)) {
            return res.status(400).json({ error: 'Full name can only contain alphabets and spaces' });
        }
        // Update fullName in the request body if needed
        employee.fullName = fullName;
    }

    // Make sure to pass the updated 'employee' object, not req.body
    updateEmployee(req.params.employeeID, employee, (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({
                error: 'Internal Server Error',
                details: err.message
            });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee updated' });
    });
});

// Delete employee
router.delete('/employeeData/:employeeID', (req, res) => {
    // Validate employeeID is numeric
    if (!isNumeric(req.params.employeeID)) {
        return res.status(400).json({ error: 'Employee ID must be a number' });
    }

    deleteEmployee(req.params.employeeID, (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Internal Server Error', details: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee deleted' });
    });
});

module.exports = router;
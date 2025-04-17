const mysql = require('mysql2');
require('dotenv').config();

const employeeDatabase = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});


employeeDatabase.connect((err) => {
    if (err) {
        console.error('❌ Failed to connect to DB:', err.stack);
        return;
    }
    console.log('✅ Connected to MySQL');
});



const getAllEmployees = () => {
    return new Promise((resolve, reject) => {
        employeeDatabase.query('SELECT * FROM employees', (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

const getEmployeeByID = (employeeID, callback) => {
    employeeDatabase.query('SELECT * FROM employees WHERE employeeID = ?', [employeeID], callback);
};

const createEmployee = (employee, callback) => {
    const sql = `INSERT INTO employees
        (firstName, lastName, fullName, salutation, gender, grossSalary, profileColour)
        VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const values = [
//        employee.employeeID,
        employee.firstName,
        employee.lastName,
        employee.fullName,
        employee.salutation,
        employee.gender,
        employee.grossSalary,
        employee.profileColour
    ];
    employeeDatabase.query(sql, values, (err, result) => {
        if (err) return callback(err, null);
        callback(null, result.insertId);
    });
};

const updateEmployee = (employeeID, data, callback) => {
    // Ensure we don't try to update the employeeID itself
    if (data.employeeID) {
        delete data.employeeID;
    }

    // Log the update operation for debugging
    console.log(`Updating employee ${employeeID} with data:`, data);

    const sql = `UPDATE employees SET ? WHERE employeeID = ?`;
    employeeDatabase.query(sql, [data, employeeID], (err, result) => {
        if (err) {
            console.error('Update error:', err);
            return callback(err);
        }
        callback(null, result);
    });
};

const deleteEmployee = (employeeID, callback) => {
    employeeDatabase.query('DELETE FROM employees WHERE employeeID = ?', [employeeID], callback);
};

module.exports = {
    employeeDatabase,
    getAllEmployees,
    getEmployeeByID,
    createEmployee,
    updateEmployee,
    deleteEmployee
};

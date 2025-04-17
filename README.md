Payroll Backend System 
📌 Overview
This is a backend application for managing employee payroll data. It provides RESTful API endpoints for CRUD operations on employee records with MySQL database integration.

🚀 Features
Employee Management

Create new employee records

Retrieve employee data 

Update existing employee information

Delete employee records

Data Validation

Name fields 

Numeric fields 


Database Integration

MySQL database connection

Prepared statements for security

Error Handling

Comprehensive error responses

Input validation

⚙️ System Requirements
Node.js (v14 or higher)

MySQL (v5.7 or higher)

npm or yarn

🛠️ Installation
Clone the repository:

bash
Copy
git clone https://github.com/gofaonemotsemme/payroll_backend.git
cd payroll_backend
Install dependencies:

bash
Copy
npm install


Create a MySQL database named payroll_db

Run the SQL schema file to create tables:

bash
Copy
mysql -u username -p payroll_db < schema.sql


🏃 Running the Application
Start the development server:

bash
Copy
npm start
The API will be available at http://localhost:3000

📚 API Documentation
Base URL: http://localhost:3000
Endpoints:
Employees
GET /employeeData - Get all employees

GET /employeeData/:employeeID - Get employee by ID

POST /employeeData - Create new employee

PUT /employeeData/:employeeID - Update employee

DELETE /employeeData/:employeeID - Delete employee

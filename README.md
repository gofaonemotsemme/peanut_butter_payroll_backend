# 💼 Payroll Backend System

## 📌 Overview  
This is a backend application for managing employee payroll data. It provides RESTful API endpoints for CRUD operations on employee records with MySQL database integration.

---

## 🚀 Features

### 👥 Employee Management  
- Create new employee records  
- Retrieve employee data  
- Update existing employee information  
- Delete employee records  

### ✅ Data Validation  
- Validate name fields  
- Validate numeric fields  

### 🗄️ Database Integration  
- MySQL database connection  
- Prepared statements for security  

### ❗ Error Handling  
- Comprehensive error responses  
- Input validation  

---

## ⚙️ System Requirements  
- Node.js (v14 or higher)  
- MySQL (v5.7 or higher)  
- npm or yarn  

---

## 🛠️ Installation

1. **Clone the repository:**

```bash
git clone https://github.com/gofaonemotsemme/payroll_backend.git
cd payroll_backend
```

2. **Install dependencies:**

```bash
npm install
```

3. **Set up the database:**
   - Create a MySQL database named `payroll_db`
   - Run the SQL schema file to create tables:

```bash
 cd "C:\Program Files\MySQL\MySQL Server 8.0\bin"   
.\mysql -u root -p 
```

---

## 🏃 Running the Application

Start the development server:

```bash
npm start
```

The API will be available at:  
**http://localhost:3000**

---

## 📚 API Documentation

**Base URL:** `http://localhost:3000`

### 🔹 Employees

- `GET /employeeData` – Get all employees  
- `GET /employeeData/:employeeID` – Get employee by ID   

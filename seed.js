const { createEmployee } = require('./database');

const dummyEmployees = [
    {
//        employeeId: 0000090,
        firstName: 'Jane',
        lastName: 'Doe',
        fullName: 'Jane Doe',
        salutation: 'Ms',
        gender: 'Female',
        grossSalary: 5500000,
        profileColour: 'blue'
    },
    {
//        employeeId: 0976552,
        firstName: 'John',
        lastName: 'Smith',
        fullName: 'John Smith',
        salutation: 'Mrs',
        gender: 'Female',
        grossSalary: 6000000,
        profileColour: 'red'
    },
     {
//         employeeId: 1,
         firstName: 'Johannes',
         lastName: 'Morale',
         fullName: 'Johannes Morale',
         salutation: 'Mr',
         gender: 'Unspecified',
         grossSalary: 6000000,
         profileColour: 'green'
     }
];

dummyEmployees.forEach(emp => {
    createEmployee(emp, (err, id) => {
        if (err) {
            console.error(`Failed to insert ${emp.employeeId}`, err);
        } else {
            console.log(`Inserted ${emp.employeeID} with ID ${id}`);
        }
    });
});

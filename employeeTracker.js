const cTable = require('console.table');
const inquirer = require ('inquirer');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '12345678',
  database: 'employee_manager'
});

connection.connect(err => {
  if (err) throw err;
  console.log("Connected successfully. Connection ID is " + connection.threadId + "\n");
  init();
})

function init() {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'Add department',
        'Add role',
        'Add employee',
        'View departments',
        'View roles',
        'View employees',
        'Update employee role',
        'Exit'
      ]
    }).then(answer => {
      switch(answer.action) {
        case 'Add department':
          addDepartment();
          break;
        case 'Add role':
          addRole();
          break;
        case 'Add employee':
          addEmployee();
          break;
        case 'View departments':
          viewDepartments();
          break;
        case 'View roles':
          viewRoles();
          break;
        case 'View employees':
          viewEmployees();
          break;
        case 'Update employee role':
          updateEmployeeRole();
          break;
        case 'Exit':
          connection.end();
          break;
      }
    })
}

function Department(id, name) {
  this.id = id;
  this.name = name;
}

function Role(id, title, salary) {
  this.id = id;
  this.title = title;
  this.salary = salary;
  // Need follow up question to assign role to department
}

function Employee(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
  // Need follow up question to assign employee to a role
  // Need follow up question to assign employee to a manager
}

function addDepartment() {
  const query = 'SELECT * FROM department';
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.log('TABLE OF DEPARTMENTS:')
    console.table(res);
    inquirer
      .prompt([
        {
          name: 'departmentId',
          type: 'input',
          message: 'What is the new department ID?',
          validate: function(input) {
            const done = this.async();
            setTimeout(function() {
              if (isNaN(input)) {
                done('Department ID must be a number.')
                return;
              } else if (input.length < 3 || input.length > 3) {
                done('Department ID length must be equal to 3 digits.')
              }
              done(null, true);
              return;
            }, 500);
          }
        },
        {
          name: 'departmentName',
          type: 'input',
          message: 'What is the new department name?'
        }
      ]).then(answer => {
        // Validation to ensure new department ID or name doesn't already exist
        const { departmentId } = answer;
        const { departmentName } = answer;
        for (let i = 0; i < res.length; i++) {
          if (departmentId == res[i].id) {
            console.log('\n' + departmentId + ' already exists.\n');
            return init();
          } else if (departmentName == res[i].name) {
            console.log('\n' + departmentName + ' already exists.\n');
            return init();
          }
        }
        const newDepartment = new Department(departmentId, departmentName);
        connection.query('INSERT INTO department SET ?', newDepartment, err => {
          if (err) throw err;
        });
        connection.query('SELECT * FROM department', (err, res) => {
          if (err) throw err;
          console.log('\nDepartment added successfully.\nUPDATED TABLE OF DEPARTMENTS:');
          console.table(res);
          return init();
        });
      });
  });
}
const cTable = require('console.table');
const inquirer = require ('inquirer');
const orm = require('./config/orm.js');

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
          orm.select("*", "departments", function(result) {
            addDepartment(result);
          });
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
  this.department_id = id;
  this.department_name = name;
}

function Role(id, title, salary) {
  this.role_id = id;
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

async function addDepartment(result) {
  try {
    const answer = await inquirer.prompt([
      { //Question 1:
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
      { // Question 2:
        name: 'departmentName',
        type: 'input',
        message: 'What is the new department name?'
      }
    ]);
    const { departmentId, departmentName } = answer;
    // Validation to ensure new department ID or name doesn't already exist
    for (let i = 0; i < result.length; i++) {
      if (+departmentId === result[i].department_id) {
        console.log('\n' + departmentId + ' already exists.\n');
        return init();
      } else if (departmentName === result[i].department_name) {
        console.log('\n' + departmentName + ' already exists.\n');
        return init();
      }
    }
    const newDepartment = new Department(departmentId, departmentName);
    orm.insert("departments", newDepartment, () => {
      console.log("\nNew department added successfully.")
      return;
    });
    orm.select("*", "departments", () => {
      return init();
    });
  } catch (error) {
    console.log(error);
  }
}

function addRole() {
  connection.query("SELECT * FROM departments;", (err, res) => {
    if (err) throw err;
    departments = res;
  });
  const query = `
    SELECT job_roles.role_id, job_roles.title, job_roles.salary, departments.department_name, departments.department_id
    FROM job_roles
    LEFT JOIN departments ON job_roles.department_id = departments.department_id
    ORDER BY job_roles.role_id;
  `;
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.log('TABLE OF JOB ROLES:')
    console.table(res);
    inquirer
      .prompt([
        {
          name: 'roleId',
          type: 'input',
          message: 'What is the new role ID?',
          validate: function(input) {
            const done = this.async();
            setTimeout(function() {
              if (isNaN(input)) {
                done('Role ID must be a number.')
                return;
              } else if (input.length < 6 || input.length > 6) {
                done('Department ID length must be equal to 6 digits.')
              }
              done(null, true);
              return;
            }, 500);
          }
        },
        {
          name: 'roleTitle',
          type: 'input',
          message: 'What is the title for the new role?'
        },
        {
          name: 'roleSalary',
          type: 'input',
          message: 'What is the salary for the new role?',
          validate: function(input) {
            const done = this.async();
            setTimeout(function() {
              if (isNaN(input)) {
                done('Salary must be a number.')
                return;
              }
              done(null, true);
              return;
            }, 500);
          },
        },
        {
          name: 'departmentName',
          type: 'rawlist',
          choices: function() {
            const choiceArray = [];
            for (let i = 0; i < departments.length; i++) {
              choiceArray.push(departments[i].department_name);
            }
            return choiceArray;
          },
          message: 'Which department does the new role belong to?'
        }
      ]).then(answer => {
        const querySelect = "SELECT department_id FROM departments WHERE department_name = ?";
        connection.query(querySelect, answer.departmentName, (err, res) => {
          if (err) throw err;
          answer.departmentId = res[0].department_id;
        });
        const queryInsert = "INSERT INTO job_roles (role_id, title, salary, department_id) VALUES (?, ?, ?, ?)";
        connection.query(queryInsert, [answer.roleId, answer.roleTitle, answer.roleSalary, answer.departmentId], err => {
          if (err) throw err;
        });
        const query = `
          SELECT job_roles.role_id, job_roles.title, job_roles.salary, departments.department_name, departments.department_id
          FROM job_roles
          LEFT JOIN departments ON job_roles.department_id = departments.department_id
          ORDER BY job_roles.role_id;
        `;
        connection.query(query, (err, res) => {
          if (err) throw err;
          console.log('TABLE OF JOB ROLES:')
          console.table(res);
          return init();
        });
      });
  });
}

init();
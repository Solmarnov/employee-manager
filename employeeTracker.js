const cTable = require('console.table');
const inquirer = require ('inquirer');
const orm = require('./config/orm.js');
const connection = require('./config/connection.js');

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
          orm.selectCb("*", "departments", function(result) {
            console.log("\nTABLE OF DEPARTMENTS");
            console.table(result);
            addDepartment(result);
          });
          break;
        case 'Add role':
          orm.selectCb("*", "job_roles", function(result) {
            addRole(result);
          });
          break;
        case 'Add employee':
          orm.selectCb("*", "employees", function(result) {
            console.log("\nTABLE OF EMPLOYEES");
            console.table(result);
            addEmployee(result);
          });
          break;
        case 'View departments':
          viewTable(answer);
          break;
        case 'View roles':
          viewTable(answer);
          break;
        case 'View employees':
          viewTable(answer);
          break;
        case 'Update employee role':
          orm.selectCb("*", "employees", function(result) {
            updateEmployeeRole(result);
          })
          break;
        case 'Exit':
          connection.end();
          break;
      }
    });
}

function Department(id, name) {
  this.department_id = id;
  this.department_name = name;
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
    const { 
      departmentId, 
      departmentName 
    } = answer;
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
    await orm.insert("departments", newDepartment);
    console.log("\nNew department added successfully.");
    return init();
  } catch (error) {
    console.log(error);
  }
}

function Role(id, title, salary, departmentId) {
  this.role_id = id;
  this.title = title;
  this.salary = salary;
  this.department_id = departmentId;
}

async function addRole(result) {
  try {
    const departments = await orm.select(
      "*", "departments");
    const leftJoinRolesDepts = await orm.leftJoin(
      [
        "job_roles.role_id",
        "job_roles.title",
        "job_roles.salary",
        "departments.department_name",
        "departments.department_id"
      ],
      "job_roles",
      "departments",
      "job_roles.department_id",
      "departments.department_id",
      "job_roles.role_id"
    );
    console.log("TABLE OF JOB ROLES:");
    console.table(leftJoinRolesDepts);
    const answer = await inquirer.prompt([
      { // Question 1
        name: 'roleId',
        type: 'input',
        message: 'What is the new role ID?',
        validate: function(input) {
          const done = this.async();
          setTimeout(function() {
            if (isNaN(input)) {
              done('Role ID must be a number.');
              return;
            } else if (input.length < 6 || input.length > 6) {
              done('Role ID length must be equal to 6 digits.');
              return;
            }
            done(null, true);
            return;
          }, 500);
        }
      },
      { // Question 2
        name: 'roleTitle',
        type: 'input',
        message: 'What is the title for the new role?'
      },
      { // Question 3
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
      { // Question 4
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
    ]);
    const departmentIdArr = await orm.selectWhere(
      "department_id", 
      "departments", 
      "department_name", 
      answer.departmentName
    );
    answer.departmentId = departmentIdArr[0].department_id;
    const { 
      roleId, 
      roleTitle,
      roleSalary,
      departmentId
    } = answer;
    for (let i = 0; i < result.length; i++) {
      if (+roleId === result[i].role_id) {
        console.log("\n" + roleId + " already exists.\n");
        return init();
      }
    }
    const newRole = new Role(roleId, roleTitle, roleSalary, departmentId);
    await orm.insert("job_roles", newRole);
    console.log("\nNew job role added succesfully.");
    return init();
  } catch (error) {
    console.log(error);
  }
}

function Employee(firstName, lastName, roleId, managerId) {
  this.first_name = firstName;
  this.last_name = lastName;
  this.role_id = roleId;
  this.manager_id = managerId;
}

async function addEmployee(result) {
  try {
    const jobRoles = await orm.select("*", "job_roles");
    const employees = await orm.select("*", "employees")
    const answer = await inquirer.prompt([
      { // Question 1
        name: 'firstName',
        type: 'input',
        message: "What is the new employee's first name?"
      },
      { // Question 2
        name: 'lastName',
        type: 'input',
        message: "What is the new employee's last name?"
      },
      { // Question 3
        name: 'employeeRole',
        type: 'rawlist',
        choices: function() {
          const choiceArray = [];
          for (let i = 0; i < jobRoles.length; i++) {
            choiceArray.push(jobRoles[i].title);
          }
          return choiceArray;
        },
        message: "What is the new employee's job role?"
      },
      { // Quesiton 4
        name: 'employeeManager',
        type: 'rawlist',
        choices: function() {
          const choiceArray = [];
          for (let i = 0; i < employees.length; i++) {
            choiceArray.push(employees[i].first_name + ' ' + employees[i].last_name);
          }
          choiceArray.push("");
          return choiceArray;
        },
        message: "Who is the new employee's manager?"
      }
    ]);
    const roleIdArr = await orm.selectWhere(
      "role_id", 
      "job_roles", 
      "title",
      answer.employeeRole
    );
    answer.roleId = roleIdArr[0].role_id;
    const managerNameArr = answer.employeeManager.split(" ");
    if (answer.employeeManager != "") {
      const managerIdArr = await orm.selectWhere(
        "employee_id", 
        "employees", 
        ["first_name", "last_name"], 
        [managerNameArr[0], managerNameArr[1]]
      );
      const managerId = managerIdArr[0].employee_id;
      answer.managerId = managerId;
    } else {
      answer.managerId = null;
    }
    const {firstName, lastName, roleId, managerId} = answer;
    for (let i = 0; i < result.length; i++) {
      if (firstName == result[i].first_name ||
      lastName == result[i].last_name) {
        console.log("\nEmployee record already exists.");
        return init();
      }
    }
    const newEmployee = new Employee(firstName, lastName, roleId, managerId);
    await orm.insert("employees", newEmployee);
    console.log("\nNew employee added successfully.");
    return init();
  } catch (error) {
    console.log(error);
  }
}

async function viewTable(answer) {
  let table = '';
  let title = '';
  if (answer.action == 'View departments') {
    table = 'departments';
    title = "TABLE OF DEPARTMENTS";
  } else if (answer.action == 'View roles') {
    table = 'job_roles';
    title = "TABLE OF JOB ROLES"
  } else if (answer.action == 'View employees') {
    table = 'employees';
    title = "TABLE OF EMPLOYEES"
  }
  try {
    result = await orm.select("*", table);
    console.log("\n" + title);
    console.table(result);
    return init();
  } catch (error) {
    console.log(error);
  }
}

async function updateEmployeeRole(result) {
  try {
    const jobRoles = await orm.select("*", "job_roles");
    const answer = await inquirer.prompt([
      { // Question 1
        name: 'updateEmployee',
        type: 'rawlist',
        choices: function() {
          const choiceArray = [];
          for (let i = 0; i < result.length; i++) {
            choiceArray.push(result[i].first_name + ' ' + result[i].last_name);
          }
          return choiceArray;
        },
        message: "Which employee would you like to update the job role for?"
      },
      { // Question 2
        name: 'roleTo',
        type: 'rawlist',
        choices: function() {
          const choiceArray = [];
          for (let i = 0; i < jobRoles.length; i++) {
            choiceArray.push(jobRoles[i].title);
          }
          choiceArray.push("Cancel");
          return choiceArray;
        },
        message: "What is their new job role?"
      }
    ]);
    switch(answer.roleTo) {
      case "Cancel":
        init();
        break;
      default:
        const jobRoleIdArr = await orm.selectWhere("role_id", "job_roles", "title", answer.roleTo);
        const employeeNameArr = answer.updateEmployee.split(" ");
        await orm.update(
          "employees", 
          "role_id", 
          jobRoleIdArr[0].role_id, 
          ["first_name", "last_name"], 
          [employeeNameArr[0], employeeNameArr[1]]
        );
        console.log("\nEmployee role updated successfully.");
        init();
        break;
    }
  } catch (error) {
    console.log(error);
  }
}

init();
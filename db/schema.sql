DROP DATABASE IF EXISTS employee_manager;

CREATE DATABASE employee_manager;

USE employee_manager;

CREATE TABLE departments (
  department_id INT NOT NULL,
  department_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (department_id)
);

CREATE TABLE job_roles (
  role_id INT NOT NULL,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(8, 2) NOT NULL,
  department_id INT, -- to hold the reference to 'department' that role belongs to
  PRIMARY KEY (role_id),
  FOREIGN KEY (department_id) REFERENCES departments (department_id)
);

CREATE TABLE employees (
  employee_id INT AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL, -- to hold reference to the 'role' the employee has
  manager_id INT, -- to hold reference to another employee that manages the current employee. This field may be null if the employee has no manager
  PRIMARY KEY (employee_id),
  FOREIGN KEY (role_id) REFERENCES job_roles (role_id)
);

# Node.js Employee Manager
A solution for managing a company's employees using Node and its packages: Inquirer, and MySQL. This **C**ontent **M**anagement **S**ystem allows users to: 
*  Add departments, roles, employees
*  View departments, roles, employees
*  Update employee roles

## Usage
Users wil require MySQL, Node, and its packages: Inquirer and MySQL, to run this application. 

1.  Start application using command, `node employeeTracker.js`  
    <img src="https://user-images.githubusercontent.com/59265518/82135056-c7c39000-9841-11ea-8223-5fb85230f58b.png">

1.  Select action:  
    *  [Add department](#add-department)
    *  [Add role](#add-role)
    *  [Add employoee](#add-employee)
    *  [View departments](#view)
    *  [View role](#view)
    *  [View employees](#view)
    *  [Update employee role](#update-employee-role)
    *  Exit

### Add department
For reference, the current list of departments will be presented. 
1.  **What is the new department ID?**  
    <img src="https://user-images.githubusercontent.com/59265518/82135142-7e277500-9842-11ea-81b7-d04508bf9e8e.png"> 
    **Department ID validation:**
    1.  Department ID must be a number   
        <img src="https://user-images.githubusercontent.com/59265518/82135219-7c11e600-9843-11ea-94df-1778fe5eea93.png">  
    1.  Department ID length must be equal to 3 digits  
        <img src="https://user-images.githubusercontent.com/59265518/82135248-e460c780-9843-11ea-8569-1384ffe04911.png">

1.  **What is the new department name?**  
    <img src="https://user-images.githubusercontent.com/59265518/82135303-7c5eb100-9844-11ea-8e38-1bbacb509a45.png">

1.  The application will validate that the new department ID or name does not already exist before inserting the new record.  
    **Duplicate check:**  
    1.  {{department_id}} / {{department_name}} already exists.  
        <img src="https://user-images.githubusercontent.com/59265518/82135418-09563a00-9846-11ea-9262-324551a14a07.png">  
    1.  New department added successfully.  
        <img src="https://user-images.githubusercontent.com/59265518/82135356-335b2c80-9845-11ea-955f-3de077e1f84d.png">

1.  Select your next action. 

### Add role 
For reference, the current list of job roles will be presented. Utilising `department_id` as a Foreign Key, the application will also return the department names a job role belongs to via a left join. 

1.  **What is the new role ID?**  
    <img src="https://user-images.githubusercontent.com/59265518/82135519-10ca1300-9847-11ea-9632-156f739cd03b.png">  
    **Role ID validation:**  
    1.  Role ID must be a number  
        <img src="https://user-images.githubusercontent.com/59265518/82135558-71f1e680-9847-11ea-9067-8835e120bd2a.png">  
    1.  Role ID length must be equal to 6 digits  
        <img src="https://user-images.githubusercontent.com/59265518/82135576-a2398500-9847-11ea-9e59-a1c47b935915.png">

1.  **What is the title for the new role?**  
    <img src="https://user-images.githubusercontent.com/59265518/82135609-ef1d5b80-9847-11ea-95e2-322713829b20.png">

1.  **What is the salary for the new role?**  
    <img src="https://user-images.githubusercontent.com/59265518/82135632-2a1f8f00-9848-11ea-8ebb-66aded112164.png">  
    **Salary validation:**  
    1.  Salary must be a number  
        <img src="https://user-images.githubusercontent.com/59265518/82135658-7b2f8300-9848-11ea-8775-b9bd10810598.png">

1.  **Which department does the new role belong to?**  
    <img src="https://user-images.githubusercontent.com/59265518/82135681-c3e73c00-9848-11ea-94d3-aabdb0f1387c.png">

1.  The application will validate that the new role ID does not already exist before inserting the new record.  
    **Duplicate check:**  
    1.  {{role_id}} already exists.  
        <img src="https://user-images.githubusercontent.com/59265518/82135813-0d845680-984a-11ea-8170-8daba916da6d.png">
    1.  New job role added successfully.  
        <img src="https://user-images.githubusercontent.com/59265518/82135760-bd0cf900-9849-11ea-8e78-84356c238b91.png">

1.  Select your next action. 

### Add employee 
For reference, the current list of employees is printed. In this case, the employee_id is assigned automatically. 

1.  **What is the new employee's first name?**  
    <img src="https://user-images.githubusercontent.com/59265518/82136511-25f86f00-9852-11ea-909a-095b880ebae8.png">

1.  **What is the new employee's last name?**  
    <img src="https://user-images.githubusercontent.com/59265518/82135879-10cc1200-984b-11ea-82ff-e3a55759c000.png">

1.  **What is the new employee's job role?**  
    Select from a list of current job roles  
    <img src="https://user-images.githubusercontent.com/59265518/82135919-71f3e580-984b-11ea-8548-04cfc7c35b06.png">

1.  **Who is the new employee's manager?**  
    Select from a list of current employees  
    <img src="https://user-images.githubusercontent.com/59265518/82135997-43c2d580-984c-11ea-81a5-91c1f88e4432.png">

1.  The application will validate that the new employee's first name and last name does not already exist before inserting the new record.  
    **Duplicate check:**  
    1.  Employee already exists.  
        <img src="https://user-images.githubusercontent.com/59265518/82136191-4c1c1000-984e-11ea-9c0b-11eac7cdcd22.png">
    1.  New employee added successfully.  
        <img src="https://user-images.githubusercontent.com/59265518/82136137-af597280-984d-11ea-804d-6c2cb8113aa7.png">

1.  Select your next action. 

### View... 
Selecting "View departments", "View roles", or "View employees" returns the current tables for the respective choice. 

#### ...departments 
"View departments" prints the table of departments.  
<img src="https://user-images.githubusercontent.com/59265518/82136379-c188e000-9850-11ea-8d7b-2db672c766b1.png">

#### ...roles 
"View roles" prints the table of job_roles.  
<img src="https://user-images.githubusercontent.com/59265518/82136390-ef6e2480-9850-11ea-9e77-664acfb99155.png">

#### ...employees 
"View employees" prints the table of employees to the console.  
<img src="https://user-images.githubusercontent.com/59265518/82136407-2cd2b200-9851-11ea-849c-384df6f715ca.png">

### Update employee role 

1.  **Which employee would you like to update the job role for?**  
    Select from a list of current employees  
    <img src="https://user-images.githubusercontent.com/59265518/82136555-87204280-9852-11ea-9b2c-51274f24cdd1.png">

1.  **What is their new job role?**  
    Select from a list of current job roles - the option to "Cancel" action is also provided  
    <img src="https://user-images.githubusercontent.com/59265518/82136591-cfd7fb80-9852-11ea-8266-5d82a1118853.png">

1.  **Employee role updated successfully**  
    <img src="https://user-images.githubusercontent.com/59265518/82136650-32c99280-9853-11ea-95ca-7931406a9235.png">

1.  Select your next action. 

## Technologies
*  MySQL
*  Node.js
*  inquirer package
*  mysql package
*  console.table package (optional)

## Setup 
1.  Run the following command to install recommended dependencies:   
    `npm install inquirer mysql console.table`

1.  Using your preferred MySQL application:  
    1.  Run the MySQL script provided in the _employee_manaager.sql_ file to initialise the database and create required tables.  
    1.  Run the MySQL script provided in the _seed.sql_ file if you require dummy records

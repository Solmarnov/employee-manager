ALTER TABLE employees AUTO_INCREMENT=10000001;

INSERT INTO departments (department_id, department_name) 
VALUES 
  (100, 'HR'),
  (200, 'Finance'),
  (300, 'ICT'),
  (400, 'Marketing'),
  (500, 'Operations');
    
INSERT INTO job_roles (role_id, title, salary, department_id)
VALUES 
  (100100, 'Head of HR', 140000, 100),
  (100200, 'HR Manager', 100000, 100),
  (100300, 'Recruitment Officer', 80000, 100),
  (100310, 'Payroll Officer', 60000, 100),
  (200100, 'Chief Financial Officer', 140000, 200),
  (200200, 'Finance Manager', 100000, 200),
  (200300, 'Accountant', 90000, 200),
  (200310, 'Accounts Clerk', 60000, 200),
  (300100, 'Chief Technology Officer', 140000, 300),
  (300200, 'IT Manager', 120000, 300),
  (300300, 'Lead Engineer', 100000, 300),
  (300310, 'Software Engineer', 90000, 300),
  (300320, 'Software Developer', 70000, 300),
  (400100, 'Head of Marketing', 140000, 400),
  (400200, 'Marketing Manager', 100000, 400),
  (400300, 'Marketing Officer', 80000, 400),
  (500100, 'Head of Operations', 140000, 500),
  (500200, 'Operations Manager', 110000, 500),
  (500300, 'Operations Officer', 60000, 500);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ('Mario', 'Speedwagon', 500100, NULL),
  ('Petey', 'Cruiser', 300100, NULL),
  ('Anna', 'Sthesia', 300320, 10000002),
  ('Paul', 'Molive', 500300, 10000001),
  ('Anna', 'Mull', 500200, 10000001),
  ('Gail', 'Forecwind', 500300, 10000001),
  ('Paige', 'Turner', 300200, 10000002);
  
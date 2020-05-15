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
  console.log("\nConnected successfully. Connection ID is " + connection.threadId + "\n");
});

module.exports = connection;
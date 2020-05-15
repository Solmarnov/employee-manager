const connection = require('./connection.js');

const orm = {
  select: function(returnCol, tableInput, cb) {
    const queryString = "SELECT ?? FROM ??";
    connection.query(
      queryString, 
      [returnCol, tableInput], 
      function(err, result) {
      if (err) throw err;
      console.log("\nTABLE OF " + tableInput.toUpperCase());
      console.table(result);
      cb(result);
      }
    );
  },
  insert: function(tableInput, insertVals, cb) {
    const queryString = "INSERT INTO ?? SET ?";
    connection.query(
      queryString,
      [tableInput, insertVals],
      function(err) {
        if (err) throw err;
        cb();
      }
    );
  }
}

module.exports = orm;
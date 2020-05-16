const connection = require('./connection.js');

const orm = {
  select: function(returnCol, tableInput) {
    const queryString = "SELECT ?? FROM ??";
    return new Promise((resolve, reject) => {
      connection.query(
        queryString,
        [returnCol, tableInput],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  },
  selectWhere: function(returnCol, tableInput, whereCol, condition) {
    const queryString = "SELECT ?? FROM ?? WHERE ?? = ?";
    return new Promise((resolve, reject) => {
      connection.query(
        queryString,
        [returnCol, tableInput, whereCol, condition],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  },
  selectCb: function(returnCol, tableInput, cb) {
    const queryString = "SELECT ?? FROM ??";
    connection.query(
      queryString,
      [returnCol, tableInput],
      function(err, result) {
        if (err) throw err;
        cb(result);
      }
    )
  },
  insert: function(tableInput, insertVals) {
    const queryString = "INSERT INTO ?? SET ?";
    return new Promise((resolve, reject) => {
      connection.query(
        queryString,
        [tableInput, insertVals],
        function(err, result) {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  },
  leftJoin: function(colsToSelect, fromTable, joinTable, onCol, equalsCol, orderBy) {
    let queryString = "SELECT ??";
    queryString += " FROM ??";
    queryString += " LEFT JOIN ?? ON ?? = ??";
    queryString += " ORDER BY ??";
    return new Promise((resolve, reject) => {
      connection.query(
        queryString, 
        [
          colsToSelect, 
          fromTable, 
          joinTable, 
          onCol, 
          equalsCol,
          orderBy
        ], 
        (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }
}

module.exports = orm;
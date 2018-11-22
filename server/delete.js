const express = require('express')
const mysql = require('mysql');
let router = express.Router();

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rina3004',
  database: "myproject"

});
connection.connect(function (err) {
  if (!!err) {
    console.log('error: ' + err.message);
  } else {
    console.log("connect");

  }
});
router.delete("/:projectName", (req, res) => {

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Max-Age', 86400)
  res.header('Access-Control-Allow-Headers', '*');

  console.log("delete");
  

  const projectName = req.params.projectName
  deleteTable = () => {

    let table = ` drop table ${projectName}`
    return table
  }
  const mysqlll = deleteTable();

  connection.query(mysqlll, (err, result, files, rows) => {
    if (err) {
      console.log('error query delete ' + err.message);
    } else {
      console.log("succes :", result)

    }
  })
})
    // connection.end(function(err) {
    //   if (err) {
    //     return console.log('error:' + err.message);
    //   }
    //   console.log('Close the database connection.');
    // });
module.exports = router;

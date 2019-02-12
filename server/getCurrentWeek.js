const express = require('express')
const mysql = require('mysql');
let router = express.Router();

let connection = mysql.createConnection({
  host: 'rtsuit.mysql.database.azure.com',
    user: 'rtsuit@rtsuit',
    password: 'Ravtech123!',
    database:'myproject',
    port:3306,

});

connection.connect(function (err) {
  if (!!err) {
    console.log('error: ' + err.message);
  } else {
    console.log("connect");

  }
});

router.get("/getCurrentWeek/:projectName", (req, res) => {

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Max-Age', 86400)
  res.header('Access-Control-Allow-Headers', '*');

  console.log("1er");

  let insertTBDb = () => {

    const project  = req.params.projectName


    let sql = ` SELECT * FROM ${project} order by week desc, version desc limit 1 `
    

    return sql

  }
  const mysqlll = insertTBDb();

  connection.query(mysqlll, (err, result, files, rows) => {
    if (err) {
      console.log('error query ' + err.message);
    } else {
      console.log("succes ", result)

     
        res.send(result);
    }
  })
})
module.exports = router;
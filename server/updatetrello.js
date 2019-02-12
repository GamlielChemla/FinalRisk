const express = require('express')
const mysql = require('mysql');
let router = express.Router();
// let maxvlue = ''

let connection = mysql.createConnection({
  host: 'rtsuit.mysql.database.azure.com',
    user: 'rtsuit@rtsuit',
    password: 'Ravtech123!',
    database:'myproject',
    port:3306,

});
router.post('/update', (req, res) => {
    

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Max-Age', 86400)
    res.header('Access-Control-Allow-Headers', '*');
  
    console.log("Proba",req.body.probability);
    let probability = Object.values(req.body.probability) [0]

    
    let projectName = req.body.projectName
    console.log("name",projectName);
    let week = req.body.week

    let mysql = `UPDATE ${projectName} SET ProbabilityBudget = ${probability} WHERE version = (select max(version )`
    
     connection.query  (mysql, (err, result, files, rows) => {
        if (err) {
          console.log('error query ' + err.message);
        } else {
          console.log("succes ", Object.values(result[0])[0])
          let maxvalue = Object.values(result[0])[0]
        }
  
            // res.send(result);
      })

    })
    module.exports = router;  
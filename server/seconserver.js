let express = require('express')
let mysql = require('mysql');
var bodyParser = require('body-parser')
let router = express.Router();
const allFuncs =require("./allFuncs")



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
  router.post('/second', (req, res)=> {
    
    
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Max-Age', 86400)
    res.header('Access-Control-Allow-Headers', '*');
    
    console.log("1er");
    console.log("req",req.body)
    
   mysqlll =  allFuncs.insertInDb(req)


   connection.query(mysqlll, (err, result, files, rows) => {
    if (err) {
      console.log('error query ' + err.message);
    } else {
      console.log("succes ",result)

    }

  })
   
  
})
module.exports = router;

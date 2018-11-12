const express = require('express')
const mysql = require('mysql');
let router = express.Router();

const bodyParser = require('body-parser')
const app = express();


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
  router.post("/first", (req, res)=> {
    
  
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Max-Age', 86400)
    res.header('Access-Control-Allow-Headers', '*');
   
    console.log("1er");
    
    
    insertInDb = (req)=>{
        
    let sendProject = req.body.sendProject

    let table = `create table ${sendProject} (id INT AUTO_INCREMENT PRIMARY KEY,total int,ProbabilityTest int,ConcequenceTest int,MitigationTest varchar (255),ReasonTest varchar (255),ProbabilityBudget int,ConcequenceBudget int,MitigationBudget varchar (255),ReasonBudget varchar (255),ProbabilityDeliveryD int,ConcequenceDeliveryD int,MitigationDeliveryD varchar (255),ReasonDeliveryD varchar (255),ProbabilityCustomer int,ConcequenceCustomer int,MitigationCustomer varchar (255),ReasonCustomer varchar (255) )`
    return table
    
}
const mysqlll = insertInDb(req);


   connection.query(mysqlll, (err, result, files, rows) => {
    if (err) {
      console.log('error query ' + err.message);
    } else {
      console.log("succes ",result)

    }

  })

})
module.exports = router;

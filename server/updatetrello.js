let express = require('express')
let mysql = require('mysql');

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
router.post('/update', (req, res) => {
    

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Max-Age', 86400)
    res.header('Access-Control-Allow-Headers', '*');
  
    console.log("Proba",req.body.probability);
    let probability = Object.values(req.body.probability) [0]

    
    let projectName = req.body.projectName
    console.log("name",projectName);
    console.log("probability",probability);
    

    let version = `update ${projectName} SET ProbabilityBudget = ${probability}
    WHERE version = (SELECT * from (SELECT MAX(Version)
    FROM ${projectName}) as gam);`

    console.log("Versmmmmmmmmmmmmmmmmmmmmmmmmmmion",version);
    
     connection.query  (version, (err, result, files, rows) => {
        if (err) {
          console.log('error query ' + err);
        } else {
          console.log("succesUpdate ", result)
          // console.log("succes ", Object.values(result[0])[0])
        }
  
            // res.send(result);
      })


    })
    module.exports = router;  
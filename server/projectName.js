let express = require('express')
let mysql = require('mysql');
var bodyParser = require('body-parser')
// let app = express();
let router = express.Router();


// const port = 5000;


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

  router.post('/myname', (req, res)=> {
    

    console.log("name",req.body)
  
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Max-Age', 86400)
    res.header('Access-Control-Allow-Headers', '*');
   
    console.log("1er");

    projectName =()=>{
      
      const name = req.body
      
      
      //  insertInDb = (req)=>{
        
        //   let ProbabilityTest=req.body[0].testprobability
        //   let ConcequenceTest=req.body[0].testconcequence
        //   let MitigationTest=req.body[0].testmitigation
        //   let ReasonTest=req.body[0].testreasons
        //   let ProbabilityBudget=req.body[1].budgetprobability
        //   let ConcequenceBudget=req.body[1].budgetconcequence
        //   let MitigationBudget=req.body[1].budgetmitigation
        //   let ReasonBudget=req.body[1].budgetreasons
        //   let ProbabilityDeliveryD=req.body[2].delayprobability
        //   let ConcequenceDeliveryD=req.body[2].delayconcequence
        //   let MitigationDeliveryD=req.body[2].delaymitigation
        //   let ReasonDeliveryD=req.body[2].delayreasons
        //   let ProbabilityCustomer=req.body[3].customerprobability
        //   let ConcequenceCustomer=req.body[3].customerconcequence
        //   let MitigationCustomer=req.body[3].customermitigation
        //   let ReasonCustomer=req.body[3].customerreasons
        
        
        let sql = `INSERT INTO ${name} (ProbabilityTest,ConcequenceTest,MitigationTest,ReasonTest,ProbabilityBudget,ConcequenceBudget,MitigationBudget,ReasonBudget,ProbabilityDeliveryD,ConcequenceDeliveryD,MitigationDeliveryD,ReasonDeliveryD,ProbabilityCustomer,ConcequenceCustomer,MitigationCustomer,ReasonCustomer) VALUES 
        
        ('${ProbabilityTest}', '${ConcequenceTest}', '${MitigationTest}', '${ReasonTest}',
        '${ProbabilityBudget}', '${ConcequenceBudget}', '${MitigationBudget}', '${ReasonBudget}',
        '${ProbabilityDeliveryD}', '${ConcequenceDeliveryD}', '${MitigationDeliveryD}', '${ReasonDeliveryD}',
        '${ProbabilityCustomer}', '${ConcequenceCustomer}', '${MitigationCustomer}', '${ReasonCustomer}')`
        // console.log(sql);
        
        return sql
        // return query
      }
// }
const mysqlll = insertInDb(req);

// console.log(mysqlll);

   connection.query(mysqlll, (err, result, files, rows) => {
    if (err) {
      console.log('error query ' + err.message);
    } else {
      console.log("succes ",result)
      

    }

  })

})
module.exports = router;

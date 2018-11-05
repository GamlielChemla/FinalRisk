let express = require('express')
let mysql = require('mysql');
var bodyParser = require('body-parser')
let app = express();

const port = 5000;


let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rina3004',
    database: "risk"
  
  });
  connection.connect(function (err) {
    if (!!err) {
      console.log('error: ' + err.message);
    } else {
      console.log("connect");
  
    }
  });
  app.use(bodyParser.json())
  app.post('/second', (req, res)=> {
    
    // console.log("req",req.body)
  
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Max-Age', 86400)
    res.header('Access-Control-Allow-Headers', '*');
   
    console.log("1er");
    
   insertInDb = (req)=>{
    let ProbabilityTest=req.body[0].delayconcequence

// console.log(req.body[0].delayconcequence);

    
    let ConcequenceTest=req.body[0].delayprobability
    let MitigationTest=req.body[0].delaymitigation
    let ReasonTest=req.body[0].delayreasons
    let ProbabilityBudget=req.body[1].testconcequence
    let ConcequenceBudget=req.body[1].testprobability
    let MitigationBudget=req.body[1].testmitigation
    let ReasonBudget=req.body[1].testreasons
    let ProbabilityDeliveryD=req.body[2].budgetconcequence
    let ConcequenceDeliveryD=req.body[2].budgetprobability
    let MitigationDeliveryD=req.body[2].budgetmitigation
    let ReasonDeliveryD=req.body[2].budgetreasons
    let ProbabilityCustomer=req.body[3].customerconcequence
    let ConcequenceCustomer=req.body[3].customerprobability
    let MitigationCustomer=req.body[3].customermitigation
    let ReasonCustomer=req.body[3].customerreasons
    

    let sql = `INSERT INTO myproject.RiskManager (ProbabilityTest,ConcequenceTest,MitigationTest,ReasonTest,ProbabilityBudget,ConcequenceBudget,MitigationBudget,ReasonBudget,ProbabilityDeliveryD,ConcequenceDeliveryD,MitigationDeliveryD,ReasonDeliveryD,ProbabilityCustomer,ConcequenceCustomer,MitigationCustomer,ReasonCustomer) VALUES 
    
    ('${ProbabilityTest}', '${ConcequenceTest}', '${MitigationTest}', '${ReasonTest}',
    '${ProbabilityBudget}', '${ConcequenceBudget}', '${MitigationBudget}', '${ReasonBudget}',
    '${ProbabilityDeliveryD}', '${ConcequenceDeliveryD}', '${MitigationDeliveryD}', '${ReasonDeliveryD}',
    '${ProbabilityCustomer}', '${ConcequenceCustomer}', '${MitigationCustomer}', '${ReasonCustomer}')`
  // console.log(sql);
  
  return sql
  // return query
}
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
    app.listen(port, () => console.log(`server ${port}`))
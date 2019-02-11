let express = require('express')
let mysql = require('mysql');
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


const insertInDb = (project, keysAndValues) => {
  let sql = null
  
    
    let sqlKeys =  keysAndValues[0]      
    
    let sqlValues = keysAndValues[1]
    

   sql= `INSERT INTO ${project} (${sqlKeys}) VALUES(${sqlValues} )`

  
  return sql
}

router.post('/', async (req, res) => {

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Max-Age', 86400)
  res.header('Access-Control-Allow-Headers', '*');




  let arr = []
  await req.body.data.forEach(element => {
    arr.push({ ["probability" + element.riskName]: element.probability })
    arr.push({ ["concequence" + element.riskName]: element.concequence })
    arr.push({ ["mitigation" + element.riskName]: element.mitigation })
    arr.push({ ["reason" + element.riskName]: element.reason })

  });

  console.log("arrrrrrrr",req.body);
 


  const getKeysAndVals =  async (arr) => {
   let arrKeys = []
   let arrVals = []

      arr.forEach( (item)  =>{
        let myKey=Object.keys(item)[0]
      arrKeys.push(myKey)
      arrVals.push(`'${item[myKey]}'`)

  })

  
  
      arrKeys.push("totalRisk")
      
      arrVals.push(`'${req.body.totalRisk}'`)
    
    
    arrKeys.push("week")
    
    arrVals.push(`'${req.body.week}'`)
    


    if (req.body.risksLength >= 5 ){
      arrKeys.push("prevName1")
    
    arrVals.push(`'${req.body.data[4].prevName1}'`)

    console.log("req.body.data[4].prevName" ,req.body.data[4]);
    
    }

    console.log('arrsafa',arrVals);
    
    if (req.body.risksLength === 6 ){
    arrKeys.push("prevName2")
    
    arrVals.push(`'${req.body.data[5].prevName2}'`)
  }
  
  arrKeys.push("risksLength")
  arrVals.push(`'${req.body.risksLength}'`)
  
  arrKeys.push("lastWeek")
  arrVals.push(`'${req.body.lastWeek}'`)

  arrKeys.push("myDate")
  let myDate = `'${req.body.myDate}'`
  arrVals.push(myDate)

    arrKeys = arrKeys.join(",")
    
    arrVals = arrVals.join(",")

    return  [arrKeys, arrVals]

  }
  
  const keysAndValues = await getKeysAndVals(arr)
  
  // console.log("kkk",keysAndValues);
  
  const projectName = req.body.projectName
  
  const mysql = insertInDb(projectName,keysAndValues)

  console.log("mysql", mysql);

  connection.query(mysql, (err, result, files, rows) => {
    if (err) {
      console.log('error query  ' + err.message);
    } else {
      console.log("succes ", result)

    }
  })
})
module.exports = router;
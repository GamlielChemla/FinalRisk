let express = require('express')
let mysql = require('mysql');
var bodyParser = require('body-parser')
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

router.post('/second', (req, res) => {

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Max-Age', 86400)
  res.header('Access-Control-Allow-Headers', '*');

  console.log("req", req.body)


  let arr = []
  req.body.data.forEach(element => {
    arr.push({ ["probability" + element.riskName]: element.probability })
    arr.push({ ["concequence" + element.riskName]: element.concequence })
    arr.push({ ["mitigation" + element.riskName]: element.mitigation })
    arr.push({ ["reason" + element.riskName]: element.reason })

  });

  console.log("narr",arr);

let sqlKeys = []

for (let iterator of arr) {

  sqlKeys.push(Object.keys(iterator)[0]);
}




  //  
   
 let arrZZZ= []
 
 arr.forEach((elem) =>{
      let z = Object.values(elem)[0]
      console.log( "nananan" ,typeof z);
      
    if(z.length > 0 || z >-1 ){
      arrZZZ.push(elem)
    }
  })
  console.log("shlolo", arrZZZ);
  


  



  console.log('sqlKeys', sqlKeys);


  let sqlValues = []
  for (let iterator of arr) {

    sqlValues  = [...sqlValues, Object.values(iterator)[0] ] ;
    
    
  }

  // let Vakkkkk = sqlValues.forEach(elem =>
  //   {
  //     if ( typeof elem === 'string' || elem instanceof String){
  //       elem + ""
  //     }

  //   }
  //   )


  // console.log('sqlValuesdadadadddadadada', Vakkkkk);

  
  
  let risksLen = req.body.data.length
  
  let DataArray = req.body.data

  
  
  const avreg = (myArray, len) => {
    
    let sum = 0

    for (let i of myArray) {
      
      let probability = parseInt(i.probability)
      
      let concequence = parseInt(i.concequence)

      sum += (probability * concequence) / len 

    }
    return (sum);

  }



  let total =avreg(DataArray,risksLen)

  sqlKeys.push("total")

  sqlValues.push(total)
  






sqlKeys= sqlKeys.join(",")

sqlValues = sqlValues.join(",")

 console.log("sqlKeys", sqlKeys );

console.log("------------------");

console.log("sqlValues",sqlValues);

const projectName = req.body.projectName


const insertInDb = (project,sqlKeys,sqlValues) => {
    
  
  
  
      const  sql = `INSERT INTO ${project} (${sqlKeys}) VALUES 
      
          (${sqlValues} )`
    
    return sql
    
  }
     
    
      const mysql = insertInDb(projectName,sqlKeys,sqlValues)
       console.log("mysql",mysql);
    
    
    
      connection.query(mysql, (err, result, files, rows) => {
        if (err) {
          console.log('error query  ' + err.message);
        } else {
          console.log("succes ", result)
    
        }
      })
    
    })
  
module.exports = router;

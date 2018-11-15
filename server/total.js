let express = require('express');
let router = express.Router();
let mysql = require('mysql');
// var bodyParser = require('body-parser')



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


router.get("/version",(req,res)=>{

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Max-Age', 86400)
    res.header('Access-Control-Allow-Headers', '*');
    
    
    console.log("2em");
    
    
    // viewTotal=()=>{
    //     let version =` select total from zazaza  `
    //     return version
    // }
    // console.log("body",res.version);
    const mysqlll = viewVersion();
    
    
    connection.query(mysqlll, (err, result, files, rows) => {
        if (err) {
            console.log('error query ' + err.message);
        } else {
            console.log("succesaaaa ", result)
            res.send(result)
        }
    })
}
)

module.exports = router;

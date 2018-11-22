let express = require('express');
let router = express.Router();
let mysql = require('mysql');

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

router.get("/", (req, res) => {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Max-Age', 86400)
    res.header('Access-Control-Allow-Headers', '*');

    

    const mysqlll = `show tables`;

    connection.query(mysqlll, (err, result, files, rows) => {
        if (err) {
            console.log('error query ' + err.message);
        } else {
            console.log("succes show:", result)
            res.send(result)
        }
    })
})
        // connection.end(function(err) {
        //     if (err) {
        //       return console.log('error show:' + err.message);
        //     }
        //     console.log('Close the database connection.');
        //   });
module.exports = router;

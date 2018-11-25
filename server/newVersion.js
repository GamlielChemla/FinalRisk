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
router.get("newVersion/", (req, res) => {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Max-Age', 86400)
    res.header('Access-Control-Allow-Headers', '*');

    console.log("ppara", req.params.projectName);
    console.log("total");

    const projectName = req.params.projectName

     viewTotal = (project) => {
        let version = ` SELECT Total FROM ${project} WHERE version = (SELECT MAX (version) FROM  ${project} )`
        return version
    }
    const mysqlll = viewTotal(projectName);

    connection.query(mysqlll, (err, result, files, rows) => {
        if (err) {
            console.log('error query total ' + err.message);
        } else {
            if (typeof result !== 'undefined' && result.length > 0) {
                console.log("succesTotal :", result)
                res.send(result)
            }
        }
    })
    // connection.end(function(err) {
    //     if (err) {
    //       return console.log('error:' + err.message);
    //     }
    //     console.log('Close the database connection.');
    //   });
})
module.exports = router;

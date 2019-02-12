let express = require('express');
let router = express.Router();
let mysql = require('mysql');

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

router.get("/", (req, res) => {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Max-Age', 86400)
    res.header('Access-Control-Allow-Headers', '*');

    console.log("1er");

    const mysqlll = `show tables`;

    connection.query(mysqlll, (err, result, files, rows) => {
        if (err) {
            console.log('error query ' + err.message);
        } else {
            console.log("succesaaaa ", result)
            res.send(result)
        }
    })
    // connection.end()
}
)
module.exports = router;
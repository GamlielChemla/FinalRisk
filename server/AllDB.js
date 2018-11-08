let express = require('express');
let router = express.Router();
let mysql = require('mysql');
// var bodyParser = require('body-parser')
// let app = express();

// const port = 6000;


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
// app.use(bodyParser.json())

router.get("/AllDB", (req, res) => {


    console.log("res", res.body)

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Max-Age', 86400)
    res.header('Access-Control-Allow-Headers', '*');

    console.log("1er");


    insertInDb = (res) => {



        let table = `show tables`
        return table

    }
    // console.log(sendProject);
    const mysqlll = insertInDb(res);
    // console.log(mysqlll);

    connection.query(mysqlll, (err, result, files, rows) => {
        if (err) {
            console.log('error query ' + err.message);
        } else {
            console.log("succes ", result)
            res.send(result)
        }
    })
}
)
module.exports = router;
    // app.listen(port, () => console.log(`server ${port}`))
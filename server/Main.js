const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const AllDB = require('./AllDB')
const second = require('./seconserver')
const first = require('./CreateDB')


app.use(bodyParser.json())


app.use('/',AllDB)
app.use('/',second)
app.use('/',first)





const port = 4000;

app.listen(port, () => console.log(`server ${port}`))
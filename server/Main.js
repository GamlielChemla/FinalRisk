const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const AllDB = require('./AllDB')
const second = require('./seconserver')
const first = require('./CreateDB')
const total = require('./total')


app.use(bodyParser.json())


app.use('/',AllDB)
app.use('/',second)
app.use('/',first)
app.use('/',total)





const port = 4000;

app.listen(port, () => console.log(`server ${port}`))
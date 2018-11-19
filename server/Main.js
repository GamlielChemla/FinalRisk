const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const AllDB = require('./AllDB')
const second = require('./seconserver')
const createDB = require('./CreateDB')
const total = require('./total')
const del = require('./delete')


app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:true}));


app.use('/AllDB', AllDB)
app.use('/second', second)
app.use('/createDB', createDB)
app.use('/del', del)
app.use('/', total)


const port = 4000;

app.listen(port, () => console.log(`server ${port}`))
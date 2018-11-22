const express = require('express')
const bodyParser = require('body-parser')
const app = express();

const AllDB = require('./AllDB')
const second = require('./seconserver')
const createDB = require('./CreateDB')
const total = require('./total')
const del = require('./delete')
const allVersion = require('./allVersion')
const getLastWeek = require('./getLastWeek')


app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:true}));


app.use('/AllDB', AllDB)
app.use('/second', second)
app.use('/createDB', createDB)
app.use('/del', del)
app.use('/', total)
app.use('/allVersion', allVersion)
app.use('/', getLastWeek)


const port = 4000;

app.listen(port, () => console.log(`server ${port}`))
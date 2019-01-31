const express = require('express')
const bodyParser = require('body-parser')
const app = express();


const AllDB = require('./AllDB')
const second = require('./seconserver')
const createDB = require('./CreateDB')
const total = require('./total')
const del = require('./delete')
const allVersion = require('./allVersion')
const getCurrentWeek = require('./getCurrentWeek')
const getLastWeek = require('./getLastWeek')
const getNextWeek = require('./getNextWeek')

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:true}));
app.use(function (req, res, next) {


        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', '*');
    
        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    
        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    
        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);
    
        // Pass to next layer of middleware
        next();
    });


app.use('/AllDB', AllDB)
app.use('/second', second)
app.use('/createDB', createDB)
app.use('/del', del)
app.use('/', total)
app.use('/allVersion', allVersion)
app.use('/', getCurrentWeek)
app.use('/', getLastWeek)
app.use('/', getNextWeek)



const port = 4000;

app.listen(port, () => console.log(`server ${port}`))
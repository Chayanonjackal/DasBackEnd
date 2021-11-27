const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

//pare application json and urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Database connection 
const conn = mysql.createConnection({
    host: 'localhost' ,
    user: 'root' ,
    password: 'root'
})
conn.connect(function (err){
    if(err) throw err ;
    console.log("Connecting server");
})

//middle ware
const auth = require('./middleWare/auth');
app.use(require('./middleWare/logger'))

//api rounte
const User = require('./Routes/UserRoute');
app.use('/user',User)

const PrivatePrediction = require('./Routes/PrivatePredictionRoute');
app.use('/privateprediction',PrivatePrediction)

app.use('/auth',auth,(req,res)=>{
    return res.json("u data in server")
})




app.listen(5000, () => console.log("Server start port : 5000"));
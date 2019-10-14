const { Client } = require('pg');
var PORT = process.env.PORT || 5000;
const express = require('express');
const app= express(); 
 var mysql = require('mysql');

const connectionString ="postgres://fsbwgzmnacwpuu:55aaef65006a372dcd554e4684000cd2c4f33ab81e109fc0453d2af923dd1f30@ec2-46-137-187-23.eu-west-1.compute.amazonaws.com:5432/d5rkhjs6aff4ep";//process.env.MY_DB;
const client = new Client({
    connectionString: connectionString  
});
client.connect();

app.get('/',(req,res)=>{    
    res.writeHead(200,{'Content-Type':'application/json'}); 
    let sql='select *from student';
    let query = client.query(sql,(err,results)=>{
        if(err)throw err;
        res.end(JSON.stringify(results.rows)); 
    })
})

app.listen(process.env.PORT || 9000,() =>{
    console.log('server on port 9000')
})
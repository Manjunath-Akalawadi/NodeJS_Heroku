const { Client } = require('pg');
var PORT = process.env.PORT || 5000;
const express = require('express');
const app= express(); 
 var mysql = require('mysql');
//  var con = mysql.createConnection({
//      host: "localhost",
//      user: "root",
//      password: "",
//      database: "nodejs"
//  });

const connectionString ="postgres://zfbpinnpacsqse:96452ca65de4202428ce2ebfb4bb1a1468d900313ed59abeb2a45ed6e20a6419@ec2-54-83-55-122.compute-1.amazonaws.com:5432/dddusatmedpfl3";//process.env.MY_DB;
const client = new Client({
    connectionString: connectionString  
});
client.connect();

app.get('/',(req,res)=>{    
    res.writeHead(200,{'Content-Type':'application/json'}); 
    let sql='select *from mydatas';
    let query = client.query(sql,(err,results)=>{
        if(err)throw err;
        res.end(JSON.stringify(results.rows)); 
    })
})
//this function is used to add with parameters
app.get('/temperatures/add',(req,res)=>{
    const {_email,_firstname,_id,_lastname,_reg_date}=req.query;
    const instertemperature =`insert into mydatas (email, firstname,id,lastname, reg_date) values('${_email}','${_firstname}','${_id}','${_lastname}','${_reg_date}')`;
        client.query(instertemperature,(err,results)=>{
            if (err){
            return res.send(err);
            }
            else{
                return res.send('user added successfully')
            }
        });
    });
app.listen(process.env.PORT || 9000,() =>{
    console.log('server on port 9000')
})
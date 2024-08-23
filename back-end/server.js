const mysql = require('mysql')
const express= require('express')
const cors=require('cors')

const app=express();
app.use(cors());
app.use(express.json());


const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Str0ng!Password",
    database:"nodejss"
})

app.post("/Signup", (req, res)=>{
const sql="insert into login (`name`,`email`,`password`) values (?)"

const values=[
    req.body.name,
    req.body.email,
    req.body.password
]

db.query(sql, [values], (error,data)=>{
  
    if(error){
        return res.json("Error");
    }
    return res.json(data);
})
})



app.post("/login", (req, res)=>{
    const sql="select * from login where `email`=? AND `password`= ?";
    
    db.query(sql, [req.body.email, req.body.password], (err,data)=>{
      
        if(err){
            return res.json("Error");
        }
        if(data.length > 0 ){
            return res.json("success")
        }else{
            return res.json("failed")
        }
    })
    })
    


app.listen(8081, ()=>{
    console.log("Listenening......");
})
const express = require("express");
const { body, validationResult } = require("express-validator");
const helmet = require("helmet");
const mysql = require('mysql2');
const cors = require("cors");

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "9437615820a",
  database: "createaccount",
});

//user.js

app.post("/create-account", (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const userName = req.body.userName;
  const password = req.body.password;
  const repPassword = req.body.repPassword;

  db.query(
    "INSERT INTO users (firstName, lastName, userName, password, repPassword) VALUES (?,?,?,?,?)",
    [firstName, lastName, userName, password, repPassword],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.post('/login-page', (req, res)=>{

  const userName = req.body.userNameLog;
  const password = req.body.passwordLog;

  db.query(
    "SELECT * FROM users WHERE userName = ? AND password = ?",
    [userName, password],
    (err, result) => {
      if (err) {
        res.send({err:err});
      }
        if(result.length >0){
          res.send(result)
        }else{
          res.send({message: "نام کاربری یا رمز عبور اشتباه است"})
        }
    }
  );
});


//get all users

app.get("/users", (req, res)=>{
  db.query("SELECT * FROM users",
  (err, result)=>{
    if(err){
      console.log(err)
    }else {
      res.send(result)
    }
  }
  )
});

//profile user.js

// app.get("/profile/:id", async(req, res)=>{
//   const id =req.params.id;

//   const basicInfo =await Users.findByPk(id, {attributes: {exclude: ['password']},
// });
// res.json(basicInfo)
// })


app.put('/update' , (req, res)=>{
  const id = req.body.id
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const userName = req.body.userName;
  const password = req.body.password;

  db.query("UPDATE users SET firstName = ? AND lastName = ? AND userName = ? AND password = ?  WHERE id = ?",
  [firstName, lastName, userName, password, id],
  (err, result)=>{
    if(err){
      console.log(err)
    }else{
      res.send(result)
    }

  }
  )
})



app.listen(3001, () => {
  console.log("running server");
});

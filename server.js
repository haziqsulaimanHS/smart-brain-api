const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register");
const signIn = require("./controllers/signIn");
const profile = require("./controllers/profile");
const image = require("./controllers/image");


// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());


const db = knex({
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      port: 5432,
      user: 'apple',
      password: '',
      database: 'smart-brain',
    },
  });



app.get("/", (req, res)=>{res.send("its working");})

app.post("/signIn", (req, res) => {signIn.handleSignIn(req, res, bcrypt, db)})

app.post("/register", (req,res) => {register.handleRegister(req, res, bcrypt, db)})

app.get("/profile/:id", (req,res) => {profile.handleProfile(req, res, db)})

app.put("/image", (req, res) => {image.handleImage(req, res, db)});
  
  
  
  


app.listen(3001, ()=>{
    console.log("App is running on port 3000");
})
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "23Sneha*10",
    database: "users_schema"
});

//work with client side application follows 3 steps

app.use(cors()); // used for  access backend api's in react
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true}));

//get all the users data

app.get("/api/get", (req,res) =>{
    const sqlGet = "SELECT * FROM users_db";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    });
});

//create and  post the  users data

app.post("/api/post", (req,res) => {
    const {Name, LicenseNumber, BirthDate, Age} = req.body;
    const sqlInsert = 
    "INSERT INTO users_db (Name, LicenseNumber, BirthDate, Age) VALUES (?, ?, ?, ?)";
    db.query(sqlInsert, [Name, LicenseNumber, BirthDate, Age], (error, result) => {   //pass the data in array
        if(error) {
            console.log(error);
        }
    });
});

//delete a selected data

app.delete("/api/remove/:id", (req,res) => {
    const { id } = req.params;
    const sqlRemove = 
    "DELETE FROM users_db WHERE id = ?";
    db.query(sqlRemove, id , (error, result) => {
        if(error) {
            console.log(error);
        }
    });
});

// getting a selected data using id

app.get("/api/get/:id", (req,res) =>{
    const {id} = req.params;
    const sqlGet = "SELECT * FROM users_db WHERE id = ?";
    db.query(sqlGet, id, (error, result) => {
        if(error) {
            console.log(error);
        }
        res.send(result);
    });
});

//update a user data using id

app.put("/api/update/:id", (req,res) =>{
    const {id} = req.params;
    const {Name, LicenseNumber, BirthDate, Age} = req.body;
    const sqlUpdate = "UPDATE users_db SET Name = ?, LicenseNumber = ?, BirthDate = ?, Age = ? WHERE id = ?";
    db.query(sqlUpdate, [Name, LicenseNumber, BirthDate, Age, id], (error, result) => {
        if(error) {
            console.log(error);
        }
        res.send(result);
    });
});

app.get("/", (req,res)=>{
 //   const sqlInsert =
 //    "INSERT INTO users_db (Name, LicenseNumber, BirthDate, Age) VALUES ('shailu', '1765937', '1999-09-20', 25)";
//  db.query(sqlInsert, (err, result) =>{
//        console.log("error", err);
//        console.log("result", result);
//        res.send("hellow...");
//    });
    
});

app.listen(5000, ()=>{
    console.log("server is running");
})
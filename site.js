const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose")
const bodyparser = require("body-parser")
const port = 80;

main().catch(err => console.log(err));

async function main() {
  mongoose.connect('mongodb://127.0.0.1:27017/test');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// Creating Schema
const contactSchema = new mongoose.Schema({
    myName: String,
    myNumber: String,
    myEmail: String,
    myAddress: String,
    myInfo: String
  });

const Contact = mongoose.model('Contact', contactSchema);

// Express Specific Stuff
// For Static Files
app.use("/static", express.static("static"));
app.use(express.urlencoded());

// Pug Specific Stuff
// Set Pug Engine
app.set("view engine", "pug");

// Set view Directory
app.set("views", path.join(__dirname, "template"));

// Endpoints
app.get("/", (req,res) => {
    res.status(200).render("home.pug");
})

app.get("/contact", (req,res) => {
    res.status(200).render("./contact.pug")
})

app.post("/contact", (req,res) => {
    const myData = new Contact(req.body);
    myData.save().then(() => {
        res.status(400).send("Your Form has been Submitted Successfully")
    }).catch(() => {
        res.status(400).send("Your Form Has not been Submitted Successfully")
    })
})

// Listening to server
app.listen(port, () => {
    console.log(`Listening to port ${port}`);
})
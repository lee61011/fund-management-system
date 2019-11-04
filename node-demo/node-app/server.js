const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

const users = require("./routes/api/users");

app.use("/api/users", users);
//  使用 body-parser 中间件
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const db = require("./config/keys").mongoURI;   //  DB config
mongoose.connect(db)
    .then(() => console.log("Mongodb Connected"))
    .catch(err => console.log(err))

app.get("/",(req,res) => {
    res.send("Hello World!")
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
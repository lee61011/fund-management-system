const express = require("express");
const mongoose = require("mongoose");
const app = express();

const users = require("./routes/api/users");

app.use("/api/users", users);

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
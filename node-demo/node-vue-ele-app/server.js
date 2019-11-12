const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();

const users = require("./routes/api/users");
const profiles = require("./routes/api/profiles");

app.use("/api/users", users);
app.use("/api/profiles", profiles);
//  使用 body-parser 中间件
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const db = require("./config/keys").mongoURI;   //  DB config
mongoose.connect(db)
    .then(() => console.log("Mongodb Connected"))
    .catch(err => console.log(err))

//  passport 初始化
app.use(passport.initialize());
require("./config/passport")(passport);

app.get("/",(req,res) => {
    res.send("Hello World!")
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
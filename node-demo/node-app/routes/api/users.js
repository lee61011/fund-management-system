const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../../models/User");

router.get("/test", (req, res) => {
    res.json({msg: "login works"})
})

router.post("/register", (req, res) => {
    //  console.log(req.body);
    //  查询数据库中是否拥有邮箱
    User.findOne({email: req.body.email})
        .then((user) => {
            if (user) {
                return res.status(400).json({email: "邮箱已被注册!"});
            } else {
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password
                })

                //  密码加密
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;

                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    })
                })
            }
        })
})

module.exports = router;
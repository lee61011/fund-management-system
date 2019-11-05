const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../../models/User");
const gravatar = require("gravatar");

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
    
                const avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});  //  设置头像
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

//  $route  POST    api/users/login
//  @desc   返回 token jwt passport
//  @access public
router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    //  查询数据库
    User.findOne({email})
        .then(user => {
            if (!user) {
                return res.status(404).json({email: "用户不存在!"});
            }

            //  密码匹配
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        res.json({msg: "success"}); //  登录成功，将来返回一个 token
                    } else {
                        return res.status(400).json({password: "密码错误!"})
                    }
                })
        })
})

module.exports = router;
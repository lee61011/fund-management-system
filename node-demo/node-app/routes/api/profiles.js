const express = require("express");
const router = express.Router();
const passport = require("passport");

const Profile = require('../../models/Profile');

router.get("/test", (req, res) => {
    res.json({ msg: "profile works" })
})

module.exports = router;
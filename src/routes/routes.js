var express = require("express");

var router = express.Router();
var users = require("../mock/users.json");

router.get("/", function(req, res) {
    res.send(users);
});

router.post("/add", function(req, res) {
    res.send("User added successfully");
})

module.exports = router;
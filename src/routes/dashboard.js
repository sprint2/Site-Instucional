var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");


router.post("/dashboard/listar", function (req, res) {
    dashboardController.listar(req, res);
    console.log("to na rota")
})

module.exports = router;
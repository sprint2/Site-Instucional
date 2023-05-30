var express = require("express");
var router = express.Router();

var graficosController = require("../controllers/graficosController");

router.get("/", function(req, res) {
   graficosController.testar(req, res);
})

router.get("/listarMes", function(req, res) {
   graficosController.listarMes(req, res);
})

module.exports = router;
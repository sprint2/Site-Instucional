var express = require("express");
var router = express.Router();

var graficosController = require("../controllers/graficosController");

router.get("/", function(req, res) {
   graficosController.testar(req, res);
})

router.get("/listarPie/:idEmpresa", function(req, res) {
   graficosController.listarPie(req, res);
})

router.get("/listarLine8/:idEmpresa", function(req, res) {
   graficosController.listarLine8(req, res);
})

router.get("/listarLineUmid/:idEmpresa", function(req, res) {
   graficosController.listarLineUmid(req, res);
})

router.get("/listarLineTemp/:idEmpresa", function(req, res) {
   graficosController.listarLineTemp(req, res);
})

router.get("/listarMes", function(req, res) {
   graficosController.listarMes(req, res);
})

router.get("/listarUltimoMes/:idEmpresa", function(req, res) {
   graficosController.listarUltimoMes(req, res);
})

router.get("/listarPenultimoMes/:idEmpresa", function(req, res) {
   graficosController.listarPenultimoMes(req, res);
})

router.get("/listarAntepenultimoMes/:idEmpresa", function(req, res) {
   graficosController.listarAntepenultimoMes(req, res);
})

router.get("/listarQuartoMes/:idEmpresa", function (req, res) {
   graficosController.listarQuartoMes(req, res);
})

module.exports = router;
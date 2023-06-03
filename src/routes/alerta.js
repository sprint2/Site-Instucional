var express = require("express");
var router = express.Router();

var alertaController = require("../controllers/alertaController");

router.get("/listarAlertas/:idEmpresa", function (req, res) {
    alertaController.listarAlertas(req, res);
});

router.get("/listarAlertasRecentes/:idEmpresa", function (req, res) {
    alertaController.listarAlertasRecentes(req, res);
});

router.get("/listarQtdAlertas/:idEmpresa", function (req, res) {
    alertaController.listarQtdAlertas(req, res);
});

router.get("/atualizarAlerta/:idAlerta", function (req, res) {
    alertaController.atualizarAlerta(req, res);
});

module.exports = router;
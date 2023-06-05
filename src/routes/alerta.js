var express = require("express");
var router = express.Router();

var alertaController = require("../controllers/alertaController");

router.get("/listarAlertas/:idEmpresa", function (req, res) {
    alertaController.listarAlertas(req, res);
});

router.get("/listarAlertasArm/:idArmazem", function (req, res) {
    alertaController.listarAlertasArm(req, res);
});

router.get("/listarAlertasRecentes/:idEmpresa", function (req, res) {
    alertaController.listarAlertasRecentes(req, res);
});

router.get("/listarAlertasRecentesArm/:idArmazem", function (req, res) {
    alertaController.listarAlertasRecentesArm(req, res);
});

router.get("/listarQtdAlertas/:idEmpresa", function (req, res) {
    alertaController.listarQtdAlertas(req, res);
});

router.get("/listarQtdAlertasArm/:idArmazem", function (req, res) {
    alertaController.listarQtdAlertasArm(req, res);
});

router.get("/atualizarAlerta/:idAlerta", function (req, res) {
    alertaController.atualizarAlerta(req, res);
});

router.post("/cadastrarAlerta/:idEmpresa", function (req, res) {
    alertaController.cadastrarAlerta(req, res);
});

module.exports = router;
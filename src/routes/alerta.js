var express = require("express");
var router = express.Router();

var alertaController = require("../controllers/alertaController");

router.get("/listarAlertas/:idEmpresa", function (req, res) {
    alertaController.listarAlertas(req, res);
});

router.get("/listarAlertasRecentes/:idEmpresa", function (req, res) {
    alertaController.listarAlertasRecentes(req, res);
});

module.exports = router;
var express = require("express");
var router = express.Router();

var armazemController = require("../controllers/armazemController");

router.get("/listar/:idEmpresa", function(req, res) {
   armazemController.listar(req, res);
});

router.get("/listarAlertasMesArm/:idEmpresa/:idArmazem", function(req, res) {
   armazemController.listarAlertasMesArm(req, res);
});

router.get("/listarAlertasMesEmp/:idEmpresa", function(req, res) {
   armazemController.listarAlertasMesEmp(req, res);
});

router.get("/listarMaxAlertas/:idEmpresa", function(req, res) {
   armazemController.listarMaxAlertas(req, res);
});


module.exports = router;
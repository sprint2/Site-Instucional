var armazemModel = require("../models/armazemModel");

function listar(req, res) {
  var idEmpresa = req.params.idEmpresa;

  armazemModel.listar(idEmpresa)
    .then(function (resultado) {
      if (resultado.length > 0) {
        console.log("e aqui")
        res.status(200).json(resultado);
        console.log("entramos" + resultado.length)
      } else {
        res.status(204).send("Nenhum resultado encontrado!")
      }
    })
    .catch(function (resultado) {
      console.log("\nHouve um erro ao buscar resultados");
    })
}

function listarAlertasMesArm(req, res) {
  var idEmpresa = req.params.idEmpresa;
  var idArmazem = req.params.idArmazem;

  armazemModel.listarAlertasMesArm(idEmpresa, idArmazem)
    .then(function (resultado) {
      if (resultado.length > 0) {
        console.log("e aqui")
        res.status(200).json(resultado);
        console.log("entramos" + resultado.length)
      } else {
        res.status(204).send("Nenhum resultado encontrado!")
      }
    })
    .catch(function (resultado) {
      console.log("\nHouve um erro ao buscar resultados");
    })
}

function listarAlertasMesEmp(req, res) {
  var idEmpresa = req.params.idEmpresa;

  armazemModel.listarAlertasMesEmp(idEmpresa)
    .then(function (resultado) {
      if (resultado.length > 0) {
        console.log("e aqui")
        res.status(200).json(resultado);
        console.log("entramos" + resultado.length)
      } else {
        res.status(204).send("Nenhum resultado encontrado!")
      }
    })
    .catch(function (resultado) {
      console.log("\nHouve um erro ao buscar resultados");
    })
}

function listarMaxAlertas(req, res) {
  var idEmpresa = req.params.idEmpresa;

  armazemModel.listarMaxAlertas(idEmpresa)
    .then(function (resultado) {
      if (resultado.length > 0) {
        console.log("e aqui")
        res.status(200).json(resultado);
        console.log("entramos" + resultado.length)
      } else {
        res.status(204).send("Nenhum resultado encontrado!")
      }
    })
    .catch(function (resultado) {
      console.log("\nHouve um erro ao buscar resultados");
    })
}

module.exports = {
  listar,
  listarAlertasMesArm,
  listarAlertasMesEmp,
  listarMaxAlertas,
}
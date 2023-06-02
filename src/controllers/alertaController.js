var alertaModel = require("../models/alertaModel");

var sessoes = [];

function listarAlertas(req, res) {
  var idEmpresa = req.params.idEmpresa;

  alertaModel
    .listarAlertas(idEmpresa)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "Houve um erro ao realizar a consulta! Erro: ",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}

function listarAlertasRecentes(req, res) {
  var idEmpresa = req.params.idEmpresa;

  alertaModel
    .listarAlertasRecentes(idEmpresa)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "Houve um erro ao realizar a consulta! Erro: ",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });

}

function listarQtdAlertas(req, res) {
  var idEmpresa = req.params.idEmpresa;

  alertaModel
    .listarQtdAlertas(idEmpresa)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "Houve um erro ao realizar a consulta! Erro: ",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}

function cadastrarAlerta(req, res) {
  var nivel = req.body.nivelServer;
  var tipo = req.body.tipoServer;
  var dataAlerta = req.body.dataAlertaServer;

  empresaModel
    .cadastrar(nivel, tipo, dataAlerta)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "\nHouve um erro ao cadastrar alerta! Erro: ",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  listarAlertas,
  listarAlertasRecentes,
  listarQtdAlertas
}



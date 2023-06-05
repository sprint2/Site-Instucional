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

// armazem
function listarAlertasArm(req, res) {
  var idArmazem = req.params.idArmazem;

  alertaModel
    .listarAlertasArm(idArmazem)
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

function listarAlertasRecentesArm(req, res) {
  var idArmazem = req.params.idArmazem;

  alertaModel
    .listarAlertasRecentesArm(idArmazem)
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

function listarQtdAlertasArm(req, res) {
  var idArmazem = req.params.idArmazem;

  alertaModel
    .listarQtdAlertasArm(idArmazem)
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
  var nivel = req.body.nivel;
  var tipo = req.body.tipo;
  var medida = req.body.medida;
  var idSensor = req.body.idSensor;

  alertaModel
    .cadastrarAlerta(nivel, tipo, medida, idSensor)
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

function atualizarAlerta(req, res) {
  var idAlerta = req.params.idAlerta;

  alertaModel
    .atualizarAlerta(idAlerta)
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

module.exports = {
  listarAlertas,
  listarAlertasArm,
  listarAlertasRecentes,
  listarAlertasRecentesArm,
  listarQtdAlertas,
  listarQtdAlertasArm,
  atualizarAlerta,
  cadastrarAlerta
}



var dashboardModel = require("../models/graficosModel");

var sessoes = [];

function testar(req, res) {
  console.log("ENTRAMOS NA empresaController");
  res.json("ESTAMOS FUNCIONANDO!");
}

function listarMes(req, res) {
  var idEmpresa = req.body.idEmpresaServer;
  dashboardModel.listarMes(idEmpresa)
    .then(function (resposta) {
      console.log("Resultados encontrados: " + resposta.length);
      console.log("Resultados: " + JSON.stringify(resultado));
      res.json(resposta)
    })
    .catch(function (resposta) {
      console.log("\nHouve um erro ao buscar resultados")
    });
}

function listarUltimoMes(req, res) {
  var idEmpresa = req.params.idEmpresa;

  dashboardModel.listarUltimoMes(idEmpresa)
    .then(
      function (resultado) {
        if (resultado.length > 0) {
          console.log("e aqui")
          res.status(200).json(resultado);
        } else {
          res.status(204).send("Nenhum resultado encontrado!")
        }
      })
    .catch(function (resultado) {
      console.log("\nHouve um erro ao buscar resultados (último mês)");
    })
}

function listarPenultimoMes(req, res) {
  var idEmpresa = req.params.idEmpresa;

  dashboardModel.listarPenultimoMes(idEmpresa)
    .then(
      function (resultado) {
        if (resultado.length > 0) {
          console.log("e aqui")
          res.status(200).json(resultado);
        } else {
          res.status(204).send("Nenhum resultado encontrado!")
        }
      })
    .catch(function (resultado) {
      console.log("\nHouve um erro ao buscar resultados (penúltimo mês)");
    })
}

function listarAntepenultimoMes(req, res) {
  var idEmpresa = req.params.idEmpresa;

  dashboardModel.listarAntepenultimoMes(idEmpresa)
    .then(
      function (resultado) {
        if (resultado.length > 0) {
          console.log("e aqui")
          res.status(200).json(resultado);
        } else {
          res.status(204).send("Nenhum resultado encontrado!")
        }
      })
    .catch(function (resultado) {
      console.log("\nHouve um erro ao buscar resultados (antepenultimo mês)");
    })
}


function listarQuartoMes(req, res) {
  var idEmpresa = req.params.idEmpresa;

  dashboardModel.listarQuartoMes(idEmpresa)
    .then(
      function (resultado) {
        if (resultado.length > 0) {
          console.log("e aqui")
          res.status(200).json(resultado);
        } else {
          res.status(204).send("Nenhum resultado encontrado!")
        }
      })
    .catch(function (resultado) {
      console.log("\nHouve um erro ao buscar resultados (quarto mês)");
    })
}

function listarPie(req, res) {
  var idEmpresa = req.params.idEmpresa;

  dashboardModel.listarPie(idEmpresa).then(function (resultado) {
    if (resultado.length > 0) {
      console.log("e aqui")
      res.status(200).json(resultado);
      console.log("entramos" + resultado.length)
    } else {
      res.status(204).send("Nenhum resultado encontrado!")
    }
  })
  .catch(function (resultado) {
    console.log("\nHouve um erro ao buscar resultados (pie)");
  })

}

function listarLine8(req, res) {
  var idEmpresa = req.params.idEmpresa;

  dashboardModel.listarLine8(idEmpresa).then(function (resultado) {
    if (resultado.length > 0) {
      console.log("e aqui")
      res.status(200).json(resultado);
      console.log("entramos" + resultado.length)
    } else {
      res.status(204).send("Nenhum resultado encontrado!")
    }
  })
  .catch(function (resultado) {
    console.log("\nHouve um erro ao buscar resultados (pie)");
  })

}

function listarLineUmid(req, res) {
  var idEmpresa = req.params.idEmpresa;

  dashboardModel.listarLineUmid(idEmpresa).then(function (resultado) {
    if (resultado.length > 0) {
      console.log("e aqui")
      res.status(200).json(resultado);
      console.log("entramos" + resultado.length)
    } else {
      res.status(204).send("Nenhum resultado encontrado!")
    }
  })
  .catch(function (resultado) {
    console.log("\nHouve um erro ao buscar resultados (pie)");
  })

}

module.exports = {
  testar,
  listarLine8,
  listarPie,
  listarMes,
  listarUltimoMes,
  listarPenultimoMes,
  listarAntepenultimoMes,
  listarQuartoMes
};
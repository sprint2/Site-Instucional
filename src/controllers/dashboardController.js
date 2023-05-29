var dashboardModel = require("../models/dashboardModel");

var sessoes = [];


function listar(req, res) {
    var idEmpresa = req.body.idEmpresaServer;
    var idUsuario = req.body.idUsuarioServer;
    var idArmazem = req.body.idArmazemServer;
  
    if (idEmpresa == undefined) {
      res.status(400).send("Seu idEmpresa está undefined!");
    } else if (idUsuario == undefined) {
      res.status(400).send("Sua idUsuario está indefinida!");
    } else {
      dashboardModel
        .listar(idEmpresa, idUsuario, idArmazem)
        .then(function (resultado) {
          console.log(`\nResultados encontrados: ${resultado.length}`);
          console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String
  
          if (resultado.length != 0) {
            console.log(resultado);
            res.json(resultado[0]);
          } else if (resultado.length == 0) {
            res.status(403).send("idEmpresa e/ou senha inválido(s)");
          } else {
            res.status(403).send("Mais de um usuário com o mesmo login e senha!");
          }
        })
        .catch(function (erro) {
          console.log(erro);
          console.log(
            "\nHouve um erro ao realizar o login! Erro: ",
            erro.sqlMessage
          );
          res.status(500).json(erro.sqlMessage);
        });
    }
  }
  
  module.exports = {
    listar
  };
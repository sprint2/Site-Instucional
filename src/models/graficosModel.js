var database = require("../database/config");

function listar(idEmpresa, idUsuario, idArmazem) {
    console.log(
      "ACESSEI O empresa MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
      email,
      senha
    );
    var instrucao = `
    SELECT
     sum(aviso.tipo = 'temperatura') as avisoTemp,
     sum(aviso.tipo = 'umidade')  as avisoUmidade,
     empresa.idEmpresa as idEmpresa,
     empresa.nome as "Nome da Empresa"  
    FROM
    aviso
    join armazem on aviso.fkArmazemAviso = armazem.idArmazem
    join empresa on armazem.fkEmpresa = empresa.idEmpresa  
		where idArmazem = ${idArmazem} and
    dataAviso >= DATE_SUB(now(), INTERVAL 8 WEEK);

      `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarMes(idEmpresa) {
  var instrucao = `
  SELECT
    tipo AS tipoAlerta,
    COUNT(idAlerta) AS quantidade
  FROM
    alerta
  JOIN sensor ON fkSensor = idSensor
  JOIN armazem ON fkArmazem = idArmazem
  JOIN empresa ON fkEmpresa = idEmpresa
  WHERE
    MONTH(dataAlerta) = MONTH(NOW()) AND idEmpresa = 1
  GROUP BY
    tipoAlerta;
  `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

module.exports = {
  listar,
  listarMes,
};
  
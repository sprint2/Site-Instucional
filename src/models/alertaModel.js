var database = require("../database/config");

function listarAlertas() {
  console.log(
    "ACESSEI O EMPRESA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarAlertas()"
  );
  var instrucao = `
    select * from alerta
	order by dataAlerta limit 10
    `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function listarAlertasRecentes(idEmpresa) {
  var instrucao = `
  SELECT
    tipo, nivel, (date_format(alerta.dataAlerta, "%d/%m/%y")) as data_alerta, date_format(dataAlerta, "%h:%m") as hora_alerta, idArmazem 
  FROM
    alerta 
  JOIN sensor ON fkSensorAlerta = idSensor
  JOIN armazem ON fkArmazem = idArmazem
  JOIN empresa ON fkEmpresa = idEmpresa
  WHERE
    dataAlerta >= DATE_SUB(now(), interval 1 month) AND idEmpresa = ${idEmpresa}
  ORDER BY
    dataAlerta 
  DESC LIMIT 3;

    `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function listarQtdAlertas(idEmpresa) {
  var instrucao  = `
  SELECT 
    COUNT(idAlerta) as qtd_alertas
  FROM
    alerta
  JOIN sensor ON fkSensorAlerta = idSensor
  JOIN armazem ON fkArmazem = idArmazem
  JOIN empresa ON fkEmpresa = idEmpresa
  WHERE 
    idEmpresa = 1 AND
    idArmazem = 1 AND
    dataAlerta >= DATE_SUB(NOW(), INTERVAL 1 MONTH);
  `;

  console.log('Executando a instrução SQL: \n' +instrucao);
  return database.executar(instrucao);
}

function cadastrarAlerta(nivel, tipo) {
  console.log(
    "ACESSEI O alerta MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarAlerta()",
    nivel,
    tipo
  );

  var instrucao = ` insert into alerta (tipo, nivel, dataAlerta) values ('${tipo}', '${nivel}', now());
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
  
}

module.exports = {
  listarAlertas,
  listarAlertasRecentes,
  cadastrarAlerta,
  listarQtdAlertas
};
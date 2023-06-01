var database = require("../database/config");

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

function listarUltimoMes(idEmpresa) {
  var instrucao = `
  SELECT
	  tipo, 
	  COUNT(idAlerta) as registros
  FROM 
	  alerta
  JOIN sensor ON fkSensorAlerta = idSensor
  JOIN armazem ON fkArmazem = idArmazem
  JOIN empresa ON fkEmpresa = idEmpresa
  WHERE
	MONTH(dataAlerta) >= MONTH(DATE_SUB(NOW(), INTERVAL 1 MONTH)) AND
    idEmpresa = ${idEmpresa}
  GROUP BY tipo;
  `;

  console.log("Executando a instrução SQL: \n" + instrucao)
  return database.executar(instrucao);
}

function listarPenultimoMes(idEmpresa) {
  var instrucao = `
    SELECT
	    tipo, 
	    COUNT(idAlerta) as registros
    FROM 
	    alerta
    JOIN sensor ON fkSensorAlerta = idSensor
    JOIN armazem ON fkArmazem = idArmazem
    JOIN empresa ON fkEmpresa = idEmpresa
    WHERE
	  MONTH(dataAlerta) <= MONTH(DATE_SUB(NOW(), INTERVAL 1 MONTH)) AND 
      dataAlerta >= MONTH(DATE_SUB(NOW(), INTERVAL 2 MONTH)) AND
      idEmpresa = ${idEmpresa}
    GROUP BY tipo;
  `;

  console.log("Executando a instrução SQL: " + instrucao)
  return database.executar(instrucao);
}

function listarAntepenultimoMes(idEmpresa) {
  var instrucao = `
    SELECT
	    tipo, 
	    COUNT(idAlerta) as registros
    FROM 
	    alerta
    JOIN sensor ON fkSensorAlerta = idSensor
    JOIN armazem ON fkArmazem = idArmazem
    JOIN empresa ON fkEmpresa = idEmpresa
    WHERE
	  MONTH(dataAlerta) <= MONTH(DATE_SUB(NOW(), INTERVAL 2 MONTH)) AND 
      dataAlerta >= MONTH(DATE_SUB(NOW(), INTERVAL 3 MONTH)) AND
      idEmpresa = ${idEmpresa}
    GROUP BY tipo;
  `;

  console.log("Executando a instrução SQL: " + instrucao);
  return database.executar(instrucao);
}

function listarQuartoMes(idEmpresa) {
  var instrucao = `
    SELECT
	    tipo, 
	    COUNT(idAlerta) as registros
    FROM 
	    alerta
    JOIN sensor ON fkSensorAlerta = idSensor
    JOIN armazem ON fkArmazem = idArmazem
    JOIN empresa ON fkEmpresa = idEmpresa
    WHERE
	  MONTH(dataAlerta) <= MONTH(DATE_SUB(NOW(), INTERVAL 3 MONTH)) AND 
      dataAlerta >= MONTH(DATE_SUB(NOW(), INTERVAL 4 MONTH)) AND
      idEmpresa = ${idEmpresa}
    GROUP BY tipo;
  `;

  console.log("Executando a instrução SQL: " + instrucao);
  return database.executar(instrucao);
}

function listarPie(idEmpresa) {
  var instrucao = `
  SELECT
    IFNULL(SUM(alerta.tipo = 'temperatura'), 0.000001) AS temperatura,
    IFNULL(SUM(alerta.tipo = 'umidade'), 0.000001) AS umidade
  FROM
    alerta
  JOIN sensor ON alerta.fkSensorAlerta = sensor.idSensor
  JOIN armazem ON armazem.idArmazem = sensor.fkArmazem
  JOIN empresa ON armazem.fkEmpresa = empresa.idEmpresa
  WHERE
    empresa.idEmpresa = ${idEmpresa} AND 
    dataAlerta >= DATE_SUB(NOW(), INTERVAL 6 MONTH);
  `;

  console.log("Executando a instrução SQL: " + instrucao);

  return database.executar(instrucao);
}

function listarLine8(idEmpresa) {
  var instrucao = `
  SELECT
    Month(dataAlerta) as MesAlerta,
    alerta.tipo,
    alerta.nivel,
    date_format(alerta.dataAlerta, "%M") as MesDoAlerta
FROM
    alerta
    join sensor on alerta.fkSensorAlerta = sensor.idSensor
    join armazem on armazem.idArmazem = sensor.fkArmazem
    join empresa on armazem.fkEmpresa = empresa.idEmpresa
		where empresa.idEmpresa = ${idEmpresa} and
    dataAlerta >= DATE_SUB(now(), INTERVAL 1 MONTH) and alerta.tipo = "temperatura";
  `;

  console.log("Executando a instrução SQL: " + instrucao);

  return database.executar(instrucao);
}

function listarLineUmid(idEmpresa) {
  var instrucao = `SELECT
  Month(dataAlerta) as MesAlerta,
  alerta.tipo,
  alerta.nivel,
  date_format(alerta.dataAlerta, "%M") as MesDoAlerta
FROM
  alerta
  join sensor on alerta.fkSensorAlerta = sensor.idSensor
  join armazem on armazem.idArmazem = sensor.fkArmazem
  join empresa on armazem.fkEmpresa = empresa.idEmpresa
  where empresa.idEmpresa = ${idEmpresa} and
  dataAlerta >= DATE_SUB(now(), INTERVAL 1 MONTH) and alerta.tipo = "umidade";
  `;

  console.log("Executando a instrução SQL: " + instrucao);

  return database.executar(instrucao);
}

module.exports = {
  listarMes,
  listarLine8,
  listarLineUmid,
  listarUltimoMes,
  listarPenultimoMes,
  listarAntepenultimoMes,
  listarQuartoMes,
  listarPie
};
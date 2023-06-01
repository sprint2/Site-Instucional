var database = require("../database/config")

function listar(idEmpresa) {
   var instrucao = `
      SELECT 
         * 
      FROM armazem 
      JOIN empresa ON fkEmpresa = idEmpresa
      WHERE
         idEmpresa = ${idEmpresa};
   `;

   console.log("Executando a instrução SQL: " + instrucao)
   return database.executar(instrucao)
}

function listarAlertasMesEmp(idEmpresa) {
   var instrucao = `
   SELECT 
	   COUNT(idAlerta) as qtd_alertas
   FROM
      alerta
   JOIN sensor ON fkSensorAlerta = idSensor
   JOIN armazem ON fkArmazem = idArmazem
   JOIN empresa ON fkEmpresa = idEmpresa
   WHERE 
	   idEmpresa = ${idEmpresa} AND
	   dataAlerta >= DATE_SUB(NOW(), INTERVAL 1 MONTH);
   `;

   console.log("Executando a instrução SQL: " + instrucao)
   return database.executar(instrucao)
}

function listarAlertasMesArm(idEmpresa, idArmazem) {
   var instrucao = `
   SELECT 
	   COUNT(idAlerta) as qtd_alertas
   FROM
      alerta
   JOIN sensor ON fkSensorAlerta = idSensor
   JOIN armazem ON fkArmazem = idArmazem
   JOIN empresa ON fkEmpresa = idEmpresa
   WHERE 
	   idEmpresa = ${idEmpresa} AND
      idArmazem = ${idArmazem} AND
	   dataAlerta >= DATE_SUB(NOW(), INTERVAL 1 MONTH);
   `;

   console.log("Executando a instrução SQL: " + instrucao)
   return database.executar(instrucao)
}

function listarMaxAlertas(idEmpresa) {
   var instrucao = ` 
   SELECT 
      idArmazem,
	   COUNT(idAlerta) as qtd_alertas
   FROM 
      alerta
   JOIN sensor ON fkSensorAlerta = idSensor
   JOIN armazem ON fkArmazem = idArmazem
   JOIN empresa ON fkEmpresa = idEmpresa
   WHERE 
      idEmpresa = ${idEmpresa} AND
      dataAlerta >= DATE_SUB(NOW(), INTERVAL 1 MONTH)
   GROUP BY idArmazem 
   ORDER BY qtd_alertas DESC
   LIMIT 1;
   `;

   console.log("Executando a instrução SQL: "+instrucao)
   return database.executar(instrucao)
}

module.exports = {
   listar,
   listarAlertasMesArm,
   listarAlertasMesEmp,
   listarMaxAlertas,
}
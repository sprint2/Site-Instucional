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

function cadastrarArmazem(logradouro, bairro, numero, complemento, cep, identificacao, fkEmpresa, cnpj) {
   console.log(
     "ACESSEI O EMPRESA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
     logradouro,
     bairro,
     numero,
     complemento,
     cep,
     identificacao,
     fkEmpresa,
     cnpj
   );
 
   // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
   //  e na ordem de inserção dos dados.
   var instrucao = `
   insert into armazem (identificacao, fkEmpresa) values
	('${identificacao}', (select idEmpresa from empresa where cnpj = '${cnpj}'));
     `;
   var instrucao2 = `
     insert into usuario (username, senha, fkEmpUsuario) values ('${email}', '${senha}', (select idEmpresa from empresa where cnpj = '${cnpj}'));
     `;
   console.log("Executando a instrução SQL: \n" + instrucao + instrucao2);
   return database.executar(instrucao), database.executar(instrucao2);
 }

module.exports = {
   listar,
   listarAlertasMesArm,
   listarAlertasMesEmp,
   listarMaxAlertas,
   cadastrarArmazem
}
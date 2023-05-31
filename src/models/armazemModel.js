var database = require("../database/config")

function listar(idEmpresa) {
   var instrucao = `
      SELECT 
         * 
      FROM armazem 
      JOIN empresa ON fkEmpresa = idEmpresa
      WHERE
         idEmpresa = ${idEmpresa}
   `;

   return database.executar(instrucao)
}

module.exports = {
   listar
}
var database = require("../database/config");

function listar() {
  console.log(
    "ACESSEI O EMPRESA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()"
  );
  var instrucao = `
        SELECT * FROM empresa;
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function entrar(email, senha) {
  console.log(
    "ACESSEI O empresa MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
    email,
    senha
  );
  var instrucao = `
    select 
      usuario.username as nome,
      usuario.senha,
      usuario.idUsuario,
      empresa.idEmpresa,
      empresa.nome as EmpresaNome,
      empresa.cnpj
    from 
      usuario 
    join empresa on fkEmpUsuario = idEmpresa
    WHERE 
      username = '${email}' AND senha = '${senha}';
    `;
    // var instrucao2 = `
    // (SELECT * FROM armazem JOIN empresa ON fkEmpresa = idEmpresa WHERE idEmpresa = (select idEmpresa from empresa where email = '${email}')));
    // `
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(nome, cnpj, tel, email, senha) {
  console.log(
    "ACESSEI O EMPRESA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
    nome,
    cnpj,
    tel,
    email,
    senha
  );

  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
  //  e na ordem de inserção dos dados.
  var instrucao = `
            insert into empresa (nome, cnpj, tel, email) values ('${nome}', '${cnpj}', '${tel}', '${email}');
    `;
  var instrucao2 = `
    insert into usuario (username, senha, fkEmpUsuario) values ('${email}', '${senha}', (select idEmpresa from empresa where cnpj = '${cnpj}'));
    `;
  console.log("Executando a instrução SQL: \n" + instrucao + instrucao2);
  return database.executar(instrucao), database.executar(instrucao2);
}

function usuario(email, senha, cnpj) {
  console.log(
    "ACESSEI O EMPRESA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",

    email,
    senha
  );

  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
  //  e na ordem de inserção dos dados.

  var instrucao2 = `
    insert into usuario (username, senha, fkEmpUsuario) values ('${email}', '${senha}', (select idEmpresa from empresa where cnpj = '${cnpj}'));
    `;
  console.log("Executando a instrução SQL: \n" + instrucao2);
  return database.executar(instrucao2);
}



module.exports = {
  entrar,
  cadastrar,
  listar,
  usuario,
};

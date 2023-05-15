var database = require("../database/config");

// no idEmpresa é pra usar o id da empresa que está logada, no caso, a sessionStorage armazena isso
function buscarUltimasMedidas(idArmazem, idEmpresa, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        select top ${limite_linhas}
        temperatura as temperatura, 
        umidade as umidade,  
        dataHora, FORMAT(dataHora, 'HH:mm:ss') as dataHora_grafico
            from medida join sensor
                    on fkSensor = idSensor join armazem
                        on fkArmazem = idArmazem
                            where fkArmazem = ${idArmazem} and fkEmpresa = ${idEmpresa}
                                order by idMetricaHistorico desc
        `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        select 
        temperatura as temperatura, 
        umidade as umidade,  
        dataHora, FORMAT(dataHora, 'HH:mm:ss') as dataHora_grafico
            from medida join sensor
                    on fkSensor = idSensor join armazem
                        on fkArmazem = idArmazem
                            where fkArmazem = ${idArmazem} and fkEmpresa = ${idEmpresa} 
                                order by idMetricaHistorico desc limit ${limite_linhas}
        `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idArmazem, idEmpresa) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        select top 1
        temperatura as temperatura, 
        umidade as umidade,
        DATE_FORMAT(dataHora,'%H:%i:%s') as dataHora_grafico, 
        fkArmazem
            from metricaHistorico join sensor
                on fkSensor = idSensor join armazem
                    on fkArmazem = idArmazem
                        where fkArmazem = ${idArmazem} and fkEmpresa = ${idEmpresa} 
                            order by idMetricaHistorico desc
        `;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        select 
        temperatura as temperatura, 
        umidade as umidade,
        DATE_FORMAT(dataHora,'%H:%i:%s') as dataHora_grafico, 
        fkArmazem
            from metricaHistorico join sensor
                on fkSensor = idSensor join armazem
                    on fkArmazem = idArmazem
                        where fkArmazem = ${idArmazem} and fkEmpresa = ${idEmpresa} 
                            order by idMetricaHistorico desc limit 1
        `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal
}

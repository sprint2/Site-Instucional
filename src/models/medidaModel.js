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

function graficoPie() {
    instrucaoSql = ""

   if(process.env.AMBIENTE_PROCESSO == "producao") {
    instrucaoSql = `
    SELECT
     sum(aviso.tipo = 'temperatura') as avisoTemp,
     sum(aviso.tipo = 'umidade')  as avisoUmidade
    FROM
    aviso
    join sensor on aviso.fkSensorAviso = sensor.idSensor
	join armazem on armazem.idArmazem = sensor.fkArmazem
    join empresa on armazem.fkEmpresa = empresa.idEmpresa  
		where armazem.idArmazem = 1 and
    dataAviso >= DATE_SUB(now(), INTERVAL 8 WEEK);`
   } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    instrucaoSql = `
    SELECT
     sum(aviso.tipo = 'temperatura') as avisoTemp,
     sum(aviso.tipo = 'umidade')  as avisoUmidade
    FROM
    aviso
    join sensor on aviso.fkSensorAviso = sensor.idSensor
	join armazem on armazem.idArmazem = sensor.fkArmazem
    join empresa on armazem.fkEmpresa = empresa.idEmpresa  
		where armazem.idArmazem = 1 and
    dataAviso >= DATE_SUB(now(), INTERVAL 8 WEEK);`
   } else {
    console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }
}


module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    graficoPie
}




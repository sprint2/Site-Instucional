// Parte dos Gráficos
var dataMonth = [];
var respostaData = [];

// Gráficos dos Ultimos 4 Meses
function puxarUltimoMes(idEmpresa) {
    fetch(`/graficos/listarUltimoMes/${idEmpresa}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            respostaData = []
            if (response.status === 204) {
                respostaData.temp = 0;
                respostaData.umidd = 0;
                dataMonth.push(respostaData);
            } else {
                response.json().then(function (resposta) {
                    // console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                    resposta.forEach(element => {
                        if (element.tipo == 'temperatura') {
                            respostaData.temp = element.registros
                        } else if (element.tipo == 'umidade') {
                            respostaData.umidd = element.registros
                        }
                    });
                    dataMonth.push(respostaData);
                });
            }
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico (ultimo): ${error.message}`);
        });
}
function puxarPenultimoMes(idEmpresa) {
    var respostaData = [];
    fetch(`/graficos/listarPenultimoMes/${idEmpresa}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            if (response.status === 204) {
                respostaData.temp = 0;
                respostaData.umidd = 0;
                dataMonth.push(respostaData);
            } else {
                response.json().then(function (resposta) {
                    // console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                    resposta.forEach(element => {
                        if (element.tipo == 'temperatura') {
                            respostaData.temp = element.registros
                        } else if (element.tipo == 'umidade') {
                            respostaData.umidd = element.registros
                        }
                    });
                    dataMonth.push(respostaData);
                });
            }
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico (penultimo): ${error.message}`);
        });

}
function puxarAntepenultimoMes(idEmpresa) {
    var respostaData = [];
    fetch(`/graficos/listarAntepenultimoMes/${idEmpresa}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            if (response.status === 204) {
                respostaData.temp = 0;
                respostaData.umidd = 0;
                dataMonth.push(respostaData);
            } else {
                response.json().then(function (resposta) {
                    // console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                    resposta.forEach(element => {
                        if (element.tipo == 'temperatura') {
                            respostaData.temp = element.registros
                        } else if (element.tipo == 'umidade') {
                            respostaData.umidd = element.registros
                        }
                    });
                    dataMonth.push(respostaData);
                });
            }
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico (antepenultimo): ${error.message}`);
        });
}
function puxarQuartoMes(idEmpresa) {
    var respostaData = [];
    fetch(`/graficos/listarQuartoMes/${idEmpresa}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            if (response.status === 204) {
                for (let i = 0; i < 4; i++) {
                    respostaData.temp = 0;
                    respostaData.umidd = 0;
                    dataMonth.push(respostaData);
                }
                var dataAlertaTemp = [dataMonth[0].temp, dataMonth[1].temp, dataMonth[2].temp, dataMonth[3].temp];
                var dataAlertaUmidd = [dataMonth[0].umidd, dataMonth[1].umidd, dataMonth[2].umidd, dataMonth[3].umidd];

                const ctxAlert = document.getElementById("chart-alert");
                if (Chart.instances[ctxAlert]) {
                    // Se houver, destrua-o
                    Chart.instances[ctxAlert].destroy();
                }
                const labels = ["Janeiro", "Fevereiro", "Março", "Abril"]
                new Chart(ctxAlert, {
                    type: "bar",
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                label: "Umidade",
                                backgroundColor: "#58A1E4",
                                borderColor: "#58A1E4",
                                data: dataAlertaUmidd,
                                borderWidth: 1,
                            },
                            {
                                label: "Temperatura",
                                backgroundColor: "#025183",
                                borderColor: "#025183",
                                data: dataAlertaTemp,
                                borderWidth: 1,
                            },
                        ],
                    },
                    options: {
                        layout: {
                            padding: {
                                bottom: 20,
                            },
                        },
                    },
                });
            } else {
                response.json().then(function (resposta) {
                    // console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                    resposta.forEach(element => {
                        if (element.tipo == 'temperatura') {
                            respostaData.temp = element.registros
                        } else if (element.tipo == 'umidade') {
                            respostaData.umidd = element.registros
                        }
                    });
                    dataMonth.push(respostaData);

                    var dataAlertaTemp = [dataMonth[0].temp, dataMonth[1].temp, dataMonth[2].temp, dataMonth[3].temp];
                    var dataAlertaUmidd = [dataMonth[0].umidd, dataMonth[1].umidd, dataMonth[2].umidd, dataMonth[3].umidd];


                    const ctxAlert = document.getElementById("chart-alert");
                    if (Chart.instances[ctxAlert]) {
                        // Se houver, destrua-o
                        Chart.instances[ctxAlert].destroy();
                    }
                    const labels = ["Janeiro", "Fevereiro", "Março", "Abril"]
                    new Chart(ctxAlert, {
                        type: "bar",
                        data: {
                            labels: labels,
                            datasets: [
                                {
                                    label: "Umidade",
                                    backgroundColor: "#58A1E4",
                                    borderColor: "#58A1E4",
                                    data: dataAlertaUmidd,
                                    borderWidth: 1,
                                },
                                {
                                    label: "Temperatura",
                                    backgroundColor: "#025183",
                                    borderColor: "#025183",
                                    data: dataAlertaTemp,
                                    borderWidth: 1,
                                },
                            ],
                        },
                        options: {
                            layout: {
                                padding: {
                                    bottom: 20,
                                },
                            },
                        },
                    });
                });
            }
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico (quarto): ${error.message}`);
        });

}

// Gráfico de Pizza
var alertTemp = [];
var alertUmid = [];
function puxarPie(idEmpresa) {
    var idEmpresa = sessionStorage.ID_EMPRESA;
    alertTemp = [];
    alertUmid = [];
    fetch(`/graficos/listarPie/${idEmpresa}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {

            response.json().then(function (resposta) {
                resposta.forEach(element => {
                    alertTemp.push(element.temperatura);
                    alertUmid.push(element.umidade);
                });
            })

            const ctxPorcent = document.getElementById("chart-porcent");
            new Chart(ctxPorcent, {
                type: "pie",
                data: {
                    labels: ["Temperatura", "Umidade"],
                    datasets: [
                        {
                            label: "Quantidade de alertas",
                            data: [alertTemp, alertUmid],
                            backgroundColor: ["#025183", "#58A1E4"],
                            borderColor: ["#025183", "#58A1E4"],
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    plugins: {
                        legend: {
                            position: "right",
                        },
                    },
                    layout: {
                        padding: 0,
                        margin: 0,
                    },
                },
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}

// Grafico de Linha Umidade
var armazensUmid = []
var dataAlertaUmid = []
var chartLineUmid;
function puxarArmazemUmid(idEmpresa) {
    var idEmpresa = sessionStorage.ID_EMPRESA;
    armazensUmid = [];
    dataAlertaUmid = [];

    fetch(`/graficos/listarLineUmid/${idEmpresa}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {

            response.json().then(function (resposta) {
                resposta = resposta.reverse();
                resposta.forEach(element => {
                    horarioUmid = `${element.horaUmid}:${element.minutoUmid}`
                    dataAlertaUmid.push(horarioUmid);
                    armazensUmid.push(element.umidade);
                });
            })
            const ctxUmdd = document.getElementById("chartUmd");
            chartLineUmid = new Chart(ctxUmdd, {
                type: "line",
                data: {
                    labels: dataAlertaUmid,
                    datasets: [
                        {
                            label: "Níveis de umidade",
                            backgroundColor: "#58A1E4",
                            borderColor: "#58A1E4",
                            data: armazensUmid,
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    layout: {
                        padding: {
                            bottom: 20,
                        },
                    },
                },
            });

        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}

// Grafico de Linha Temperatura
var armazensTemp = []
var dataAlertaTemp = []
var chartLineTemp;
function puxarArmazemTemp(idEmpresa) {
    var idEmpresa = sessionStorage.ID_EMPRESA;
    armazensTemp = [];
    dataAlertaTemp = [];

    fetch(`/graficos/listarLineTemp/${idEmpresa}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {

            response.json().then(function (resposta) {
                resposta = resposta.reverse();
                resposta.forEach(element => {
                    horarioTemp = `${element.horaTemp}:${element.minutoTemp}`
                    dataAlertaTemp.push(horarioTemp);
                    armazensTemp.push(element.temperatura);
                });
            })
            
            const ctxTemp = document.getElementById("chartTemp");
            chartLineTemp = new Chart(ctxTemp, {
                type: "line",
                data: {
                    labels: dataAlertaTemp,
                    datasets: [
                        {
                            label: "Temperatura",
                            backgroundColor: "#025183",
                            borderColor: "#025183",
                            data: armazensTemp,
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    layout: {
                        padding: {
                            bottom: 20,
                        },
                    },
                },
            });

        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}

//funções de alertas
function verifMedida(tipo) {
    var qtdAcimaUmid;
    var qtdAcimaTemp;
    if(tipo == 'temperatura') {
        armazensTemp.forEach(temperatura => {
            if(temperatura > 6) {
                qtdAcimaTemp++;
            }
        });
        return qtdAcimaTemp;
    } else if(tipo == 'umidade') {
        armazensUmid.forEach(umidade => {
            if(umidade > 50) {
                qtdAcimaUmid++;
            }
        });
        return qtdAcimaUmid;
    }
}

function gerarAlerta(tipo) {
    var medidas = verifMedida(tipo);

    if(medidas >= 6) {
        alert('temos um problema');
    } else {
        alert('ta suave chefe');
    }
}

function atualizarLinhaUmid(idEmpresa) {
    fetch(`/graficos/listarLineUmid/${idEmpresa}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {

            response.json().then(function (resposta) {
                // console.log("Dados recebidos (Linha 8): " + JSON.stringify(resposta));
                var medidaRecente = resposta[0];
                var horarioRecente = `${medidaRecente.horaUmid}:${medidaRecente.minutoUmid}`;
                if(horarioRecente == dataAlertaUmid[dataAlertaUmid.length - 1]) {
                    console.log('dado mais recente plotado')
                } else {
                    armazensUmid.shift();
                    armazensUmid.push(medidaRecente.umidade);
                    dataAlertaUmid.shift();
                    dataAlertaUmid.push(horarioRecente);
                    chartLineUmid.update();
                }
            })
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });  
}

function atualizarLinhaTemp(idEmpresa) {
    fetch(`/graficos/listarLineTemp/${idEmpresa}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {

            response.json().then(function (resposta) {
                // console.log("Dados recebidos (Linha 8): " + JSON.stringify(resposta));
                var medidaRecente = resposta[0];
                var horarioRecente = `${medidaRecente.horaTemp}:${medidaRecente.minutoTemp}`;
                if(horarioRecente == dataAlertaTemp[dataAlertaTemp.length - 1]) {
                    console.log('dado mais recente plotado')
                } else {
                    armazensTemp.shift();
                    armazensTemp.push(medidaRecente.temperatura);
                    dataAlertaTemp.shift();
                    dataAlertaTemp.push(horarioRecente);
                    chartLineTemp.update();
                }
            })
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });  
}

function atualizarGraficos() {
    var idEmpresa = sessionStorage.ID_EMPRESA;
    atualizarLinhaTemp(idEmpresa);
    atualizarLinhaUmid(idEmpresa);

    setTimeout(() => {
        atualizarGraficos()
    }, 2000);
}

// Função que vai puxar todos os gráficos
function puxarDados() {
    var idEmpresa = sessionStorage.ID_EMPRESA;
    puxarUltimoMes(idEmpresa);
    puxarPenultimoMes(idEmpresa);
    puxarAntepenultimoMes(idEmpresa);
    puxarQuartoMes(idEmpresa);
    puxarPie(idEmpresa);
    puxarArmazemTemp(idEmpresa);
    puxarArmazemUmid(idEmpresa);
    atualizarGraficos();

    if (dataMonth.length < 4) {
        console.log("ainda menor que 4")
    } else {
        dataMonth = []
    }
    nomeEmpresa = document.getElementById("nomeEmp");
    nomeEmpresa.innerText = sessionStorage.NOME_EMPRESA;
    /*setTimeout(() => {
       puxarDados()
    }, 20000);*/
}
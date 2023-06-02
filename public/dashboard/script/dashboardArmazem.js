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
                console.log("Dados recebidos (PIE): " + JSON.stringify(resposta));
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

// Grafico de Linha Temperatura
var armazens8 = []
var dataAlerta8 = []
function puxarArmazem8(idEmpresa) {
    var idEmpresa = sessionStorage.ID_EMPRESA;
    armazens8 = [];
    dataAlerta8 = [];

    fetch(`/graficos/listarLine8/${idEmpresa}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {

            response.json().then(function (resposta) {
                console.log("Dados recebidos (Linha 8): " + JSON.stringify(resposta));
                resposta.forEach(element => {
                    dataAlerta8.push(element.HorarioAlerta)
                    armazens8.push(element.Medida)
                    console.log(element.MesAlerta)
                });
            })
            console.log(armazens8);
            const ctxTemp = document.getElementById('chart-temp');
            new Chart(ctxTemp, {
                type: 'line',
                data: {
                    labels: ['13h00', '13h30', '14h00', '14h30', '15h00', '15h30', '16h00', '16h30', '17h00', '17h30', '18h00'],
                    datasets: [{
                        label: 'Temperatura',
                        backgroundColor: '#025183',
                        borderColor: '#025183',
                        data: [1, 1.5, 1.25, 1.5, 1.625, 1.75, 1.6, 1.45, 1.35, 1.55, 1.7, 1.8, 1.2, 1.3, 1.4, 1.68, 1.59, 1.43],
                        borderWidth: 1,
                    },
                    ]
                },
                options: {
                    layout: {
                        padding: {
                            bottom: 20
                        }
                    }
                }
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico (line8): ${error.message}`);
        });

}

// Grafico de Linha Umidade
var armazensUmid = []
var dataAlertaUmid = []
function puxarArmazemUmid(idEmpresa) {
    var idEmpresa = sessionStorage.ID_EMPRESA;
    armazensUmid = [];
    dataAlertaUmid = [];

    fetch(`/graficos/listarLineUmid/${idEmpresa}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {

            response.json().then(function (resposta) {
                console.log("Dados recebidos (Linha 8): " + JSON.stringify(resposta));
                resposta.forEach(element => {
                    dataAlertaUmid.push(element.HorarioAlerta)
                    armazensUmid.push(element.Medida)
                    console.log(element.MesAlerta)
                    console.log(element.HorarioAlerta)
                });
            })
            const ctxUmdd = document.getElementById("chartUmd");
            new Chart(ctxUmdd, {
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

// Função que vai puxar todos os gráficos
function puxarDados() {
    var idEmpresa = sessionStorage.ID_EMPRESA;
    puxarUltimoMes(idEmpresa);
    puxarPenultimoMes(idEmpresa);
    puxarAntepenultimoMes(idEmpresa);
    puxarQuartoMes(idEmpresa);
    puxarPie(idEmpresa);
    puxarArmazem8(idEmpresa);
    puxarArmazemUmid(idEmpresa);
    mostrarAlertas(idEmpresa);

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




ctxAlert = document.getElementById('chart-alert');

new Chart(ctxAlert, {
    type: 'bar',
    data: {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril'],
        datasets: [{
            label: 'Umidade',
            backgroundColor: '#58A1E4',
            borderColor: '#58A1E4',
            data: [20, 15, 13, 8],
            borderWidth: 1
        },
        {
            label: 'Temperatura',
            backgroundColor: '#025183',
            borderColor: '#025183',
            data: [4, 2, 1, 7],
            borderWidth: 1
        }

        ]
    },
    options: {
        layout: {
            padding: {
                bottom: 20
            }
        }
    }
});
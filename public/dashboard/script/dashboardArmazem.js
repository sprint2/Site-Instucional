
function dataHora() {
    const data = new Date();

    var dia = String(data.getDate()).padStart(2, "0");
    var mes = String(data.getMonth() + 1).padStart(2, "0");
    var ano = data.getFullYear();

    document.getElementById("span_data").innerHTML = `${dia}/${mes}/${ano}`;

}

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

//Gráficos de linha
var idSensor;
var minTemp;
var maxTemp;
var minUmid;
var maxUmid;

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
                minUmid = resposta[0].minimoUmid;
                maxUmid = resposta[0].maximoUmid;

                resposta = resposta.reverse();
                resposta.forEach(element => {
                    horarioUmid = `${element.horario}`
                    dataAlertaUmid.push(horarioUmid);
                    armazensUmid.push(element.umidade);
                    idSensor = element.sensor;
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
                            bottom: 0,
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
                minTemp = resposta[0].minimoTemp;
                maxTemp = resposta[0].maximoTemp;

                resposta = resposta.reverse();
                resposta.forEach(element => {
                    horarioTemp = `${element.horario}`
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
                            bottom: 0,
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

//funções para atualizar os gráficos
function atualizarLinhaUmid(idEmpresa) {
    fetch(`/graficos/listarLineUmid/${idEmpresa}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {

            response.json().then(function (resposta) {
                // console.log("Dados recebidos (Linha 8): " + JSON.stringify(resposta));
                var medidaRecente = resposta[0];
                var horarioRecente = `${medidaRecente.horario}`;
                if (horarioRecente == dataAlertaUmid[dataAlertaUmid.length - 1]) {
                    var msgUmid = document.getElementById("umid_msg");
                    msgUmid.innerHTML = `Os dados mais recentes já foram plotados no gráfico.`;
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
                var horarioRecente = `${medidaRecente.horario}`;
                if (horarioRecente == dataAlertaTemp[dataAlertaTemp.length - 1]) {
                    var msgTemp = document.getElementById("temp_msg");
                    msgTemp.innerHTML = `Os dados mais recentes já foram plotados no gráfico.`;
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
    verifAlerta();

    setTimeout(() => {
        atualizarGraficos()
    }, 1000 * 6);
}

//funções de alertas
function verifMedida(tipo) {
    var qtdAcimaUmid = 0;
    var qtdAbaixoUmid = 0;
    var qtdAcimaTemp = 0;
    var qtdAbaixoTemp = 0;

    var medida = {};
    if (tipo == 'temperatura') {
        armazensTemp.forEach(temperatura => {
            if (temperatura >= maxTemp) {
                qtdAcimaTemp++;
            } else if (temperatura <= minTemp) {
                qtdAbaixoTemp++;
            }
        });

        if (qtdAcimaTemp >= 10) {
            medida = {
                tipo: 'temperatura',
                nivel: 'quente',
                qtd: qtdAcimaTemp
            }

            return medida;
        } else if (qtdAbaixoTemp >= 10) {
            medida = {
                tipo: 'temperatura',
                nivel: 'frio',
                qtd: qtdAbaixoTemp
            }

            return medida;
        }
    } else if (tipo == 'umidade') {
        armazensUmid.forEach(umidade => {
            if (umidade > maxUmid) {
                qtdAcimaUmid++;
            } else if (umidade <= minUmid) {
                qtdAbaixoUmid++;
            }
        });

        if (qtdAcimaUmid >= 10) {
            medida = {
                tipo: 'umidade',
                nivel: 'alta',
                qtd: qtdAcimaUmid
            }

            return medida;
        } else if (qtdAbaixoUmid >= 10) {
            medida = {
                tipo: 'umidade',
                nivel: 'abaixo',
                qtd: qtdAbaixoUmid
            }

            return medida;
        }
    }
}

function gerarAlerta(tipoAlerta) {
    var idEmpresa = sessionStorage.ID_EMPRESA;
    var medidas = verifMedida(tipoAlerta);
    var metrica;
    var armazem = sessionStorage.ID_ARMAZEM;

    if (medidas.tipo == 'temperatura') {
        metrica = armazensTemp[armazensTemp.length - 1];
    } else if (medidas.tipo == 'umidade') {
        metrica = armazensUmid[armazensUmid.length - 1];
    }
    fetch(`/alerta/cadastrarAlerta/${idEmpresa}`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            tipo: medidas.tipo,
            nivel: medidas.nivel,
            medida: metrica,
            idSensor: idSensor
        })
    }).then(function (resposta) {
        console.log("Alerta criado!");
        mostrarAlertaMaisRecente(idEmpresa);
    })
}

function mostrarAlertaMaisRecente(idEmpresa) {
    fetch(`/alerta/listarAlertasRecentes/${idEmpresa}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status === 204) {
                console.log("ta vazio");
            } else {
                resposta.json().then(function (resposta) {
                    // console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                    var tempoAnimacao = 6;
                    renderAlerta(resposta[0].tipo, resposta[0].nivel, resposta[0].idArmazem, resposta[0].data_alerta, resposta[0].hora_alerta, tempoAnimacao, "alerts_container");
                })
            }
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

var verifTempGerado = false;
var verifUmidGerado = false;

function verifAlerta() {
    var medidasTemp = verifMedida('temperatura');
    var medidasUmid = verifMedida('umidade');

    if (!medidasTemp || !medidasUmid) {
        return
    } else {
        if (medidasUmid.qtd >= 12 && !verifUmidGerado) {
            gerarAlerta('umidade');
            verifUmidGerado = true;
        } else if (medidasUmid.qtd < 12) {
            verifUmidGerado = false; // Redefine a variável de controle do alerta
        }

        if (medidasTemp.qtd >= 12 && !verifTempGerado) {
            gerarAlerta('temperatura');
            verifTempGerado = true;
        } else if (medidasTemp.qtd < 12) {
            verifTempGerado = false; // Redefine a variável de controle do alerta
        }
    }
}

function listarQtdSensor(idArmazem)  {
    fetch(`/graficos/listarQtdSensores/${idArmazem}`).then(function (resposta) {
        if(resposta.ok) {
            if(resposta.status == 204) {
                console.log("ta vazio");
            } else {
                resposta.json().then(function (resposta) {
                    spanQtdSensor = document.getElementById("qtd_sensor");
                    spanQtdSensor.innerHTML = `${resposta[0].qtd_sensor}`;
                })
            }
        }
    });
}

function listarAlertasMes(idArmazem) {
    fetch(`/graficos/listarQtdMesArm/${idArmazem}`).then(function (resposta) {        
        if(resposta.ok) {
            if(resposta.status == 204) {
                console.log("ta vazio");
            } else {
                resposta.json().then(function (resposta) {
                    var spanQtdAlertasMes = document.getElementById("alerta_mes");
                    spanQtdAlertasMes.innerHTML = `${resposta[0].qtd_alertas}`;
                });
            }
        }
    });
}

function listarUltimoAlertaArm(idArmazem) {
    fetch(`/graficos/listarUltimoAlerta/${idArmazem}`).then(function (resposta) {        
        if(resposta.ok) {
            if(resposta.status == 204) {
                console.log("ta vazio");
            } else {
                resposta.json().then(function (resposta) {
                    var spanUltimoAlerta = document.getElementById("ultimo_alerta");
                    spanUltimoAlerta.innerHTML = `${resposta[0].data_alerta} às ${resposta[0].hora}:${resposta[0].minuto}`;
                });
            }
        }
    });
}

function puxarIndicadores(idArmazem) {
    listarQtdSensor(idArmazem);
    listarAlertasMes(idArmazem);
    listarUltimoAlertaArm(idArmazem);
}

// Função que vai puxar todos os gráficos
function puxarDados() {
    var idEmpresa = sessionStorage.ID_EMPRESA;
    var idArmazem = sessionStorage.ID_ARMAZEM;
    puxarUltimoMes(idEmpresa);
    puxarPenultimoMes(idEmpresa);
    puxarAntepenultimoMes(idEmpresa);
    puxarQuartoMes(idEmpresa);
    puxarPie(idEmpresa);
    puxarArmazemTemp(idEmpresa);
    puxarArmazemUmid(idEmpresa);
    mostrarAlertas(idArmazem);
    puxarIndicadores(idArmazem);
    verifAlerta();
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
var idsAlertas = [];

function renderAlerta(tipo, nivel, armazem, data, hora, tempoAnimacao, container) {
   var alertsContainer = document.getElementById(container);
   var divAlert = document.createElement("div");
   var divAlertContent = document.createElement("div");
   var warning = document.createElement("i");
   var alertText = document.createElement("div");
   var spanTitulo = document.createElement("span");
   var spanConteudo = document.createElement("span");
   var timer = document.createElement("div");
   var br = document.createElement("br");

   divAlert.classList.add("alert");
   divAlert.classList.add("slideIn");
   divAlertContent.classList.add("alert-content");
   warning.classList.add("ph");
   warning.classList.add("ph-warning");
   spanTitulo.classList.add("notification-titulo");
   spanConteudo.classList.add("notification-conteudo");
   timer.classList.add("timer");

   spanTitulo.textContent = `Alerta de ${tipo} ${nivel}!`;
   spanConteudo.textContent = `O armazém ${armazem} emitiu um alerta de \n${tipo} no dia ${data} às ${hora}`;

   alertText.appendChild(spanTitulo);
   alertText.appendChild(br);
   alertText.appendChild(spanConteudo);
   divAlertContent.appendChild(warning);
   divAlertContent.appendChild(alertText);
   divAlert.appendChild(divAlertContent);
   divAlert.appendChild(timer);
   alertsContainer.appendChild(divAlert);

   timer.style.animation = `timerLoad ${tempoAnimacao}s infinite linear`;
   if (tempoAnimacao != false) {
      setTimeout(() => {
         divAlert.style.display = 'none';
      }, tempoAnimacao * 1000);
   }
}


function mostrarAlertas(idArmazem) {
   fetch(`/alerta/listarAlertasRecentesArm/${idArmazem}`).then(function (resposta) {
      if (resposta.ok) {
         if (resposta.status === 204) {
            console.log("ta vazio");
         } else {
            resposta.json().then(function (resposta) {
               // console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
               var tempoAnimacao = 4;
               idsAlertas = [];
               resposta.forEach(element => {
                  idsAlertas.push(element.idAlerta)
                  tempoAnimacao += 2;
                  renderAlerta(element.tipo, element.nivel, element.idArmazem, element.data_alerta, element.hora_alerta, tempoAnimacao, "alerts_container");

                  mostrarQtdAlertas(idArmazem);
                  idsAlertas.forEach(element => {
                     atualizarAlerta(element);
                  });
               });
            })
         }
      }
   })
      .catch(function (error) {
         console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
      });
}

function mostrarQtdAlertas(idArmazem) {
   fetch(`/alerta/listarQtdAlertasArm/${idArmazem}`).then(function (resposta) {
      if (resposta.ok) {
         if (resposta.status === 204) {
            console.log("ta vazio");
         } else {
            var ul = document.getElementById("ul_nav");
            resposta.json().then(function (resposta) {
               var qtdAlertas = document.createElement("div");
               qtdAlertas.classList.add("qtd-alertas");
               qtdAlertas.textContent = resposta[0].qtd_alertas;
               ul.appendChild(qtdAlertas);
            });
         }
      }
   })
      .catch(function (error) {
         console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
      });
}

function mostrarTodosAlertas() {
   var idArmazem = sessionStorage.ID_ARMAZEM;
   var notContainer = document.getElementById("notification_container");
   if (notContainer.style.display == 'none') {
      notContainer.style.display = 'flex'
   } else {
      notContainer.style.display = 'none'
   }
   fetch(`/alerta/listarAlertasArm/${idArmazem}`).then(function (resposta) {
      if (resposta.ok) {
         if (resposta.status === 204) {
            notContainer.innerHTML = `<span> Não há novas notificações </span>`
         } else {
            notContainer.innerHTML = '';
            tempoAnimacao = false;
            resposta.json().then(function (resposta) {
               for (let i = 0; i < resposta.length; i++) {
                  const element = resposta[i];
                  renderAlerta(element.tipo, element.nivel, element.idArmazem, element.data_alerta, element.hora_alerta, tempoAnimacao, "notification_container");
               }

            });
         }
      }
   });
}

function atualizarAlerta(idAlerta) {
   fetch(`/alerta/atualizarAlerta/${idAlerta}`).then(function (resposta) {
      console.log("Alerta editado: " + resposta);
   }).catch(function (error) {
      console.erro(`Erro na obtenção dos dados p/ gráficos: ${error.message}`);
   });
}

function showConfig() {
    var config = document.getElementById("config_container");

    if (config.style.display == 'none') {
        config.style.display = 'flex'
     } else {
        config.style.display = 'none'
     }
}
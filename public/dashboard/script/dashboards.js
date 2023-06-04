
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
               var nomeMes;
               switch (element.mes_alerta) {
               case 1:
                  nomeMes = 'Janeiro';
                  break;
               case 2:
                  nomeMes = 'Fevereiro';
                  break;
               case 3:
                  nomeMes = 'Março';
                  break;
               case 4:
                  nomeMes = 'Abril';
                  break;
               case 5:
                  nomeMes = 'Maio';
                  break;
               case 6:
                  nomeMes = 'Junho';
                  break;
               case 7:
                  nomeMes = 'Julho';
                  break;
               case 8:
                  nomeMes = 'Agosto';
                  break;
               case 9:
                  nomeMes = 'Setembro';
                  break;
               case 10:
                  nomeMes = 'Outubro';
                  break;
               case 11:
                  nomeMes = 'Novembro';
                  break;
               case 12:
                  nomeMes = 'Dezembro';
                  break;
               default:
                  nomeMes = 'Mês inválido';
                  break;
               }


               dataAlerta8.push(nomeMes)
               armazens8.push(element.qtd_alerta)
            });
         })
         console.log(armazens8);
         const ctxArm = document.getElementById("chart-arm");
         new Chart(ctxArm, {
            type: "line",
            data: {
               labels: dataAlerta8,
               datasets: [
                  {
                     label: "Quantidade de armazens",
                     backgroundColor: "#025183",
                     borderColor: "#025183",
                     data: armazens8,
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
   puxarArmazens(idEmpresa);
   puxarArmazemMaior(idEmpresa);
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
   setTimeout(() => {
      puxarDados()
   }, 20000);
}

// Função de Puxar os Armazens
function puxarArmazens(idEmpresa) {
   lista_armazens.innerHTML = ""
   fetch(`/armazem/listar/${idEmpresa}`, { cache: 'no-store' }).then(function (response) {
      if (response.ok) {
         if (response.status === 204) {
            console.log("vazio")
         } else {
            response.json().then(function (resposta) {
               // console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
               var div = document.getElementById("lista_armazens");
               resposta.forEach(element => {
                  div.innerHTML += `
                  <li id="armazem${element.idArmazem}" idArmazem='${element.idArmazem}' onclick="puxarIdArmazem('armazem${element.idArmazem}')">
                     <img src="../../img/icons/aviso.png" alt="" />
                     <a href="../armazem/dash-armazem.html"> Armazem ${element.idArmazem} </a>
                  </li>
                  `
               });
            });
         }
      } else {
         console.error('Nenhum dado encontrado ou erro na API');
      }
   })
      .catch(function (error) {
         console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
      });
}

function puxarIdArmazem(id) {
   var liArmazem = document.getElementById(id);
   var idArmazem = liArmazem.getAttribute("idArmazem");

   sessionStorage.ID_ARMAZEM = idArmazem;
   console.log("session: " + sessionStorage.ID_ARMAZEM);
}

function puxarArmazemMaior(idEmpresa) {
   fetch(`/armazem/listarMaxAlertas/${idEmpresa}`).then(function (resposta) {
      if (resposta.ok) {
         if (resposta.status === 204) {
            console.log("ta vazio")
         } else {
            resposta.json().then(function (resposta) {
               console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
               var maxAlert = document.getElementById("max_alert_arm")
               maxAlert.innerHTML = `
               <img src="../../img/icons/aviso.png" alt="" />
               Armazem ${resposta[0].idArmazem}
               <img src="../../img/icons/calendario.png" alt="" />
               ${resposta[0].qtd_alertas}
               `
            })
         }
      }
   })
}

var idsAlertas = [];

function renderAlerta(tipo, nivel, armazem, data, hora, tempoAnimacao) {
   var alertsContainer = document.getElementById("alerts_container");
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
   setTimeout(() => {
      divAlert.style.display = 'none';
   }, tempoAnimacao * 1000);
}


function mostrarAlertas(idEmpresa) {
   fetch(`/alerta/listarAlertasRecentes/${idEmpresa}`).then(function (resposta) {
      if(resposta.ok) {
         if(resposta.status === 204) {
            console.log("ta vazio");
         } else {
            resposta.json().then(function (resposta) {
               // console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
               var alertsContainer = document.getElementById("alerts_container");
               var tempoAnimacao = 4;
               idsAlertas = [];
               resposta.forEach(element => {
                  idsAlertas.push(element.idAlerta)
                  tempoAnimacao += 2;
                  renderAlerta(element.tipo, element.nivel, element.idArmazem, element.data_alerta, element.hora_alerta, tempoAnimacao);

                  mostrarQtdAlertas(idEmpresa);
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

function mostrarQtdAlertas(idEmpresa) {
   fetch(`/alerta/listarQtdAlertas/${idEmpresa}`).then(function (resposta) {
      if(resposta.ok) {
         if(resposta.status === 204) {
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

function atualizarAlerta(idAlerta) {
   fetch(`/alerta/atualizarAlerta/${idAlerta}`).then(function (resposta) {
      console.log("Alerta editado: "+resposta);
   }).catch(function (error) {
      console.erro(`Erro na obtenção dos dados p/ gráficos: ${error.message}`);
   });
}
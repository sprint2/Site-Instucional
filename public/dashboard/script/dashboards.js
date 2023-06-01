//pegar
var dtArmazem = [
   "1","2","3","4","5","6","7","8","9","10","11","12"
]
function dataHora() {
   const data = new Date();

   var dia = String(data.getDate()).padStart(2, "0");
   var mes = String(data.getMonth() + 1).padStart(2, "0");
   var ano = data.getFullYear();

   document.getElementById("span_data").innerHTML = `${dia}/${mes}/${ano}`;

}

// Parte dos Gráficos
var dataMonth = [];
var dataMonth = [];

function puxarUltimoMes(idEmpresa) {
   var respostaData = {};
   fetch(`/graficos/listarUltimoMes/${idEmpresa}`, { cache: 'no-store' }).then(function (response) {
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
         console.error(`Erro na obtenção dos dados p/ gráfico (ultimo): ${error.message}`);
      });
}


function puxarPenultimoMes(idEmpresa) {
   var respostaData = {};
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
   var respostaData = {};
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
   var respostaData = {};
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
               dataAlerta8.push(element.MesDoAlerta)
               armazens8.push(element.MesAlerta)
               console.log(element.MesAlerta)
            });
         })
         const ctxArm = document.getElementById("chart-arm");
         new Chart(ctxArm, {
            type: "line",
            data: {
               labels: dataAlerta,
               datasets: [
                  {
                     label: "Quantidade de armazens",
                     backgroundColor: "#025183",
                     borderColor: "#025183",
                     data: armazens,
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
               dataAlertaUmid.push(element.MesDoAlerta)
               armazensUmid.push(element.MesAlerta)
               console.log(element.MesAlerta)
            });
         })
         const ctxUmdd = document.getElementById("chart-umdd");
   new Chart(ctxUmdd, {
      type: "line",
      data: {
         labels: [dataAlertaUmid],
         datasets: [
            {
               label: "Níveis de umidade",
               backgroundColor: "#58A1E4",
               borderColor: "#58A1E4",
               data: [armazensUmid],
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
   
   if (dataMonth.length < 4) {
      console.log("ainda menor que 4")
   } else {
      dataMonth = []
   }
   nomeEmpresa = document.getElementById("nomeEmp");
   nomeEmpresa.innerText = sessionStorage.NOME_EMPRESA;

}

function puxarArmazens(idEmpresa) {
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
//pegar
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
         if(response.status === 204) {
            for(let i = 0; i < 4; i++) {
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

function puxarDados() {
   var idEmpresa = sessionStorage.ID_EMPRESA;
   puxarUltimoMes(idEmpresa);
   puxarPenultimoMes(idEmpresa);
   puxarAntepenultimoMes(idEmpresa);
   puxarQuartoMes(idEmpresa);
   puxarPie(idEmpresa);

   if (dataMonth.length < 4) {
      console.log("ainda menor que 4")
   } else {
      dataMonth = []
   }
   nomeEmpresa = document.getElementById("nomeEmp");
   nomeEmpresa.innerText = sessionStorage.NOME_EMPRESA;



   const ctxArm = document.getElementById("chart-arm");
   new Chart(ctxArm, {
      type: "line",
      data: {
         labels: [
            "01/01 - 07/01",
            "08/01 - 14/01",
            "15/01 - 21/01",
            "22/01 - 28/01",
            "29/01 - 04/02",
            "05/02 - 11/02",
            "12/02 - 18/02",
            "19/02 - 25/02",
         ],
         datasets: [
            {
               label: "Quantidade de armazens",
               backgroundColor: "#025183",
               borderColor: "#025183",
               data: [18, 21, 17, 22, 26, 22, 20, 15],
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

   const ctxUmdd = document.getElementById("chart-umdd");
   new Chart(ctxUmdd, {
      type: "line",
      data: {
         labels: [
            "13h00",
            "13h30",
            "14h00",
            "14h30",
            "15h00",
            "15h30",
            "16h00",
            "16h30",
            "17h00",
            "17h30",
            "18h00",
         ],
         datasets: [
            {
               label: "Níveis de umidade",
               backgroundColor: "#58A1E4",
               borderColor: "#58A1E4",
               data: [
                  60.0, 65.0, 55.0, 60.0, 70.0, 65.0, 58.0, 68.0, 67.0, 52.0, 63.0,
                  58.0, 61.0, 56.0,
               ],
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
}
var dataMonth = [];
// animação da navbar

window.onscroll = function () {
  var nav = document.getElementById("navbar");
  var navLink = document.getElementsByClassName("nav-link");
  var logo = document.getElementById("logo");

  if (window.scrollY != 0) {
    nav.classList.add("navbar-ativo");
    for (var i = 0; i < navLink.length; i++) {
      navLink[i].classList.remove("link-animation");
      navLink[i].classList.add("nav-link-ativo");
      navLink[i].classList.add("link-animation-ativo");
    }
    logo.classList.add("logo-ativo");
  } else {
    nav.classList.remove("navbar-ativo");
    for (var i = 0; i < navLink.length; i++) {
      navLink[i].classList.remove("nav-link-ativo");
      navLink[i].classList.remove("link-animation-ativo");
      navLink[i].classList.add("link-animation");
    }
    logo.classList.remove("logo-ativo");
  }
};

// sessão
function validarSessao() {
  // aguardar();

  var email = sessionStorage.EMAIL_EMPRESA;
  var nome = sessionStorage.NOME_EMPRESA;

  if (email != null && nome != null) {
    nomeEmp = nome;
  } else {
    window.location = "../login.html";
  }
}

function limparSessao() {
  // aguardar();
  sessionStorage.clear();
  // finalizarAguardar();
  window.location = "../public/login.html";
}

// carregamento (loading)
function aguardar() {
  var divAguardar = document.getElementById("div_aguardar");
  divAguardar.style.display = "flex";
}

function finalizarAguardar(texto) {
  var divAguardar = document.getElementById("div_aguardar");
  divAguardar.style.display = "none";

  var divErrosLogin = document.getElementById("div_erros_login");
  if (texto) {
    divErrosLogin.style.display = "flex";
    divErrosLogin.innerHTML = texto;
  }
}

// modal
function mostrarModal() {
  var divModal = document.getElementById("div_modal");
  divModal.style.display = "flex";
}

function fecharModal() {
  var divModal = document.getElementById("div_modal");
  divModal.style.display = "none";
}

function simular() {
  litros = Number(document.getElementById("inp_litros").value);
  vendaLitro = Number(document.getElementById("inp_venda_litro").value);
  custoProd = Number(document.getElementById("inp_custo_prod").value);

  let litrosCPerda = litros - litros * 0.1;
  let vendaFinal = vendaLitro - custoProd;
  let ganhoMes = vendaFinal * litrosCPerda;
  let ganhoAno = ganhoMes * 12;
  let perda = (litros - litrosCPerda) * vendaFinal * 12;

  let litrosCSolucao = litros - litros * 0.02;
  let vendaFinalSolucao = vendaLitro - custoProd;
  let ganhoMesSolucao = vendaFinal * litrosCSolucao;
  let ganhoAnoSolucao = ganhoMesSolucao * 12;
  let perdaSolucao = (litros - litrosCSolucao) * vendaFinal * 12;

  resultado.innerHTML = `
        <table id="tb-resultado">
            <tr class="titulos-table">
                <td></td>
                <td>Mês</td>
                <td>Ano</td>
                <td>Perda anual</td>
            </tr>
            <tr>
                <td class="title-colunm">Sem nossa solução</td>
                <td class="info-colunm" style="color: #d93838">R$ ${ganhoMes.toFixed(
    2
  )}</td>
                <td class="info-colunm" style="color: #d93838">R$ ${ganhoAno.toFixed(
    2
  )}</td>
                <td class="info-column" style="color: #d93838">R$ ${perda.toFixed(
    2
  )}</td>
            </tr>
            <tr>
                <td class="title-colunm">Com nossa solução</td>
                <td class="info-colunm" style="color: #6eb844">R$ ${ganhoMesSolucao.toFixed(
    2
  )}</td>
                <td class="info-colunm" style="color: #6eb844">R$ ${ganhoAnoSolucao.toFixed(
    2
  )}</td>
                <td class="info-column" style="color: #6eb844">R$ ${perdaSolucao.toFixed(
    2
  )}</td>
            </tr>
        </table>
    `;
}

function trocarPaginaDash() {
  var url = window.location.href;

  if (url.endsWith("dash-geral.html") == true) {
    window.location.href = "../armazem/dash-armazem.html";
  } else {
    window.location.href = "../geral/dash-geral.html";
  }
}

function dataHora() {
  const data = new Date();

  var dia = String(data.getDate()).padStart(2, "0");
  var mes = String(data.getMonth() + 1).padStart(2, "0");
  var ano = data.getFullYear();

  document.getElementById("span_data").innerHTML = `${dia}/${mes}/${ano}`;
}

function entrar() {
  aguardar();

  var emailVar = inp_email.value;
  var senhaVar = inp_senha.value;

  if (emailVar == "" || senhaVar == "") {
    cardErro.style.display = "block";
    mensagem_erro.innerHTML = "Preencha todos os campos";
    inp_email.style.borderColor = "#b03838";
    inp_senha.style.borderColor = "#b03838";
    finalizarAguardar();
    return false;
  } else {
    setInterval(sumirMensagem, 5000);
  }

  console.log("FORM LOGIN: ", emailVar);
  console.log("FORM SENHA: ", senhaVar);

  fetch("/empresa/autenticar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      emailServer: emailVar,
      senhaServer: senhaVar,
    }),
  })
    .then(function (resposta) {
      console.log("ESTOU NO THEN DO entrar()!");

      if (resposta.ok) {
        console.log(resposta);

        resposta.json().then((json) => {
          console.log(json);
          console.log(JSON.stringify(json));

          sessionStorage.ID_ARMAZEM = json.idArmazem;

          sessionStorage.NOME_EMPRESA = json.EmpresaNome;
          sessionStorage.ID_EMPRESA = json.idEmpresa;
          sessionStorage.ID_USUARIO = json.idUsuario;


          setTimeout(function () {
            window.location = "./dashboard/geral/dash-geral.html";
          }, 150); // apenas para exibir o loading
        });
      } else {
        console.log("Houve um erro ao tentar realizar o login!");

        resposta.text().then((texto) => {
          console.error(texto);
          finalizarAguardar(texto);
        });
      }
    })
    .catch(function (erro) {
      console.log(erro);
    });

  return false;
}

function sumirMensagem() {
  cardErro.style.display = "none";
}

function cadastrar() {
  //aguardar();
  //Recupere o valor da nova input pelo nome do id
  // Agora vá para o método fetch logo abaixo
  var nomeVar = inp_nome.value;
  var cnpjVar = inp_cnpj.value.replace(/\D+/g, "");
  var telVar = inp_telefone.value.replace(/\D+/g, "");
  var emailVar = inp_email.value;
  var senhaVar = inp_senha.value;
  var confiSenha = inp_confiSenha.value;

  if (confiSenha == senhaVar) {
    if (
      nomeVar == "" ||
      cnpjVar == "" ||
      telVar == "" ||
      emailVar == "" ||
      senhaVar == "" ||
      confiSenha == ""
    ) {
      cardErro.style.opacity = "1";
      mensagem_erro.innerHTML = "Preencha todos os campos";
      inp_senha.style.borderColor = "#b03838";
      inp_confiSenha.style.borderColor = "#b03838";
      inp_email.style.borderColor = "#b03838";
      inp_telefone.style.borderColor = "#b03838";
      inp_cnpj.style.borderColor = "#b03838";
      inp_nome.style.borderColor = "#b03838";
      finalizarAguardar();
      return false;
    } else if (cnpjVar.length == 14) {
      // Enviando o valor da nova input
      fetch("empresa/cadastrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // crie um atributo que recebe o valor recuperado aqui
          // Agora vá para o arquivo routes/empresa.js
          nomeServer: nomeVar,
          cnpjServer: cnpjVar,
          telServer: telVar,
          emailServer: emailVar,
          senhaServer: senhaVar,
        }),
      })
        .then(function (resposta) {
          console.log("resposta: ", resposta);

          if (resposta.ok) {
            cardErro.style.opacity = "1";

            modal.style.top = "0";

            setTimeout(() => {
              window.location = "login.html";
            }, "5000");

            limparFormulario();
            finalizarAguardar();
          } else {
            throw "Houve um erro ao tentar realizar o cadastro!";
          }
        })
        .catch(function (resposta) {
          console.log(`#ERRO: ${resposta}`);
          finalizarAguardar();
        });

      return false;
    } else {
      cardErro.style.opacity = "1";
      mensagem_erro.innerHTML = "O CNPJ está incorreto";
      inp_cnpj.style.borderColor = "#dd0000";

      finalizarAguardar();
      return false;
      setInterval(sumirMensagem, 5000);
    }
  } else {
    cardErro.style.opacity = "1";
    mensagem_erro.innerHTML = "As senhas não correspondem";
    inp_senha.style.borderColor = "#dd0000";
    inp_confiSenha.style.borderColor = "#dd0000";

    finalizarAguardar();
    return false;
  }
}
function sumirMensagem() {
  cardErro.style.opacity = "0";
}

function puxarUltimoMes(idEmpresa) {
  fetch(`/graficos/listarUltimoMes/${idEmpresa}`, { cache: 'no-store' }).then(function (response) {
    if (response.ok) {
        response.json().then(function (resposta) {
            // console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
            var respostaData = {};
            resposta.forEach(element => {
              if(element.tipo == 'temperatura') {
                respostaData.temp = element.registros
              } else if(element.tipo == 'umidade') {
                respostaData.umidd = element.registros
              } 
            });
            dataMonth.push(respostaData);
        });
    } else {
        console.error('Nenhum dado encontrado ou erro na API');
    }
})
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });

}

function puxarPenultimoMes(idEmpresa) {
  fetch(`/graficos/listarPenultimoMes/${idEmpresa}`, { cache: 'no-store' }).then(function (response) {
    if (response.ok) {
        response.json().then(function (resposta) {
            // console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
            var respostaData = {};
            resposta.forEach(element => {
              if(element.tipo == 'temperatura') {
                respostaData.temp = element.registros
              } else if(element.tipo == 'umidade') {
                respostaData.umidd = element.registros
              } 
            });
            dataMonth.push(respostaData);
        });
    } else {
        console.error('Nenhum dado encontrado ou erro na API');
    }
})
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });

}

function puxarAntepenultimoMes(idEmpresa) {
  fetch(`/graficos/listarAntepenultimoMes/${idEmpresa}`, { cache: 'no-store' }).then(function (response) {
    if (response.ok) {
        response.json().then(function (resposta) {
            // console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
            var respostaData = {};
            resposta.forEach(element => {
              if(element.tipo == 'temperatura') {
                respostaData.temp = element.registros
              } else if(element.tipo == 'umidade') {
                respostaData.umidd = element.registros
              } 
            });
            dataMonth.push(respostaData);
        });
    } else {
        console.error('Nenhum dado encontrado ou erro na API');
    }
})
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });

}

function puxarQuartoMes(idEmpresa) {
  fetch(`/graficos/listarQuartoMes/${idEmpresa}`, { cache: 'no-store' }).then(function (response) {
    if (response.ok) {
        response.json().then(function (resposta) {
            // console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
            var respostaData = {};
            resposta.forEach(element => {
              if(element.tipo == 'temperatura') {
                respostaData.temp = element.registros
              } else if(element.tipo == 'umidade') {
                respostaData.umidd = element.registros
              } 
            });
            dataMonth.push(respostaData);
        });
    } else {
        console.error('Nenhum dado encontrado ou erro na API');
    }
})
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });

}

function puxarPie(idEmpresa) {
  fetch(`/graficos/listarPie/${idEmpresa}`, {cache: 'no-store' }).then(function (response) {
    if (response.ok) {
        response.json().then(function (resposta) {
          resposta.forEach(element => {
            
          });
            console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
            return JSON.stringify(resposta)
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

    var dataAlertaTemp = [dataMonth[0].temp, dataMonth[1].temp, dataMonth[2].temp, dataMonth[3].temp];
    var dataAlertaUmidd = [dataMonth[0].umidd, dataMonth[1].umidd, dataMonth[2].umidd, dataMonth[3].umidd];

    // dataMonth.forEach(element => {
    //   dataAlertaTemp.push(element.temp);
    //   dataAlertaUmidd.push(element.umidd);
    // });

    console.log(dataAlertaTemp);
    console.log(dataAlertaUmidd);

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
  
    const ctxAlert = document.getElementById("chart-alert");
    new Chart(ctxAlert, {
      type: "bar",
      data: {
        labels: ["Janeiro", "Fevereiro", "Março", "Abril"],
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
  
    const ctxPorcent = document.getElementById("chart-porcent");
    new Chart(ctxPorcent, {
      type: "pie",
      data: {
        labels: ["Temperatura", "Umidade"],
        datasets: [
          {
            label: "# of Votes",
            data: [110, 108],
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
}
  /*ctxPorcent = document.getElementById("chart-porcent");

  new Chart(ctxPorcent, {
    type: "pie",
    data: {
      labels: ["Temperatura", "Umidade"],
      datasets: [
        {
          label: "# of Votes",
          data: [14, 56],
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


  return false;
}*/

/*  Cadastro do usuario */
function usuario() {
  //aguardar();
  //Recupere o valor da nova input pelo nome do id
  // Agora vá para o método fetch logo abaixo
  var emailUser = input_email.value;
  var senhaUser = input_senha.value;
  var confiSenha = input_confiSenha.value;

  if (confiSenha == senhaUser) {
    if (
      emailUser == "" ||
      senhaUser == "" ||
      confiSenha == ""
    ) {
      cardErro.style.opacity = "1";
      mensagem_erro.innerHTML = "Preencha todos os campos";
      input_senha.style.borderColor = "#b03838";
      input_confiSenha.style.borderColor = "#b03838";
      input_email.style.borderColor = "#b03838";
      finalizarAguardar();
      return false;
    } else {
      // Enviando o valor da nova input
      fetch("empresa/cadastrarUsuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // crie um atributo que recebe o valor recuperado aqui
          // Agora vá para o arquivo routes/empresa.js
          emailServer: emailUser,
          senhaServer: senhaUser,
        }),
      })
        .then(function (resposta) {
          console.log("resposta: ", resposta);

          if (resposta.ok) {
            cardErro.style.opacity = "1";

            modal.style.top = "0";

            setTimeout(() => {
              window.location = "login.html";
            }, "5000");

            limparFormulario();
            finalizarAguardar();
          } else {
            throw "Houve um erro ao tentar realizar o cadastro!";
          }
        })
        .catch(function (resposta) {
          console.log(`#ERRO: ${resposta}`);
          finalizarAguardar();
        });

      return false;
    }
  } else {
    cardErro.style.opacity = "1";
    mensagem_erro.innerHTML = "As senhas não correspondem";
    input_senha.style.borderColor = "#dd0000";
    input_confiSenha.style.borderColor = "#dd0000";

    finalizarAguardar();
    return false;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  puxarDados();
})
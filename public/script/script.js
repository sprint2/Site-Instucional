var nomeEmp = "Ola";
// animação da navbar
window.onscroll = function() {
    var nav = document.getElementById("navbar");
    var navLink = document.getElementsByClassName("nav-link");
    var logo = document.getElementById("logo");

    if(window.scrollY != 0) {
        nav.classList.add("navbar-ativo");
        for (var i = 0; i < navLink.length; i++) {
            navLink[i].classList.remove("link-animation")
            navLink[i].classList.add("nav-link-ativo");
            navLink[i].classList.add("link-animation-ativo");
        };
        logo.classList.add("logo-ativo");
    } else {
        nav.classList.remove("navbar-ativo");
        for (var i = 0; i < navLink.length; i++) {
            navLink[i].classList.remove("nav-link-ativo");
            navLink[i].classList.remove("link-animation-ativo");
            navLink[i].classList.add("link-animation")
            
        };
        logo.classList.remove("logo-ativo");
    };
}

// sessão
function validarSessao() {
    // aguardar();

    var email = sessionStorage.EMAIL_EMPRESA;
    var nome = sessionStorage.NOME_EMPRESA;

    if (email != null && nome != null) {
        nomeEmp = nome
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
    litros = Number(document.getElementById('inp_litros').value);
    vendaLitro = Number(document.getElementById('inp_venda_litro').value);
    custoProd = Number(document.getElementById('inp_custo_prod').value);


    let litrosCPerda = litros - (litros * 0.1);
    let vendaFinal = vendaLitro - custoProd;
    let ganhoMes = vendaFinal * litrosCPerda;
    let ganhoAno = ganhoMes * 12;
    let perda = ((litros - litrosCPerda) * vendaFinal) * 12;

    let litrosCSolucao = litros - (litros * 0.02);
    let vendaFinalSolucao = vendaLitro - custoProd;
    let ganhoMesSolucao = vendaFinal * litrosCSolucao;
    let ganhoAnoSolucao = ganhoMesSolucao * 12;
    let perdaSolucao = ((litros - litrosCSolucao) * vendaFinal) * 12;


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
                <td class="info-colunm" style="color: #d93838">R$ ${ganhoMes.toFixed(2)}</td>
                <td class="info-colunm" style="color: #d93838">R$ ${ganhoAno.toFixed(2)}</td>
                <td class="info-column" style="color: #d93838">R$ ${perda.toFixed(2)}</td>
            </tr>
            <tr>
                <td class="title-colunm">Com nossa solução</td>
                <td class="info-colunm" style="color: #6eb844">R$ ${ganhoMesSolucao.toFixed(2)}</td>
                <td class="info-colunm" style="color: #6eb844">R$ ${ganhoAnoSolucao.toFixed(2)}</td>
                <td class="info-column" style="color: #6eb844">R$ ${perdaSolucao.toFixed(2)}</td>
            </tr>
        </table>
    `
};

function trocarPaginaDash() {
    var url = window.location.href;

    if(url.endsWith('dash-geral.html') == true) {
        window.location.href = '../armazem/dash-armazem.html';
    }  else {
        window.location.href = '../geral/dash-geral.html';
    };
};

window.onload = function() {
    const data = new Date();

    var dia = String(data.getDate()).padStart(2, '0');
    var mes = String(data.getMonth()+1).padStart(2,"0");
    var ano = data.getFullYear();

    document.getElementById("span_data").innerHTML = `${dia}/${mes}/${ano}`;
};

function entrar() {
    aguardar();

    var emailVar = inp_email.value;
    var senhaVar = inp_senha.value;

    if (emailVar == "" || senhaVar == "") {
        cardErro.style.display = "block"
        mensagem_erro.innerHTML = "Preencha todos os campos";
        inp_email.style.borderColor = "#b03838";
        inp_senha.style.borderColor = "#b03838";
        finalizarAguardar();
        return false;
    }
    else {
        setInterval(sumirMensagem, 5000)
    }

    console.log("FORM LOGIN: ", emailVar);
    console.log("FORM SENHA: ", senhaVar);

    fetch("/empresa/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));

                sessionStorage.EMAIL_EMPRESA = json.email;
                sessionStorage.NOME_EMPRESA = json.nome;
                sessionStorage.ID_EMPRESA = json.id;

                setTimeout(function () {
                    window.location = "./dashboard/geral/dash-geral.html";
                }, 1000); // apenas para exibir o loading

            });

        } else {

            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                console.error(texto);
                finalizarAguardar(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}

function sumirMensagem() {
    cardErro.style.display = "none"
}

function cadastrar() {
    //aguardar();
    //Recupere o valor da nova input pelo nome do id
    // Agora vá para o método fetch logo abaixo
    var nomeVar = inp_nome.value;
    var cnpjVar = inp_cnpj.value.replace(/\D+/g, '');
    var telVar = inp_telefone.value.replace(/\D+/g, '');
    var emailVar = inp_email.value;
    var senhaVar = inp_senha.value;
    var confiSenha = inp_confiSenha.value;

    if (confiSenha == senhaVar) {
        if (nomeVar == "" || cnpjVar == "" || telVar == "" || emailVar == "" || senhaVar == "" || confiSenha == "") {
            cardErro.style.opacity = "1"
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
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    // crie um atributo que recebe o valor recuperado aqui
                    // Agora vá para o arquivo routes/empresa.js
                    nomeServer: nomeVar,
                    cnpjServer: cnpjVar,
                    telServer: telVar,
                    emailServer: emailVar,
                    senhaServer: senhaVar
                })
            }).then(function (resposta) {

                console.log("resposta: ", resposta);

                if (resposta.ok) {
                    cardErro.style.opacity = "1";

                    modal.style.top = '0'

                    setTimeout(() => {
                        window.location = "login.html";
                    }, "2500")

                    limparFormulario();
                    finalizarAguardar();
                } else {
                    throw ("Houve um erro ao tentar realizar o cadastro!");
                }
            }).catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
                finalizarAguardar();
            });

            return false;
        } else {
            cardErro.style.opacity = "1"
            mensagem_erro.innerHTML = "O CNPJ está incorreto";
            inp_cnpj.style.borderColor = "#dd0000"

            finalizarAguardar();
            return false;
            setInterval(sumirMensagem, 5000)
        }


    } else {
        cardErro.style.opacity = "1"
        mensagem_erro.innerHTML = "As senhas não correspondem";
        inp_senha.style.borderColor = "#dd0000";
        inp_confiSenha.style.borderColor = "#dd0000"

        finalizarAguardar();
        return false;
    }
}
function sumirMensagem() {
    cardErro.style.opacity = "0"
}
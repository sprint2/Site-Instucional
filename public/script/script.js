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
        
    } else {
        window.location = "../login.html";
    }
}

function limparSessao() {
    // aguardar();
    sessionStorage.clear();
    // finalizarAguardar();
    window.location = "../login.html";
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
    litros = Number(document.getElementById('inp_litros').value)
    vendaLitro = Number(document.getElementById('inp_venda_litro').value)
    custoProd = Number(document.getElementById('inp_custo_prod').value)


    let litrosCPerda = litros - (litros * 0.1)
    let vendaFinal = vendaLitro - custoProd
    let ganhoMes = vendaFinal * litrosCPerda
    let ganhoAno = ganhoMes * 12
    let perda = ((litros - litrosCPerda) * vendaFinal) * 12

    let litrosCSolucao = litros - (litros * 0.02)
    let vendaFinalSolucao = vendaLitro - custoProd
    let ganhoMesSolucao = vendaFinal * litrosCSolucao
    let ganhoAnoSolucao = ganhoMesSolucao * 12
    let perdaSolucao = ((litros - litrosCSolucao) * vendaFinal) * 12


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
}
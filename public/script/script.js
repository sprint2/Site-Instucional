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
                    <div class="table-titulos">
                        <table id="tb-resultado">
                            <tr class="titulos">
                                <td></td>
                                <th class="novo">Mês</tsd>
                                <th class="novo">Ano</td>
                                <th class="novo">Perda anual</td>
                            </tr>
                            <tr>
                                <td id="title-colunm">Sem nossa solução</td>
                                <td id="info-colunm">R$ ${ganhoMes.toFixed(2)}</td>
                                <td id="info-colunm">R$ ${ganhoAno.toFixed(2)}</td>
                                <td style="color: red" id="info-table">R$ ${perda.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td id="title-colunm">Com nossa solução</td>
                                <td id="info-colunm">R$ ${ganhoMesSolucao.toFixed(2)}</td>
                                <td id="info-colunm">R$ ${ganhoAnoSolucao.toFixed(2)}</td>
                                <td style="color: green" id="info-table">R$ ${perdaSolucao.toFixed(2)}</td>
                            </tr>
                        </table>
                    </div>
                    <style>
                    #resultado {
                        display: flex;
                        align-items: center;
                        width: 60%;
                        background-color: #FFFFFF;
                        font-family: 'Inter';
                        font-style: normal;
                        border-radius: 15px;
                        margin: 0 0 5% 0;
                        padding: 0 0 0 1%;
                    }
                    </style>
    `
}
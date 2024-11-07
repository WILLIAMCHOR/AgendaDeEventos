/* Armazenamento */
let lista = localStorage.listaDeEventos ? JSON.parse(localStorage.listaDeEventos) : [];

/* Vinculando o HTML */
const buAbrirFechar = document.querySelector('#buCriarFechar');

const form = document.querySelector('#form');
const buTarefa = document.querySelector('#modoTarefa');
    const inData = document.querySelector('#inData');
    const inProva = document.querySelector('#inProva');
    const inDisciplina = document.querySelector('#inDisciplina');

const divTarefa = document.querySelector('#tarefas');
const divEvento = document.querySelector('#eventos');

/* Date */
const atual = new Date();

/* Limitanto o ano */
inData.setAttribute('min', atual.getFullYear() + '-01-01');
inData.setAttribute('max', atual.getFullYear() + '-12-31');

/* Abrir */

function formulario() {
    if (form.className == '') {
        abrirForm();
    }
    else {
        fecharForm();
    }
}
    function abrirForm() {
        form.className = 'aberto';
        buAbrirFechar.className = 'criarFechar fechar';
    }
    function fecharForm() {
        form.className = '';
        buAbrirFechar.className = 'criarFechar';
        resetarForm();
        if (buTarefa.className == 'tarefa') {
        buTarefa.className = '';
        }
        /*
        if (modoEditar == 1) {
            modoEditar--;
        }
        */
    }
function resetarForm() {
    inData.value = "";
    inProva.value = "";
    inDisciplina.value = "";
    inData.className = 'input';
    inProva.className = 'input';
    inDisciplina.className = 'input';
}
/* Teclado */
document.onkeydown = (event) => {
    if (form.className == 'aberto') {
        if (event.key === 'Escape') {
            fecharForm();
        }
    }
}
/* Button tarefa */
function tarefado() {
    if (buTarefa.className == '') {
        buTarefa.className = 'tarefa';
    }
    else {
        buTarefa.className = '';
    }
}
/* Verificar Input's */
    function verificaData() {
        if (inData.value == "") {
            inData.className = 'input error';
        }
        else {
            inData.className = '';
        }
    }
    function verificaProva() {
        if (inProva.value == "") {
            inProva.className = 'input error';
        }
        else {
            inProva.className = '';
        }
    }
    function verificaDisciplina() {
        if (inDisciplina.value == "") {
            inDisciplina.className = 'input error';
        }
        else {
            inDisciplina.className = '';
        }
    }
function verificar() {
    if (buTarefa.className == '') {
        verificaData();
    }
    else {
        inData.className = '';
    }
    verificaProva();
    verificaDisciplina();

    const errorInput = form.querySelectorAll('.input.error');
    const validar = [...errorInput].every((item) => {
        return item.className == '';
    });
    if (validar == true) {
        /* Tudo certo */
        /* adicionarNaLista(); */
        /* organizador(); */
        fecharForm();
    }
}
form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (modoEditar == 1) {
        const localEditado = lista.indexOf(blocoEditado);
        lista.splice(localEditado, 1);
        modoEditar--;
    }
    verificar();
});

let ids = 0; /* Númeração da id's */

function adicionarNaLista() {
    /* CRIAR BLOCO DO ZERO */
    const linha = document.createElement('div');
    linha.className = 'linha-data';
    linha.id = 'bloco' + ids;
    const valoresLinha = document.createElement('div');
    valoresLinha.className = 'valores-data';
    valoresLinha.id = 'valoresData';
    linha.appendChild(valoresLinha);

    const botoes = document.createElement('div');
    botoes.className = 'botoes-data';
    linha.appendChild(botoes);

    for (let i = 0; i < 2; i ++) {
        const botao = document.createElement('button');
        const span = document.createElement('span');

        if (i == 0) {
            botao.setAttribute('onclick','editarEvento('+ids+')');
            span.className = 'fas fa-pencil';
        }
        else {
            botao.className = 'button-lixeira';
            botao.setAttribute('onclick','excluirEvento('+ids+')');
            span.className = 'fas fa-trash-can';
        }
        botao.appendChild(span);
        botoes.appendChild(botao);
    }
    /* CRIAR UM OBJETO COM OS VALORES */
    const itemBloco = {bloco: linha};
    if (buTarefa.className == 'tarefa') {
        itemBloco.mes = 0;
        itemBloco.dia = 0;
        itemBloco.tarefa = 'Tarefa';
    }
    else {
        let dataQuebrada = inData.value;
        dataQuebrada = Array.from(dataQuebrada);
        itemBloco.mes = dataQuebrada[5] + "" + dataQuebrada[6];
        itemBloco.dia = dataQuebrada[8] + "" + dataQuebrada[9];
        itemBloco.tarefa = ""
    }
    itemBloco.prova = inProva.value;
    itemBloco.disciplina = inDisciplina.value;
    itemBloco.identificador = 'bloco' + ids;

    /* MUDANDO A ID */
    ids++;
    /* ENVIAR O OBJETO AO BANCO DE DADOS */
    listaEventos.push(itemBloco);
    localStorage.setItem('listaEventos', JSON.stringify(listaEventos));
}

function organizador() {
    if (listaEventos.length != 0) {
        for(cadaEvento of listaEventos) {
            /* VINCULANDO OS VALORES DE CADA BLOCO */
            const paragrafo = cadaEvento.bloco.children[0];
            paragrafo.innerHTML = "";
    
            const valoresInput = [];
            if (cadaEvento.tarefa == "Tarefa") {
                valoresInput.push("Tarefa");
            }
            else {
                valoresInput.push(cadaEvento.dia + "/" + cadaEvento.mes);
            }
            valoresInput.push(cadaEvento.prova, cadaEvento.disciplina);
    
            for (cadaInput of valoresInput) {
                const text = document.createElement('p');
                /* VALIDADE DA DATA DO EVENTO */
                if (cadaEvento.tarefa != "Tarefa") {
                    if (diaAtual.getMonth() + 1 > cadaEvento.mes) {
                        text.setAttribute('style', 'color: red');
                    }
                    else if (diaAtual.getDate() > cadaEvento.dia && diaAtual.getMonth() + 1 == cadaEvento.mes) {
                        text.setAttribute('style', 'color: red');
                    }
                }
                text.textContent = cadaInput;
                paragrafo.appendChild(text);
            }
        }
        /* ORGAZINANDO */
        divEvento.innerHTML = "";
        listaEventos.sort((a, b) => {
            if (a.tarefa == 'Tarefa') {
                divTarefa.appendChild(a.bloco);
            }
            else if (a.mes < b.mes) {
                return -1;
            }
            else if (a.mes == b.mes && a.dia < b.dia) {
                return -1;
            }
            else {
                return true;
            }
        });
        /* EXIBINDO */
        for (cadaEvento of listaEventos) { 
            if (cadaEvento.tarefa != 'Tarefa') {
                divEvento.appendChild(cadaEvento.bloco);
            }
        }
    }
}
/* BOTÕES */
let modoEditar = 0;
let blocoEditado = document.body;
function editarEvento(id) {
    const itemBloco = listaEventos.find((a) => a.identificador == 'bloco' + id);
    if (itemBloco.tarefa == 'Tarefa') {
        buTarefa.className = 'tarefa';
    }
    else {
        inData.value = '2024' + '-' + itemBloco.mes + '-' + itemBloco.dia;
    }
    inProva.value = itemBloco.prova;
    inDisciplina.value = itemBloco.disciplina;
    modoEditar++;
    blocoEditado = itemBloco;
    AbrirForm();
}
function excluirEvento(id) {
    const localItemBloco = listaEventos.indexOf(listaEventos.find((a) => a.identificador == 'bloco' + id));
    if (localItemBloco > -1) {
        listaEventos.splice(localItemBloco, 1);
        localStorage.setItem('listaEventos', JSON.stringify(listaEventos));
    }
    document.getElementById('bloco' + id).outerHTML = '';

}
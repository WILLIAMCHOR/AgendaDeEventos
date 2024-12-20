const buttonAbrirFecharForm = document.querySelector('#button-Abrir-Form'); /* Terei que refazer todo o código, será mais fácil recriar do que arrumar tudo aqui */
const sectionForm = document.querySelector('#section-form');
const form = sectionForm.querySelector('#form');
const buttonModoTarefa = form.querySelector('#button-Modo-Tarefa');

const inputData = form.querySelector('#input-data');
const inputProva = form.querySelector('#input-prova');
const inputDisciplina = form.querySelector('#input-disciplina');

const sectionDatas = document.querySelector('#sectionDatas');

let listaEventos = localStorage.getItem('navegador') ? JSON.parse(localStorage.getItem('navegador')) : [];

/* DIA ATUAL */
let diaAtual = new Date();
inputData.setAttribute('min', diaAtual.getFullYear() + '-01-01');
inputData.setAttribute('max', diaAtual.getFullYear() + '-12-31');

/* SUBMIT */
form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (modoEditar == 1) {
        const localEditado = listaEventos.indexOf(blocoEditado)
        listaEventos.splice(localEditado, 1);
        modoEditar--;
    }
    verificar();
});
/* ABRIR / FECHAR */
function ativarAbrirFecharForm() {
    if (sectionForm.className == 'section-form') {
        AbrirForm();
    }
    else {
        fecharForm();
    }
}
function AbrirForm() {
    sectionForm.className = 'section-form opacito';
    buttonAbrirFecharForm.className = 'button-Abrir-Form fechar';
}
function fecharForm() {
    sectionForm.className = 'section-form';
    buttonAbrirFecharForm.className = 'button-Abrir-Form';
    resetarForm();
    if (buttonModoTarefa.className == 'buttonTarefa') {
        buttonModoTarefa.className = 'button';
    }
    if (modoEditar == 1) {
        modoEditar--;
    }
}
function resetarForm() {
    inputData.value = "";
    inputProva.value = "";
    inputDisciplina.value = "";
    inputData.className = 'input';
    inputProva.className = 'input';
    inputDisciplina.className = 'input';
}
/* TECLADO */
document.onkeydown = (event) => {
    if (sectionForm.className == 'section-form opacito') {
        if (event.key === 'Escape') {
            fecharForm();
        }
    }
}
/* MODO TAREFA */
function tarefado() {
    if (buttonModoTarefa.className == 'button') {
        buttonModoTarefa.className = 'buttonTarefa';
    }
    else {
        buttonModoTarefa.className = 'button';
    }
}
/* VERIFICAR INPUTS */
function verificaData() {
    if (inputData.value == "") {
        inputData.className = 'input error';
    }
    else {
        inputData.className = 'input';
    }
}
function verificaProva() {
    if (inputProva.value == "") {
        inputProva.className = 'input error';
    }
    else {
        inputProva.className = 'input';
    }
}
function verificaDisciplina() {
    if (inputDisciplina.value == "") {
        inputDisciplina.className = 'input error';
    }
    else {
        inputDisciplina.className = 'input';
    }
}
function verificar() {
    if (buttonModoTarefa.className == 'button') {
        verificaData();
    }
    else {
        inputData.className = 'input';
    }
    verificaProva();
    verificaDisciplina();

    const errorInput = form.querySelectorAll('.input.error');
    const validar = [...errorInput].every((item) => {
        return item.className == 'input';
    });
    if (validar == true) {
        /* EXECUTA SE TIVER TUDO NOS CONFORMES */
        adicionarNaLista();
        organizador();
        fecharForm();
    }
}
let ids = 0;
function adicionarNaLista() {
    /* CRIAR UM OBJETO COM OS VALORES */
    const itemBloco = {};
    if (buttonModoTarefa.className == 'buttonTarefa') {
        itemBloco.mes = 0;
        itemBloco.dia = 0;
        itemBloco.tarefa = 'Tarefa';
    }
    else {
        let dataQuebrada = inputData.value;
        dataQuebrada = Array.from(dataQuebrada);
        itemBloco.mes = dataQuebrada[5] + "" + dataQuebrada[6];
        itemBloco.dia = dataQuebrada[8] + "" + dataQuebrada[9];
        itemBloco.tarefa = "";
    }
    itemBloco.prova = inputProva.value;
    itemBloco.disciplina = inputDisciplina.value;
    itemBloco.identificador = ids;


    /* ENVIAR O OBJETO AO BANCO DE DADOS */
    listaEventos.push(itemBloco);
    localStorage.setItem('navegador', JSON.stringify(listaEventos));
    /* Somando */
    ids++;
}
function organizador() {
    if (listaEventos.length != 0) {
        for(itemBloco of listaEventos) {
            /* CRIAR BLOCO DO ZERO */
            const linha = document.createElement('div');
            linha.className = 'linha-data';
            linha.id = itemBloco.identificador;
            
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
                    botao.setAttribute('onclick','editarEvento('+itemBloco.identificador+')');
                    span.className = 'fas fa-pencil';
                }
                else {
                    botao.className = 'button-lixeira';
                    botao.setAttribute('onclick','excluirEvento('+itemBloco.identificador+')');
                    span.className = 'fas fa-trash-can';
                }
                botao.appendChild(span);
                botoes.appendChild(botao);
            } 
            /* VINCULANDO OS VALORES DE CADA BLOCO */
            const paragrafo = linha.children[0];
    
            const valoresInput = [];
            if (itemBloco.tarefa == "Tarefa") {
                valoresInput.push("Tarefa");
            }
            else {
                valoresInput.push(itemBloco.dia + "/" + itemBloco.mes);
            }
            valoresInput.push(itemBloco.prova, itemBloco.disciplina);
    
            for (cadaInput of valoresInput) {
                const text = document.createElement('p');
                /* VALIDADE DA DATA DO EVENTO */
                if (itemBloco.tarefa != "Tarefa") {
                    if (diaAtual.getMonth() + 1 > itemBloco.mes) {
                        text.setAttribute('style', 'color: red');
                    }
                    else if (diaAtual.getDate() > itemBloco.dia && diaAtual.getMonth() + 1 == itemBloco.mes) {
                        text.setAttribute('style', 'color: red');
                    }
                }
                text.textContent = cadaInput;
                paragrafo.appendChild(text);
            }
            itemBloco.bloco = linha;
        }

        /* ORGAZINANDO */
        sectionDatas.innerHTML = "";
        listaEventos.sort((a, b) => {
            if (a.tarefa == 'Tarefa') {
                return -1
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
        for (itemBloco of listaEventos) { 
            sectionDatas.appendChild(itemBloco.bloco);
        }
    }
}
/* BOTÕES */
let modoEditar = 0;
let blocoEditado = document.body;
function editarEvento(id) {
    const itemBloco = listaEventos.find((a) => a.identificador == id);
    console.log(itemBloco);
    if (itemBloco.tarefa == 'Tarefa') {
        buttonModoTarefa.className = 'buttonTarefa';
    }
    else {
        inputData.value = '2024' + '-' + itemBloco.mes + '-' + itemBloco.dia;
    }
    inputProva.value = itemBloco.prova;
    inputDisciplina.value = itemBloco.disciplina;
    modoEditar++;
    blocoEditado = itemBloco;
    AbrirForm();
}
function excluirEvento(id) {
    const localItemBloco = listaEventos.indexOf(listaEventos.find((a) => a.identificador == id));
    if (localItemBloco > -1) {
        listaEventos.splice(localItemBloco, 1);
    }
    document.getElementById(id).outerHTML = '';
    localStorage.setItem('navegador', JSON.stringify(listaEventos));   
}
organizador();
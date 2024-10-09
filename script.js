const buttonAbrirFecharForm = document.querySelector('#button-Abrir-Form');
const buttonModoTarefa = document.querySelector('#button-Modo-Tarefa');
    const buttonEditar = document.querySelector('#button-Editar-Item');
    const buttonDuplicar = document.querySelector('#button-Duplicar-Item');
    const buttonExcluir = document.querySelector('#button-Excluir-Item');

const sectionForm = document.querySelector('#section-form');
const form = document.querySelector('#form');
    const inputData = document.querySelector('#input-data');
    const inputProva = document.querySelector('#input-prova');
    const inputDisciplina = document.querySelector('#input-disciplina');

const sectionDatas = document.querySelector('#sectionDatas');
const linhaOriginal = document.querySelector('#linhaOriginal');

let listaEventos = []; /* ARMAZENAMENTO DAS INFORMAÇÕES */

form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    verificar();
    /* ORGAZINADOR */
});

/* ABRIR / FECHAR */
let timerAbrirFecharForm = 0;
function ativarAbrirFecharForm() {
    if (timerAbrirFecharForm == 0) {
        AbrirForm();
    }
    else {
        fecharForm();
    }
}
function AbrirForm() {
    sectionForm.className = 'section-form opacito';
    buttonAbrirFecharForm.className = 'button-Abrir-Form fechar';
    timerAbrirFecharForm ++;
}
function fecharForm() {
    sectionForm.className = 'section-form';
    buttonAbrirFecharForm.className = 'button-Abrir-Form';
    resetarForm();
    if (timerTarefa == 1) {
        buttonModoTarefa.className = 'button';
        timerTarefa --;
    }
    timerAbrirFecharForm --;
}
function resetarForm() {
    inputData.value = "";
    inputProva.value = "";
    inputDisciplina.value = "";
    inputData.className = 'input';
    inputProva.className = 'input';
    inputDisciplina.className = 'input';
}
/* BOTÕES */
document.onkeydown = (event) => {
    if (timerAbrirFecharForm == 1) {
        if (event.key === 'Escape') {
            fecharForm();
        }
    }
}
/* MODO TAREFA */
let timerTarefa = 0;
function tarefado() {
    if (timerTarefa == 0) {
        buttonModoTarefa.className = 'button tarefa';
        timerTarefa ++;
    }
    else {
        buttonModoTarefa.className = 'button';
        timerTarefa --;
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
    if (timerTarefa == 0) {
        verificaData();
    }
    verificaProva();
    verificaDisciplina();

    const errorInput = form.querySelectorAll('.input.error');
    const validar = [...errorInput].every((item) => {
        return item.className == 'input';
    });
    if (validar == true) {
        /* EXECUTAR */
        criarEvento();
        organizador();
        fecharForm();
    }
}

function criarEvento() {
    const linhaClonada = linhaOriginal.cloneNode(true);
    linhaClonada.id = Date.now;
    const paragrafo = linhaClonada.children[0];

    const valoresInput = [];

    const itemBloco = {bloco: linhaClonada};
    if (timerTarefa == 1) {
        itemBloco.mes = 0;
        itemBloco.dia = 0;
        itemBloco.tarefa = 'Tarefa';

        valoresInput.push('Tarefa');
    }
    else {
        let dataQuebrada = inputData.value;
        dataQuebrada = Array.from(dataQuebrada);
        itemBloco.mes = dataQuebrada[5] + "" + dataQuebrada[6];
        itemBloco.dia = dataQuebrada[8] + "" + dataQuebrada[9];
        itemBloco.tarefa = ""

        valoresInput.push(itemBloco.dia + "/" + itemBloco.mes);
    }
    listaEventos.push(itemBloco);

    valoresInput.push(inputProva.value, inputDisciplina.value);
    /* COLACANDO OS VALORES NO BLOCO */
    for (cadaInput of valoresInput) {
        const text = document.createElement('p');
        text.textContent = cadaInput;
        paragrafo.appendChild(text);
    }
}

function organizador() {
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
    for (cadaEvento of listaEventos) {
        sectionDatas.appendChild(cadaEvento.bloco);
        console.log(cadaEvento);
    }
}
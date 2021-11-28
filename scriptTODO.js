const lista = document.getElementById('lista-tarefas');
const input = document.getElementById('texto-tarefa');
const btnCriar = document.getElementById('criar-tarefa');
const btnApagarTudo = document.getElementById('apaga-tudo');
const btnRemFinalizados = document.getElementById('remover-finalizados');
const btnSalvar = document.getElementById('salvar-tarefas');
const btnUp = document.getElementById('mover-cima');
const btnDown = document.getElementById('mover-baixo');
const btnRemSelectd = document.getElementById('remover-selecionado');
const selectedOn = '.selectedOn';

// 1 -referência sobre regex https://stackoverflow.com/questions/51413988/regular-expressions-a-z0-9-in-javascript
// 2 -referência sobre método match() https://www.freecodecamp.org/news/javascript-regex-match-example-how-to-use-the-js-replace-method-on-a-string/
// 3 -referência sobre propriedade textContent https://stackoverflow.com/questions/10370204/how-can-get-the-text-of-a-div-tag-using-only-javascript-no-jquery

function criarItem() {
  const checkInput = /^[0-9]+$/;
  const itemLista = document.createElement('li');

  itemLista.textContent = input.value;

  if (!itemLista.textContent.match(checkInput) && input.value) {
    lista.append(itemLista);
  } else { alert('Entrada inválida'); }
  input.value = '';
}

function apagarTudo() {
  lista.innerHTML = '';
}

function selectItem(e) {
  const select = e.target;
  const clickedOn = document.querySelector('.selectedOn');
  if (clickedOn) {
    clickedOn.classList.remove('selectedOn');
  }
  if (select === lista) { return; }
  select.classList.add('selectedOn');
}

function completedItem(e) {
  const select = e.target;
  const clickedOn = document.querySelector('.completed');
  if (!select.classList.contains('completed')) {
    select.classList.add('completed');
  } else if (clickedOn.classList.contains('completed')) {
    clickedOn.classList.remove('completed');
  }
}

// referência sobre salvar e carregar itens do localStorage https://stackoverflow.com/questions/8734906/using-localstorage-in-web-app-to-save-load-form-fields
function loadSavedItems() {
  const savedItems = localStorage.getItem('data');
  lista.innerHTML = savedItems;
}

function removFinalizados() {
  const clickedOn = document.querySelectorAll('.completed');
  clickedOn.forEach((e) => {
    e.remove();
  });
}

function salvar() {
  const content = lista.innerHTML;
  localStorage.setItem('data', content);
}

// referência sobre mover elementos https://stackoverflow.com/questions/10716986/swap-two-html-elements-and-preserve-event-listeners-on-them

function moveItemUp() {
  const clickedOn = document.querySelector(selectedOn);
  if (!clickedOn) return;
  const previousItem = clickedOn.previousSibling;
  if (previousItem) { lista.insertBefore(clickedOn, previousItem); }
}

function moveItemDown() {
  const clickedOn = document.querySelector(selectedOn);
  if (!clickedOn) return;
  const nextItem = clickedOn.nextSibling;
  if (nextItem) { lista.insertBefore(nextItem, clickedOn); }
}

function remSelected() {
  const selected = document.querySelector(selectedOn);
  if (selected === lista || !selected) { return; }
  selected.remove('selected');
}

// referência sobre eventos de teclado https://www.freecodecamp.org/news/javascript-keycode-list-keypress-event-key-codes/

input.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') { criarItem(); }
});
btnCriar.addEventListener('click', criarItem);
btnApagarTudo.addEventListener('click', (apagarTudo));
btnRemFinalizados.addEventListener('click', (removFinalizados));
btnSalvar.addEventListener('click', (salvar));
lista.addEventListener('click', selectItem);
lista.addEventListener('dblclick', completedItem);
btnUp.addEventListener('click', moveItemUp);
btnDown.addEventListener('click', moveItemDown);
btnRemSelectd.addEventListener('click', (remSelected));
loadSavedItems();

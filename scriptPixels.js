const grid = document.getElementById('pixel-board');
const pixels = grid.children;
const palette = document.getElementById('color-palette');
const bgColor = 'background-color';
const btn = document.getElementById('clear-board');
const generate = document.getElementById('generate-board');

const layout = (n) => {
  for (let i = 0; i < n; i += 1) {
    const div = document.createElement('div');
    div.classList.add('pixel');
    grid.appendChild(div);
    div.style.setProperty(bgColor, 'white');
    div.style.setProperty('height', '40px');
    div.style.setProperty('width', '40px');
  }
};

const colorSelectors = palette.children;
const color1 = colorSelectors[0];
const color2 = colorSelectors[1];
const color3 = colorSelectors[2];
const color4 = colorSelectors[3];

const colorsArr = ['cadetblue', 'slateblue', 'orangered', 'navy', 'seagreen', 'gold', 'gray'];
const randomColor = (arr) => {
  const color = [Math.floor(Math.random() * arr.length)];
  return arr[color];
};

color1.style.setProperty(bgColor, 'black');
color2.style.setProperty(bgColor, randomColor(colorsArr));
color3.style.setProperty(bgColor, randomColor(colorsArr));
color4.style.setProperty(bgColor, randomColor(colorsArr));

const color2Value = window.getComputedStyle(color2).getPropertyValue(bgColor);
const color3Value = window.getComputedStyle(color3).getPropertyValue(bgColor);
const color4Value = window.getComputedStyle(color4).getPropertyValue(bgColor);

if (color2Value === color3Value || color2Value === color4Value) {
  color2.style.setProperty(bgColor, 'midnightblue');
}
if (color3Value === color4Value) {
  color3.style.setProperty(bgColor, 'maroon');
}

let currentColor = palette.firstElementChild;
currentColor.classList.add('selected');
palette.addEventListener('click', (e) => {
  const newColor = e.target;
  if (newColor.classList.contains('color')) {
    newColor.classList.add('selected');
    currentColor.classList.remove('selected');
    currentColor = newColor;
  }
  if (newColor.classList.contains('color', 'selected')) {
    newColor.classList.add('selected');
  }
});

document.addEventListener('click', (e) => {
  if (e.target.matches('.pixel')) {
    const paint = e.target;
    paint.style.backgroundColor = currentColor.style.backgroundColor;
  }
});

btn.addEventListener('click', () => {
  for (let j = 0; j < pixels.length; j += 1) {
    pixels[j].style.backgroundColor = 'white';
  }
});

function redefineGrid(number) {
  grid.style.setProperty('grid-template-rows', `repeat(${number}, 2fr)`);
  grid.style.setProperty('grid-template-columns', `repeat(${number}, 2fr)`);
}

generate.addEventListener('click', () => {
  let newGrid = document.getElementById('board-size').value;
  if (newGrid > 50) {
    grid.innerHTML = '';
    newGrid = 50;
    redefineGrid(newGrid);
    layout(newGrid * newGrid);
  }
  if (newGrid < 5) {
    grid.innerHTML = '';
    newGrid = 5;
    redefineGrid(newGrid);
    layout(newGrid * newGrid);
  }
  if (newGrid !== '') {
    grid.innerHTML = '';
    redefineGrid(newGrid);
    layout(newGrid * newGrid);
  }
});

generate.addEventListener('click', () => {
  const newGrid = document.getElementById('board-size').value;
  if (newGrid === '') {
    alert('Board inválido!');
  }
});

layout(25);

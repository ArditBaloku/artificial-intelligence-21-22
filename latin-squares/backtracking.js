const { parseArguments, printTable, delay } = require('./utils');

const [n, interactive] = parseArguments();
const table = new Array(n).fill().map((x) => new Array(n).fill(0));

if (placeNumber(0)) {
  console.clear();
  printTable(table);
}

function placeNumber(index) {
  if (index === n * n) return true;

  const [row, column] = [Math.floor(index / n), index % n];

  for (let i = 1; i <= n; i++) {
    if (!canNumberBePlaced(row, column, i)) continue;

    table[row][column] = i;

    if (interactive) {
      delay(0.3);
      console.clear();
      printTable(table);
    }

    if (placeNumber(index + 1)) return true;

    table[row][column] = 0;

    if (interactive) {
      delay(0.3);
      console.clear();
      printTable(table);
    }
  }

  return false;
}

function canNumberBePlaced(row, column, number) {
  for (let i = 0; i < n; i++)
    if (table[row][i] === number || table[i][column] === number) return false;

  return true;
}

const { parseArguments, printTable, delay } = require('./utils');

const [n, interactive] = parseArguments();
const table = new Array(n).fill().map((x) => new Array(n).fill(0));
const tableDomains = new Array(n)
  .fill()
  .map((x) => new Array(n).fill().map((y) => new Array(n).fill(1)));

if (placeNumber(0)) {
  console.clear();
  printTable(table);
}

function placeNumber(index) {
  if (index === n * n) return true;

  const [row, column] = [Math.floor(index / n), index % n];

  for (let i = 1; i <= n; i++) {
    if (tableDomains[row][column][i - 1] === 0) continue;

    table[row][column] = i;

    if (interactive) {
      delay(0.3);
      console.clear();
      printTable(table);
    }

    const domainsRemoved = [];
    for (let j = 0; j < n; j++) {
      if (tableDomains[row][j][i - 1] === 1) {
        tableDomains[row][j][i - 1] = 0;
        domainsRemoved.push([row, j]);
      }

      if (tableDomains[j][column][i - 1] === 1) {
        tableDomains[j][column][i - 1] = 0;
        domainsRemoved.push([j, column]);
      }
    }

    if (placeNumber(index + 1)) return true;

    for (const [row, column] of domainsRemoved) {
      tableDomains[row][column][i - 1] = 1;
    }

    table[row][column] = 0;
  }

  return false;
}

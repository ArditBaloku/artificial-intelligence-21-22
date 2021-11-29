const { parseArguments, printTable } = require('./cli-parser');

const [n, algo] = parseArguments();

search();

function search() {
  const firstTable = new Array(n).fill().map((x) => new Array(n).fill(0));
  const tablesToVisit = [firstTable];
  const visitedTables = new Map();

  while (true) {
    if (!tablesToVisit.length) {
      console.log('No solution found');
      return;
    }

    const currentTable = algo === 'dfs' ? tablesToVisit.pop() : tablesToVisit.shift();

    if (isSolution(currentTable)) {
      printTable(currentTable);
      return;
    }

    const hash = calculateTableHash(currentTable);
    if (!visitedTables.has(hash)) visitedTables.set(hash, []);

    visitedTables.get(hash).push(currentTable);

    const newTables = generateChildrenTables(currentTable);

    for (const table of newTables) {
      if (!tableExistsInArray(table, tablesToVisit) || !tableExistsInArray(table, visitedTables))
        tablesToVisit.push(table);
    }
  }
}

function isSolution(table) {
  for (let i = 0; i < n; i++) {
    if (!isRowValid(table, i) || !isColumnValid(table, i)) return false;
  }

  return true;
}

function isRowValid(table, row) {
  if (
    Array.from(new Set(table[row])).length !== n ||
    table[row].reduce((acc, curr) => acc + curr, 0) !== (n * (n + 1)) / 2
  )
    return false;

  return true;
}

function isColumnValid(table, column) {
  const nums = [];
  let sum = 0;

  for (const row of table) {
    nums.push(row[column]);
    sum += row[column];
  }

  if (Array.from(new Set(nums)).length !== n || sum !== (n * (n + 1)) / 2) return false;

  return true;
}

function generateChildrenTables(table) {
  let [rowOfEmptyCell, columnOfEmptyCell] = [0, 0];
  for (let i = 0; i < n; i++)
    for (let j = 0; j < n; j++)
      if (table[i][j] === 0) {
        [rowOfEmptyCell, columnOfEmptyCell] = [i, j];
        return new Array(n).fill().map((x, index) => {
          x = JSON.parse(JSON.stringify(table));
          x[rowOfEmptyCell][columnOfEmptyCell] = index + 1;
          return x;
        });
      }

  return [];
}

function tableExistsInArray(table, arrayOfTables) {
  if (arrayOfTables instanceof Map) {
    const hash = calculateTableHash(table);
    if (!arrayOfTables.has(hash)) return false;

    for (const otherTable of arrayOfTables.get(hash))
      if (areTablesEqual(table, otherTable)) return true;

    return false;
  }

  for (const otherTable of arrayOfTables) if (areTablesEqual(table, otherTable)) return true;

  return false;
}

function calculateTableHash(table) {
  let sum = 0;
  table.forEach((x, i) => x.forEach((y, j) => (sum += y * (i + 100) + j)));
  return sum;
}

function areTablesEqual(table1, table2) {
  for (let i = 0; i < n; i++)
    for (let j = 0; j < n; j++) if (table1[i][j] !== table2[i][j]) return false;

  return true;
}

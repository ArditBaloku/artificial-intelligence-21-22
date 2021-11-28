const parseArguments = require("./cli-parser");

const n = parseArguments();

const table = new Array(n).fill()
                          .map(x => new Array(n).fill()
                                                .map(y => ({ value: 0, domain: new Set([...Array(n).keys()].map(x => x + 1)) })))

function placeNumber(index) {
  if (index === n * n)
    return true;

  const [row, column] = [Math.floor(index / n), index % n];
  const cell = table[row][column];

  for (let i = 1; i <= n; i++) {
    if (!cell.domain.has(i))
      continue;

    cell.value = i;

    const domainsRemoved = [];
    for (let j = 0; j < n; j++) {
      if (table[row][j].domain.delete(i))
        domainsRemoved.push(table[row][j])

      if (table[j][column].domain.delete(i))
        domainsRemoved.push(table[j][column])
    }

    if (placeNumber(index + 1))
      return true;
    
    for (const cell of domainsRemoved)
      cell.domain.add(i)

    cell.value = 0;
  }

  return false;
}

if (placeNumber(0))
  for (const row of table)
    console.log(row.map(x => x.value).join(' '))
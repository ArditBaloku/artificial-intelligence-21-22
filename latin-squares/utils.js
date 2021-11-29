function parseArguments() {
  const n = parseInt(process.argv[2]);
  if (isNaN(n)) {
    console.log('Invalid argument for n');
    process.exit();
  }

  const interactive = process.argv.includes('--interactive') || process.argv.includes('-i');

  if (!process.argv[1].includes('dfs-bfs.js')) return [n, interactive];

  const algo = process.argv[3];
  if (algo !== 'dfs' && algo !== 'bfs') {
    console.log('Invalid argument for algorithm');
    process.exit();
  }

  return [n, interactive, algo];
}

function printTable(table) {
  for (const row of table) console.log(row.join(' '));
}

function delay(seconds) {
  const waitTill = new Date(new Date().getTime() + seconds * 1000);
  while (waitTill > new Date()) {}
}

module.exports = {
  parseArguments,
  printTable,
  delay,
};

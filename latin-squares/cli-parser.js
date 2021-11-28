function parseArguments() {
  const n = parseInt(process.argv[2]);
  if (isNaN(n)) {
    console.log('Invalid argument for n');
    process.exit();
  }

  if (!process.argv[1].includes('dfs-bfs.js'))
    return n;
  
  const algo = process.argv[3];
  if (algo !== 'dfs' && algo !== 'bfs') {
    console.log('Invalid argument for algorithm');
    process.exit();
  }

  return [n, algo];
}

module.exports = parseArguments
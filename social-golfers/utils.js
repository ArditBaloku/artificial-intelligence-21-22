function printWeeks(weekMatrix, numOfGolfers, groupSize) {
  for (const week of weekMatrix) {
    const groups = [];
    for (let i = 0; i < numOfGolfers; i += groupSize)
      groups.push(
        week
          .filter((x, index) => index >= i && index < i + groupSize)
          .map((x) => padNumber(x))
          .join(' ')
          .concat(' | ')
      );
    console.log(groups.join(' '));
  }
}

function padNumber(num) {
  return num < 10 ? `${num} ` : `${num}`;
}

function parseArguments() {
  const n = parseInt(process.argv[2]);
  if (isNaN(n)) {
    console.log('Invalid argument for number of weeks');
    process.exit();
  }

  return n;
}

function getOtherGolfersInGroup(row, column, groupSize, weekMatrix) {
  const group = Math.floor(column / groupSize);
  const groupStart = group * groupSize;
  const groupEnd = groupStart + groupSize - 1;
  return weekMatrix[row].filter((x, index) => index >= groupStart && index <= groupEnd && x !== 0);
}

module.exports = {
  printWeeks,
  parseArguments,
  getOtherGolfersInGroup,
};

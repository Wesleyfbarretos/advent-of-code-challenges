console.time()
const input = require("../input");

const lineNumbersArr = input.replace(/[^0-9\n]+/g, '').split('\n')

const total = lineNumbersArr.reduce((acum, value) => acum + parseInt(value[0] + value[value.length - 1]), 0);
console.timeEnd()
console.log(total)

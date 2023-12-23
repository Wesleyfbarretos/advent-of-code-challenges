console.time()
const input = require("../input.js");

const treatedInput = input.split('\n');

const stringNumberMapValue = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9',
    1: '1',
    2: '2',
    3: '3',
    4: '4',
    5: '5',
    6: '6',
    7: '7',
    8: '8',
    9: '9'
}

let firstNumber;
let lastNumber;
let total = 0;

for(const line of treatedInput) {

    let smallerIndex = line.length;
    let biggerIndex = 0;
    let smallValue;
    let biggerValue;

    for(const key in stringNumberMapValue) {

        const sIndex = line.indexOf(key)
        const lIndex = line.lastIndexOf(key)
        
        if(sIndex !== -1 && sIndex < smallerIndex) {
            smallerIndex = sIndex
            smallValue = key
        }

        if(lIndex !== -1 && lIndex > biggerIndex) {
            biggerIndex = lIndex
            biggerValue = key
        }

    }

    firstNumber = !isNaN(smallValue) ? smallValue : stringNumberMapValue[smallValue]
    lastNumber = !isNaN(biggerValue) ? biggerValue : stringNumberMapValue[biggerValue]
    
    total += +(firstNumber + (lastNumber ? lastNumber : firstNumber));

    firstNumber = undefined;
    lastNumber = undefined;
}


console.log(total)
console.timeEnd()
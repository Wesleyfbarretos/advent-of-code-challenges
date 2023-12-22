const input = require("./input");

const inputArr = input.split('\n');

const maxOfRedCubes = 12;
const maxOfGreenCubes = 13;
const maxOfBlueCubes = 14;
let count = 0;
console.time();

for(const game of inputArr) {

    let redCubes = 0;

    let greenCubes = 0;

    let blueCubes = 0;

    let canBeAdd = true;

    const cubesQtyArr = game.split(':')[1].replace(/\s/g, '').split(';');

    for(const round of cubesQtyArr) {

        for(const cubesQty of round.split(',')) {

            if(cubesQty.indexOf('red') !== -1) redCubes += +cubesQty.replace("red", '')

            else if(cubesQty.indexOf('blue') !== -1) blueCubes += +cubesQty.replace("blue", '')

            else greenCubes += +cubesQty.replace("green", '')

        }  

        if(redCubes > maxOfRedCubes || blueCubes > maxOfBlueCubes || greenCubes > maxOfGreenCubes) {

            canBeAdd = false;
            break
            
        }
        
        redCubes = 0;
        greenCubes = 0;
        blueCubes = 0;

    }

    if(canBeAdd) count += +(/Game ([0-9]+)/.exec(game)[1]);

}
console.log(count);
console.timeEnd();


console.time()
const input = require("../input");

const treatedInput = input.replace(/[, ]/g, '').replace(/(Game[0-9]+:)/g, '').split('\n');

const valueOfEachGame = [];

const minOfCubes = {
    red: 0,
    green: 0,
    blue: 0
}

for(const game of treatedInput) {
    const gameRounds = game.split(';')
    
    for(const round of gameRounds) {
        const redCubeIndex = round.indexOf('red');

        const blueCubeIndex = round.indexOf('blue');

        const greenCubeIndex = round.indexOf('green');

        if(redCubeIndex !== -1) {
            const redCubeQty = getFirstNumber(round, redCubeIndex) + round[redCubeIndex - 1];

            if(+redCubeQty > minOfCubes.red) {
                minOfCubes.red = +redCubeQty
            }
        }

        if(blueCubeIndex !== -1) {
            const blueCubeQty = getFirstNumber(round, blueCubeIndex) + round[blueCubeIndex - 1];

            if(+blueCubeQty > minOfCubes.blue) {
                minOfCubes.blue = +blueCubeQty
            }
        }

        if(greenCubeIndex !== -1) {
            const greenCubeQty = getFirstNumber(round, greenCubeIndex) + round[greenCubeIndex - 1];
            
            if(+greenCubeQty > minOfCubes.green) {
                minOfCubes.green = +greenCubeQty
            }
        }

    }

    valueOfEachGame.push(minOfCubes.red * minOfCubes.green * minOfCubes.blue)

    minOfCubes.red = 0;
    minOfCubes.green = 0;
    minOfCubes.blue = 0;
}

const total = valueOfEachGame.reduce((acum, value) => acum + value, 0)


console.log(total)

console.timeEnd();

function getFirstNumber(round, index) {
    return round[index - 2] && !isNaN(round[index - 2]) ? round[index - 2] : ''
}
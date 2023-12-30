console.time()

import { input } from "../input"
import { IAdjacentLineSearch, IAdjacentLinesGearRatio, ICurrentLineGearRatio, ILineParts } from "./interfaces";

const lines = input.split('\n');

let totalGearRatio = 0;

const isNumber = (value: string | number): boolean => !isNaN(+value);

const adjacentLineFromGearIndexSearch = ({ gearIndex, currentLine }: ILineParts) => {

    let sumOfParts = '';

    let leftPartsValue = '';

    let rightPartsValue = '';

    const gearIndexValue = currentLine[gearIndex];

    for(let leftIndex = gearIndex - 1; leftIndex >= 0; leftIndex--) {

        const leftValue = currentLine[leftIndex];

        if(!isNumber(leftValue)) break;

        leftPartsValue = leftValue + leftPartsValue;

    }
                    
    for(let rightIndex = gearIndex + 1; rightIndex < currentLine.length; rightIndex++) {

        const rightValue = currentLine[rightIndex];

        if(!isNumber(rightValue)) break;

        rightPartsValue += rightValue;

    }

    sumOfParts = leftPartsValue + gearIndexValue + rightPartsValue;

    return sumOfParts

}

const searchLineParts = ({ gearIndex, currentLine, direction }: ILineParts): string => {

    let sumOfParts = '';
    
    switch(direction) {

        case 'left':


            for(let currentIndex = gearIndex - 1; currentIndex >= 0; currentIndex--) {

                const currentValue = currentLine[currentIndex];
                
                if(!isNumber(currentValue)) break;
        
                sumOfParts = currentValue + sumOfParts;
        
            }

        break

        case 'right':
            

            for(let currentIndex = gearIndex + 1; currentIndex < currentLine.length; currentIndex++) {

                const currentValue = currentLine[currentIndex];
        
                if(!isNumber(currentValue)) break;
        
                sumOfParts += currentValue;
        
            }

        break


    }

    return sumOfParts

}

const currentLineParts = ({ gearIndex, lineIndex, lines }: ICurrentLineGearRatio): string[] => {

    const parts = [];

    const currentLine = lines[lineIndex]

    const leftNumbersTotal = searchLineParts({ currentLine, gearIndex, direction: "left" });

    const rightNumbersTotal = searchLineParts({ currentLine, gearIndex, direction: "right"});

    if(leftNumbersTotal) parts.push(leftNumbersTotal);

    if(rightNumbersTotal) parts.push(rightNumbersTotal);

    return parts

}

const searchAdjacentLineParts = ({ currentLine, gearIndex }: IAdjacentLineSearch) => {

    const currentLineLeftNumbersTotal = searchLineParts({ currentLine, gearIndex, direction: 'left' });

    const currentLineRightNumbersTotal = searchLineParts({ currentLine, gearIndex, direction: 'right' });

    return {
        leftNumbersTotal: currentLineLeftNumbersTotal,
        rightNumbersTotal: currentLineRightNumbersTotal
    }
    
}

const adjacentLinesParts = ({ gearIndex, lineIndex, lines }: IAdjacentLinesGearRatio): string[] => {

    const parts: string[] = [];

    if(lineIndex !== 0) {

        const topLine = lines[lineIndex - 1];

        if(!isNumber(topLine[gearIndex])) {

            const { leftNumbersTotal, rightNumbersTotal } = searchAdjacentLineParts({ currentLine: topLine, gearIndex });

            if(leftNumbersTotal) parts.push(leftNumbersTotal);

            if(rightNumbersTotal) parts.push(rightNumbersTotal);

        } else {

            const valueFromGearIndex = adjacentLineFromGearIndexSearch({ currentLine: topLine, gearIndex })
    
            if(valueFromGearIndex) parts.push(valueFromGearIndex);

        }
        


    }

    if(lineIndex !== lines.length - 1) {

        const bottomLine = lines[lineIndex + 1];

        if(!isNumber(bottomLine[gearIndex])) {

           const { leftNumbersTotal, rightNumbersTotal } = searchAdjacentLineParts({ currentLine: bottomLine, gearIndex })

           if(leftNumbersTotal) parts.push(leftNumbersTotal);

           if(rightNumbersTotal) parts.push(rightNumbersTotal);

        } else {

            const valueFromGearIndex = adjacentLineFromGearIndexSearch({ currentLine: bottomLine, gearIndex })
    
            if(valueFromGearIndex) parts.push(valueFromGearIndex);
            
        }


    }

    return parts

}

for(const _lineIndex in lines) {

    const lineIndex = +_lineIndex

    const line = lines[lineIndex];

    for(const _gearIndex in line as any) {

        const gearIndex = +_gearIndex;

        const gear = line[gearIndex];

        if(gear !== '*') continue;

        const totalOfParts = [
            ...currentLineParts({ gearIndex, lineIndex, lines }),
            ...adjacentLinesParts({ gearIndex, lineIndex, lines })
        ]

        if(totalOfParts.length === 2) {

            totalGearRatio += totalOfParts.reduce((acum, value) => acum * +value, 1)
        
        }

    }

}

console.log(totalGearRatio)

console.timeEnd()   
// console.time()

import { input } from "../input"
import { IAdjacentLinesGearRatio, ICurrentLineGearRatio, ILineParts, ILinesResponse } from "./interfaces";

const lines = input.split('\n');

let total = 0;
// TODO - FIX FAZER COM QUE A PROCURA ACONTEÇA A PARTIR DO INDEX ACIMA DO GEAR PRIORIZANDO A DIREITA.
const searchLineParts = ({ gearIndex, currentLine, direction }: ILineParts): string => {

    let sumOfParts = '';

    switch(direction) {

        case 'left':

            for(let leftIndex = gearIndex - 1; leftIndex >= 0; leftIndex--) {

                const leftValue = currentLine[leftIndex];
        
                if(isNaN(+leftValue)) break;
        
                sumOfParts = leftValue + sumOfParts;
        
            }

        break

        case 'right':
            
            for(let rightIndex = gearIndex + 1; rightIndex < currentLine.length; rightIndex++) {

                const rightValue = currentLine[rightIndex];
        
                if(isNaN(+rightValue)) break;
        
                sumOfParts = rightValue + sumOfParts;
        
            }

        break


    }

    return sumOfParts

}

const sumCurrentLineGearRatio = ({ gearIndex, lineIndex, lines }: ICurrentLineGearRatio): ILinesResponse => {

    const response: ILinesResponse = {
        gearRatio: 0,
        matches: false
    }

    const currentLine = lines[lineIndex]

    const leftNumberTotal = searchLineParts({ currentLine, gearIndex, direction: "left" });

    if(!leftNumberTotal) return response;

    const rightNumberTotal = searchLineParts({ currentLine, gearIndex, direction: "right"});

    if(!rightNumberTotal) return response;

    return {
        gearRatio: +leftNumberTotal * +rightNumberTotal,
        matches: true
    } as ILinesResponse

}

const sumAdjacentLinesGearRatio = ({ gearIndex, lineIndex, lines }: IAdjacentLinesGearRatio): ILinesResponse => {

    const response: ILinesResponse = {
        gearRatio: 0,
        matches: false
    } 

    const parts = [];

    if(lineIndex !== 0) {

        const topLine = lines[lineIndex - 1];
        
        const topLineLeftNumberTotal = searchLineParts({ currentLine: topLine, gearIndex, direction: "left" });

        const topLineRightNumberTotal = searchLineParts({ currentLine: topLine, gearIndex, direction: "right" });

        if(topLineLeftNumberTotal) parts.push(topLineLeftNumberTotal);

        if(topLineRightNumberTotal) parts.push(topLineRightNumberTotal);

    }

    if(lineIndex !== lines.length - 1) {

        const bottomLine = lines[lineIndex + 1];

        const bottomLineLeftNumberTotal = searchLineParts({ currentLine: bottomLine, gearIndex, direction: "left" });
        
        if(bottomLineLeftNumberTotal) parts.push(bottomLineLeftNumberTotal);

        if(parts.length > 2) return response;

        const bottomLineRightNumberTotal = searchLineParts({ currentLine: bottomLine, gearIndex, direction: "right" });

        if(bottomLineRightNumberTotal) parts.push(bottomLineRightNumberTotal);

    }

    if(parts.length > 2) return response;

    if(!parts.length) return response;

    return {
        gearRatio: parts.reduce((acum, value) => +acum * +value, 1),
        matches: true
    } as ILinesResponse

}

for(const _lineIndex in lines) {

    const lineIndex = +_lineIndex

    const line = lines[lineIndex];

    for(const _gearIndex in line as any) {

        const gearIndex = +_gearIndex;

        const gear = line[gearIndex];

        if(gear !== '*') continue;
    
        const { gearRatio: lineGearRatio, matches: lineMatch } = sumCurrentLineGearRatio({ gearIndex, lineIndex, lines });

        const { gearRatio: adjacentLinesGearRatio, matches: adjLineMatch } = sumAdjacentLinesGearRatio({ gearIndex, lineIndex, lines });

        if(lineMatch && adjLineMatch) continue;

        if(lineMatch) {
            
            total += lineGearRatio

            continue

        }

        if(adjLineMatch) total += adjacentLinesGearRatio

    }

}

console.log(total)

console.timeEnd()   
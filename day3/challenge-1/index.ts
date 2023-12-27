import { input } from "../input";

console.time();
// 531932
const treatedInput = input.split('\n');

let total = 0;

let gear = '';

interface IAdjacentLines {
    gearIndex: number,
    gearLength: number,
    line: string
}

const findAdjacentLinesSymbols = ({ gearIndex, gearLength, line }: IAdjacentLines): boolean => {

    const matchesStart = gearIndex - gearLength - 1;

    const matchesEnd = gearIndex;

    for(let matchesIndex = matchesStart; matchesIndex <= matchesEnd; matchesIndex++) {

        const lineIndex = line[matchesIndex];

        const lineIndexIsSymbol = lineIndex && lineIndex !== '.' && isNaN(+lineIndex)

        if(lineIndexIsSymbol) return true

    }

    return false;
}

for(const _lineIndex in treatedInput) {

    const lineIndex = +_lineIndex;

    const line = treatedInput[lineIndex]
    
    for(const _gearIndex in line as any) {

        const gearIndex = +_gearIndex;
        
        const gearValue = line[gearIndex];
        
        if(!isNaN(+gearValue)) {
            
            gear += gearValue;

            continue;
            
        } 
        
        if(!gear) continue;

        const indexPrefix = line[gearIndex - 1 - gear.length];
        
        const indexSufix = line[gearIndex];

        if(indexPrefix && indexPrefix !== '.' || indexSufix && indexSufix !== '.') {

            total += +gear;

            gear = '';

            continue;

        }

        if(lineIndex !== 0) {

            const topLine = treatedInput[+lineIndex - 1];
                            
            if(findAdjacentLinesSymbols({ gearIndex, gearLength: gear.length, line: topLine })) {

                    total += +gear;

                    gear = '';

                    continue;
                
            }

        } 
        
        if(lineIndex !== treatedInput.length - 1) {

            const bottomLine = treatedInput[+lineIndex + 1];
                            
            if(findAdjacentLinesSymbols({ gearIndex, gearLength: gear.length, line: bottomLine })) {

                    total += +gear;

                    gear = '';

                    continue;
                
            }

        }   

        gear = '';
                
    }

}

console.log(total);
console.timeEnd();
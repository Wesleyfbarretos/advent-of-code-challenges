import { input } from "../input";

console.time();

const treatedInput = input.split('\n');

let total = 0;
interface IAdjacentLines {
    gearIndex: number,
    gearLength: number,
    line: string
}

const findAdjacentLineSymbols = ({ gearIndex, gearLength, line }: IAdjacentLines): boolean => {

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

    let gear = '';

    const lineIndex = +_lineIndex;

    const line = treatedInput[lineIndex]
    
    for(const _gearIndex in line as any) {

        const gearIndex = +_gearIndex;
        
        const gearValue = line[gearIndex];
        
        if(!isNaN(+gearValue)) {
            
            gear += gearValue;

            if(gearIndex !== line.length - 1) continue;
            
        } 
        
        if(!gear) continue;

        const indexSufix = isNaN(+gearValue) ? gearValue : null;

        const indexPrefix = indexSufix ? line[gearIndex - gear.length - 1] : line[gearIndex - gear.length];
    
        if(indexPrefix && indexPrefix !== '.' || indexSufix && indexSufix !== '.') {
            
            total += +gear;

            gear = '';

            continue;

        }

        if(lineIndex !== 0) {

            const topLine = treatedInput[+lineIndex - 1];
                            
            if(findAdjacentLineSymbols({ gearIndex, gearLength: gear.length, line: topLine })) {

                    total += +gear;

                    gear = '';

                    continue; 

            }

        } 
        
        if(lineIndex !== treatedInput.length - 1) {

            const bottomLine = treatedInput[+lineIndex + 1];
                            
            if(findAdjacentLineSymbols({ gearIndex, gearLength: gear.length, line: bottomLine })) {

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
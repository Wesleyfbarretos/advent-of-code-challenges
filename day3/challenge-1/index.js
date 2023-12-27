console.time()
const input = require("../input");

const treatedInput = input.split('\n');

let total = 0;

let targetNumber = '';

for(let i = 0; i < treatedInput.length; i++) {
    
    for(let y = 0; y < treatedInput[i].length; y++) {

        const index = treatedInput[i][y]
        
        if(!isNaN(index)) {
            
            targetNumber += index
            
        } else if(targetNumber) {

            const indexPrefix = treatedInput[i][y - 1 - targetNumber.length]
            

            const indexSufix = treatedInput[i][y]
    
            if(indexPrefix && indexPrefix !== '.' || indexSufix && indexSufix !== '.') {

                total += +targetNumber

            } else {

                let includedToTotal = false;

                if(treatedInput[i - 1]) {
                                    
                    let topLineIndexIsSymbol = false;
    
                    for(let tli = y - 1 - targetNumber.length; tli <= y; tli++) {
    
                        const topLineIndex = treatedInput[i - 1][tli];
                        
                        topLineIndexIsSymbol = topLineIndex && topLineIndex !== '.' && isNaN(topLineIndex)
    
                        if(topLineIndexIsSymbol) {

                                total += +targetNumber

                                includedToTotal = true;
    
                                break    
                           
                        }
    
                    }
    
                } 
                
                if(treatedInput[i + 1] && !includedToTotal) {

                    let bottomLineIndexIsSymbol = false;
    
                    for(let bli = y - 1 - targetNumber.length; bli <= y; bli++) {
    
                        const bottomLineIndex = treatedInput[i + 1][bli];

                        bottomLineIndexIsSymbol = bottomLineIndex && bottomLineIndex !== '.' && isNaN(bottomLineIndex)
    
                        if(bottomLineIndexIsSymbol) {
                                
                                total += +targetNumber

                                break

                        }
    
                    }
    
                }
                
            }      

            targetNumber = '';
        }
                
    }

}

console.log(total)

console.timeEnd()
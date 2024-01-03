console.time()
import { findMatchingNumbers } from "../helpers/day4.helper";

import { input } from "../input";

const cards = input.replace(/.+: /g, '').split('\n');

let scratchCards = 0;

for(const _cardIndex in cards as any) {

    const cardIndex = +_cardIndex

    const matches = findMatchingNumbers({  cardIndex, cards })

    if(matches) {

        scratchCards += matches.reduce((acum: number, value: string, index: number) => index > 0 ? acum * 2 : acum, 1);
        
    }

}

console.log(scratchCards)
console.timeEnd()
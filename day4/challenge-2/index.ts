console.time();

import { findMatchingNumbers } from "../helpers/day4.helper";

import { input } from "../input";

const cards = input.replace(/.+: /g, '').split('\n');

let scratchCardsMap = {} as any;

let scratchCardsQty = 0;

for(const _cardIndex in cards as any) {

    const cardIndex = +_cardIndex

    const matches = findMatchingNumbers({  cardIndex, cards })

    const cardKey = cardIndex + 1;

    const nextCardKey = cardIndex + 2;

    if(!scratchCardsMap[cardKey]) scratchCardsMap[cardKey] = 1;

    if(matches) {
        
        for(let nextCard = nextCardKey; nextCard <= cardKey + matches.length; nextCard++) {
                
            if(!scratchCardsMap[nextCard]) {

                scratchCardsMap[nextCard] = scratchCardsMap[cardKey] + 1;

                continue

            }
        
            scratchCardsMap[nextCard] = scratchCardsMap[nextCard] + scratchCardsMap[cardKey];

        }
        
    }

}

for(const key in scratchCardsMap) {
    
    scratchCardsQty += scratchCardsMap[key];
    
}

console.log(scratchCardsQty);

console.timeEnd();
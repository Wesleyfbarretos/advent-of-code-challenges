export const findMatchingNumbers = ({ cardIndex, cards }: { cardIndex: number, cards: string[]}) => {

    const card = cards[cardIndex];
    
    const listsOfNumbers = card.split('|');

    const winningNumbers = listsOfNumbers[0].trim();

    const myNumbers = listsOfNumbers[1].trim().split(' ').map(Number);

    const myNumbersReg = new RegExp(`\\b(${myNumbers.join('|')})\\b`, 'g');
    
    const matches = winningNumbers.match(myNumbersReg);

    return matches
    
}
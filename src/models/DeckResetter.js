const makeResettedDeck = (deck) => {
    const newDeck = [...deck];
    for(let i = 0; i < deck.length; i++) {
        if(newDeck[i].faceUp && !newDeck[i].matched) {
            newDeck[i].flipDown();
        }
    }
    return newDeck;
}

export default makeResettedDeck;
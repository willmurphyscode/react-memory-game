import CardModel from './CardModel';


it('doesnt die', () => {
    const foo = new CardModel({ faceUp: false, value: 'X' });
});


it('flips face up', () => {
    const foo = new CardModel({ faceUp: false, value: 'X' });
    foo.flipUp()
    expect(foo.faceUp).toBe(true);
});


it('should make a deck from an array of strings', () => {
    const faceValues = ['a','b','c'];
    const resultingDeck = CardModel.deckFromArrayOfFaces(faceValues);
    expect(resultingDeck).toHaveLength(3);
    expect(resultingDeck[0].value).toBe('a');
    expect(resultingDeck[1].faceUp).toBe(false);
});

import makeResettedDeck from './DeckResetter';
import CardModel from './CardModel';

describe('making a resetted deck', () => {
    let deck = CardModel.deckFromArrayOfFaces(['a','b','c','d']);

    
    it('should does nothing if nothing is face up', () => {
        const result = makeResettedDeck(deck);
        result.map((item) => expect(item.faceUp).toBe(false));
    });

    it('flips all cards face down if no cards match', () => {
        deck[0].flipUp();
        deck[1].flipUp();
        const result = makeResettedDeck(deck); 
        expect(result[0].faceUp).toBe(false);
        expect(result[0].faceUp).toBe(false);
    });

    
    it('should leave face up cards face up if they match', () => {
        deck[0].flipUp();
        deck[0].markMatched();
        deck[1].flipUp();
        deck[1].markMatched();
        const result = makeResettedDeck(deck);
        expect(deck[0].faceUp).toBe(true);
        expect(deck[1].faceUp).toBe(true);
    });
    
    
});
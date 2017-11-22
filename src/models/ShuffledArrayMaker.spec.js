import makeShuffledDeck from './ShuffledArrayMaker';

describe('shuffling array', () => {
    it('should return arrays of the right length', () => {
        const result = makeShuffledDeck(6);
        expect(result).toHaveLength(6);
    });
})
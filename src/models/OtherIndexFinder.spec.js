import findOtherIndex from './OtherIndexFinder';

describe('finding another index', () => {
    
    it('should return -1 if there are no matches', () => {
        let args = {
            collection: [ {a: 1}, {a: 2}, {a: 3}],
            value: 2,
            propName: 'a',
            knownIndex: 1
        };

        expect(findOtherIndex(args)).toBe(-1);
    });

    
    it('should should return the other index if one exists', () => {
        let args = {
            collection: [ {a: 1}, {a: 2}, {a: 1}],
            value: 1,
            propName: 'a',
            knownIndex: 0
        };
        expect(findOtherIndex(args)).toBe(2);
    });
    
    
})
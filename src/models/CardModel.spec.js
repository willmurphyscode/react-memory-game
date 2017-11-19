import CardModel from './CardModel';


it('doesnt die', () => {
    const foo = new CardModel({ faceUp: false, value: 'X' });
});


it('flips face up', () => {
    const foo = new CardModel({ faceUp: false, value: 'X' });
    foo.flipUp()
    expect(foo.faceUp).toBe(true);
});



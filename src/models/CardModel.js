class CardModel {
    constructor({ faceUp, value }) {
        this.faceUp = faceUp;
        this.value = value;
        this.matched = false;
    }

    flipUp() {
        this.faceUp = true; 
    }

    flipDown() {
        this.faceUp = false;
    }

    flip() {
        this.faceUp = !this.faceUp;
    }

    markMatched() {
        this.matched = true;
    }

    static deckFromArrayOfFaces(arrayOfFaces) {
        return arrayOfFaces.map((faceValue) => {
            return new CardModel({faceUp: false, value: faceValue });
        })
    }
}

export default CardModel;
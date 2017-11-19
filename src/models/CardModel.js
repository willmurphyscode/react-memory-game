class CardModel {
    constructor({ faceUp, value }) {
        this.faceUp = faceUp;
        this.value = value;
    }

    flipUp() {
        this.faceUp = true; 
    }

    flipDown() {
        this.faceUp = false;
    }

    static deckFromArrayOfFaces(arrayOfFaces) {
        return arrayOfFaces.map((faceValue) => {
            return new CardModel({faceUp: false, value: faceValue });
        })
    }
}

export default CardModel;
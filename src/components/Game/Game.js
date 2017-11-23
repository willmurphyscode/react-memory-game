import React, { Component } from 'react';
import Card from '../Card';
import CardModel from '../../models/CardModel';
import { setTimeout } from 'core-js/library/web/timers';
import findOtherIndex from '../../models/OtherIndexFinder';
import resetDeck from '../../models/DeckResetter';
import makeShuffledDeck from '../../models/ShuffledArrayMaker';

class Game extends Component {
  constructor(props) {
    super(props);
    const length = props.rows * props.columns;

    this.cardClicked = this.cardClicked.bind(this);

    this.state = {
      newDeck: CardModel.deckFromArrayOfFaces(makeShuffledDeck(length)),
      isResetting: false,
    }
  }

  nCards(n, offsetId) {
    const inputs = [];
    for(var i = 0; i < n; i++) {
      var ix = i + offsetId;
      var { faceUp, value } = this.state.newDeck[ix];
      inputs.push(<Card 
          key={ix} 
          cardIx={ix} 
          faceUp={ faceUp }
          face={ value }
           />);
    }
    return inputs;
  }

  nByMCards(columns, rows) {
    const inputs = [];
    for(var i = 0; i < rows; i++) {
      inputs.push(this.nCards(columns, (i * columns)));
      inputs.push(<div className='row-divider' key={i}></div>);
    }
    return inputs;
  }

  flipCardByIx(ix, callBack) {
    const currentDeck = [...this.state.newDeck];
    currentDeck[ix] && currentDeck[ix].flip();
    this.setState({
      newDeck: currentDeck,
    }, callBack);
  }

  countUnMatchedFaceUpCards() {
    return this.state.newDeck.filter((x) => x.faceUp && !x.matched).length;
  }

  otherIndexOfCard(card, knownIndex) {
    return findOtherIndex({
      collection: this.state.newDeck,
      value: card.value,
      propName: 'value',
      knownIndex: knownIndex
    });
  }

  checkMatch() {
    let faceUpFaces = [];
    let newDeck = [...this.state.newDeck];
    for(var i = 0; i < newDeck.length; i++) {
      if(newDeck[i].faceUp) {
        let currentCard = newDeck[i];
        if(faceUpFaces.indexOf(currentCard.value) >= 0) {
          newDeck[i].markMatched();
          newDeck[this.otherIndexOfCard(currentCard, i)].markMatched();
        }
        faceUpFaces.push(currentCard.value);
      }
    }
    this.resetBoard(newDeck);
  }

  resetBoard(newDeck, timeoutInterval = 1500) {
    if(this.state.isResetting) {
      return;
    }
    this.setState({
      isResetting: true,
    })
    setTimeout(() => {
      newDeck = resetDeck(newDeck);
      this.setState({
        newDeck: newDeck,
        isResetting: false,
      })
    }, timeoutInterval);
  }

  cardClicked(event) {
    const faceUpCount = this.countUnMatchedFaceUpCards();
    if (faceUpCount === 0) {
      this.flipCardByIx(event.target.id);
      return;
    } else if (faceUpCount === 1) {
      this.flipCardByIx(event.target.id, () => this.checkMatch());
    } else {
      this.resetBoard();
    }
  }

  render() {
    return (
        <div className='gameContainer' onClick={this.cardClicked}>
            {this.nByMCards(this.props.columns, this.props.rows)}
        </div>
    );
  }
}

export default Game;

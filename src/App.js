import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Card from './components/Card';
import CardModel from './models/CardModel';
import { setTimeout } from 'core-js/library/web/timers';
import findOtherIndex from './models/OtherIndexFinder';
import resetDeck from './models/DeckResetter';

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const makeShuffledDeck = (length) => {
  const firstHalf = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-+'
    .split('').slice(0, length / 2);

  const secondHalf = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-+'
    .split('').slice(0, length / 2);

  return shuffleArray(firstHalf.concat(secondHalf));
}



class App extends Component {
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
          console.log("found a match :)")
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

    console.log("resetting board");
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
      <div className="App" onClick={this.cardClicked}>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">A Simple Memory Game in ReactJS</h1>
        </header>
        <div className='gameContainer'>
        {this.nByMCards(this.props.columns,this.props.rows)}
        </div>
      </div>
    );
  }
}

export default App;

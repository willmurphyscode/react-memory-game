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
      ixesOfFaceUpCards: Array(length).fill(false),
      ixesOfMatchedCards: Array(length).fill(false),
      deck: makeShuffledDeck(length),
      newDeck: CardModel.deckFromArrayOfFaces(makeShuffledDeck(length)),
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
    let matchedIxes = [...this.state.ixesOfMatchedCards];
    let newDeck = [...this.state.newDeck];
    for(var i = 0; i < this.state.ixesOfFaceUpCards.length; i++) {
      if(newDeck[i].faceUp) {
        let currentCard = newDeck[i];
        if(faceUpFaces.indexOf(currentCard.value) >= 0) {
          console.log("found a match :)")
          newDeck[i].markMatched();
          newDeck[this.otherIndexOfCard(currentCard, i)].markMatched();
          matchedIxes[i] = true;
          matchedIxes[this.otherIndexOfCard(currentCard, i)] = true;
        }
        faceUpFaces.push(currentCard.value);
      }
    }

    const newIxesOfFaceUpCards = [...this.state.ixesOfFaceUpCards];
    this.resetBoard(newIxesOfFaceUpCards, matchedIxes, newDeck);
    
  }

  resetBoard(newIxesOfFaceUpCards, matchedIxes, newDeck, timeoutInterval = 1500) {
    setTimeout(() => {
      newDeck = resetDeck(newDeck);
      this.setState({
        ixesOfMatchedCards: matchedIxes,
        ixesOfFaceUpCards: newIxesOfFaceUpCards,
        newDeck: newDeck,
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
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {this.nByMCards(this.props.columns,this.props.rows)}
      </div>
    );
  }
}

export default App;

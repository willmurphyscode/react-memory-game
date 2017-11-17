import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Card from './components/Card';
import { setTimeout } from 'core-js/library/web/timers';

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
    }
  }

  nCards(n, offsetId) {
    const inputs = [];
    for(var i = 0; i < n; i++) {
      var ix = i + offsetId;
      var faceUp = this.state.ixesOfFaceUpCards[ix];
      var face = this.state.deck[ix];
      inputs.push(<Card 
          key={ix} 
          cardIx={ix} 
          faceUp={faceUp}
          face={face}
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

  flipCardByIx(ix) {
    const currentState = this.state.ixesOfFaceUpCards;
    currentState[ix] = !currentState[ix];
    this.setState({
      ixesOfFaceUpCards: currentState
    });
  }

  countFaceUpCards() {
    return this.state.ixesOfFaceUpCards.filter(x => x).length;
  }

  checkMatch() {
    let faceUpFaces = [];
    let matchedIxes = this.state.ixesOfMatchedCards;
    for(var i = 0; i < this.state.ixesOfFaceUpCards.length; i++) {
      if(this.state.ixesOfFaceUpCards[i]) {
        if(faceUpFaces.indexOf(this.state.deck[i]) >= 0) {
          matchedIxes[i] = true;
          console.log("FOUND A MATCH :)")
        }
        faceUpFaces.push(this.state.deck[i]);
      }
    }
    console.log(faceUpFaces);

    let ixesToFlipOver = [];
    // TODO don't use flip card by ix because of redundant setState calls
    setTimeout(() => {
      for(var i = 0; i < this.state.ixesOfFaceUpCards.length; i++) {
        if(!this.state.ixesOfMatchedCards[i] && this.state.ixesOfFaceUpCards[i]) {
          this.flipCardByIx(i);
        }
      }
    }, 1500);
  }

  resetBoard() {
    console.log("resetting board");
  }

  cardClicked(event) {
    const faceUpCount = this.countFaceUpCards();
    if (faceUpCount == 0) {
      this.flipCardByIx(event.target.id);
      return;
    } else if (faceUpCount == 1) {
      this.flipCardByIx(event.target.id);
      this.checkMatch();
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

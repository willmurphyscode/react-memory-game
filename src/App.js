import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Card from './components/Card';

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

const makeDeck = (length) => {
  const deck = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-+'
    .split('').slice(0, length / 2); // 48 unique characters
  const otherDeck = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-+'
    .split('').slice(0, length / 2);
  return deck.concat(otherDeck);
}



class App extends Component {
  constructor(props) {
    super(props);
    const length = props.rows * props.columns;

    this.cardClicked = this.cardClicked.bind(this);

    this.state = {
      ixesOfFaceUpCards: Array(length).fill(false),
      deck: makeShuffledDeck(length)
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

  cardClicked(event) {
    this.flipCardByIx(event.target.id);
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

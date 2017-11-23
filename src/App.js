import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Card from './components/Card';
import CardModel from './models/CardModel';
import Game from './components/Game';
import Scoreboard from './components/Scoreboard';
import { setTimeout } from 'core-js/library/web/timers';
import findOtherIndex from './models/OtherIndexFinder';
import resetDeck from './models/DeckResetter';
import makeShuffledDeck from './models/ShuffledArrayMaker';

class App extends Component {

  render() {
    return (
      <div className="App" onClick={this.cardClicked}>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">A Simple Memory Game in ReactJS</h1>
        </header>
        <Game rows={6} columns={8} />
        <Scoreboard />
      </div>
    );
  }
}

export default App;

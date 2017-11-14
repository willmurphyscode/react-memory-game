import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Card from './components/Card';

class App extends Component {
  constructor(props) {
    super(props);
    const length = props.rows * props.columns;
    this.state = {
      ixesOfFaceUpCards: Array(length).fill(false)
    }
    this.cardClicked = this.cardClicked.bind(this);
  }

  nCards(n, offsetId) {
    const inputs = [];
    for(var i = 0; i < n; i++) {
      var ix = i + offsetId;
      var faceUp = this.state.ixesOfFaceUpCards[ix];
      inputs.push(<Card key={ix} cardIx={ix} state={{faceUp: faceUp}} faceUp={faceUp}/>);
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

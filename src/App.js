import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Card from './components/Card';

class App extends Component {
  nCards(n) {
    const inputs = [];
    for(var i = 0; i < n; i++) {
      inputs.push(<Card key={i} />);
    }
    return inputs;
  }

  nByMCards(n, m) {
    const inputs = [];
    for(var i = 0; i < m; i++) {
      inputs.push(this.nCards(n));
      inputs.push(<div className='row-divider' key={i}></div>);
    }
    return inputs;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {this.nByMCards(8,6)}
        
      </div>
    );
  }
}

export default App;

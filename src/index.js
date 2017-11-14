import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App rows={6} columns={8} />, document.getElementById('root'));
registerServiceWorker();

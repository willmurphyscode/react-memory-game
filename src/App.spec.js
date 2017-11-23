import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Card from './components/Card';

import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount } from 'enzyme';

const Enzyme = require('enzyme');


describe('The set of cards', () => {
  beforeAll(() => {
    Enzyme.configure({ adapter: new Adapter() })
  });

  it('should renders a Game', () => {
      const wrapper = shallow(<App rows={4} columns={4} />)
  });

});





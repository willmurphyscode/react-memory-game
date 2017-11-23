import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Game from './components/Game';
import Scoreboard from './components/Scoreboard';

import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount } from 'enzyme';

const Enzyme = require('enzyme');


describe('The set of cards', () => {
  beforeAll(() => {
    Enzyme.configure({ adapter: new Adapter() })
  });

  it('should render a Game', () => {
      const wrapper = shallow(<App rows={4} columns={4} />);
      expect(wrapper.find(Game)).toHaveLength(1);
  });

  it('should render a scoreboard', () => {
    const wrapper = shallow(<App rows={4} columns={4} />);
    expect(wrapper.find(Scoreboard)).toHaveLength(1);
  });
});





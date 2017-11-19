import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Card from './components/Card';

const Enzyme = require('enzyme');
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';

describe('The set of cards', () => {
  beforeAll(() => {
    Enzyme.configure({ adapter: new Adapter() })
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App rows={6} columns={8}/>, div);
  });

  
  it('renders rows by columns cards', () => {
    const wrapper = shallow(<App rows={6} columns={8}/>);
    expect(wrapper.find(Card)).toHaveLength(6 * 8);
  });
  
  
  it('flips cards when you click them', () => {
    const wrapper = shallow(<App rows={6} columns={8}/>);
    const firstCard = wrapper.find(Card).first();
    firstCard.simulate('click');
    wrapper.update();
    expect(wrapper.find(Card).first().props().faceUp).toBe(true);
  });
});



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

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App rows={6} columns={8}/>, div);
  });

  
  it('renders rows by columns cards', () => {
    const wrapper = shallow(<App rows={6} columns={8}/>);
    expect(wrapper.find(Card)).toHaveLength(6 * 8);
  });
  
  
  it('flips cards when you click them', () => {
    spyOn(App.prototype, 'flipCardByIx');
    const wrapper = shallow(<App rows={6} columns={8}/>);
    wrapper.simulate('click', { target: { id: 0 }});
    expect(App.prototype.flipCardByIx).toHaveBeenCalled();
  });

  //reimplement the above test without knowing function names
  it('makes a face up card when you click one', () => {
    const wrapper = mount(<App rows={6} columns={8}/>);
    wrapper.simulate('click', { target: { id: 0 }});
    expect(wrapper.find('div.card.front')).toHaveLength(1);
  });
  
});



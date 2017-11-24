import React from 'react';

import Scoreboard from './Scoreboard';

import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount } from 'enzyme';

const Enzyme = require('enzyme');

describe('scoreboard', () => {
    beforeAll(() => {
        Enzyme.configure({ adapter: new Adapter() })
      });
    
    it('should render without crashing', () => {
        const wrapper = shallow(<Scoreboard totalClicks={1} />);
        expect(wrapper.find('div.scoreboard')).toHaveLength(1);
    });
    
})
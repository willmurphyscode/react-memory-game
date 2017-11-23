import Settings from './Settings';

import * as React from 'react';

import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';

const Enzyme = require('enzyme');


describe('settings', () => {
    beforeAll(() => {
        Enzyme.configure({ adapter: new Adapter() })
    });

    it('should render without crashing', () => {
        const wrapper = shallow(<Settings />);
    });
    
});
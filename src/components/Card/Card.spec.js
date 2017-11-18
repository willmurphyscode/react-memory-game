import Card from './Card';
import * as React from 'react';
const Enzyme = require('enzyme');
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';


describe('card', () => {
    beforeAll(() => {
       // console.warn('foo');
        Enzyme.configure({ adapter: new Adapter() })
    })
    it('renders', () => {
        const wrapper = shallow(<Card 
            faceUp={false}
            cardIx={0}
        />)

        expect(wrapper.find('div.card.back')).toHaveLength(1);
    })
})
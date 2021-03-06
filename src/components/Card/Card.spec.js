import Card from './Card';
import * as React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';

const Enzyme = require('enzyme');

describe('card', () => {
    beforeAll(() => {
        Enzyme.configure({ adapter: new Adapter() })
    });

    it('renders', () => {
        const wrapper = shallow(<Card 
            faceUp={false}
            cardIx={0}
        />)

        expect(wrapper.find('div.card.back')).toHaveLength(1);
    });

    it('renders face up when face up', () => {
        const wrapper = shallow(<Card 
            faceUp={true}
            cardIx={0}
        />)

        expect(wrapper.find('div.card.front')).toHaveLength(1);
    });
})
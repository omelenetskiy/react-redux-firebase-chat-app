import React from 'react'
import { shallow } from 'enzyme'
import AuthButton from '../src/components/AuthButton'

describe('auth button', () => {
    let wrapper;
    let props;
    beforeEach(() => {
        props = { className: 'class', onClick: jest.fn() }
        wrapper = shallow(<AuthButton {...props} />);
    })
    it('render button', () => {
        console.log(wrapper.debug());
        expect(wrapper).toMatchSnapshot();
    });

    it('simulates click events', () => {
        const event = { preventDefault: jest.fn() }
        wrapper.find('button').simulate('click', event);
        expect(event.preventDefault).toHaveBeenCalledTimes(1);
        expect(props.onClick).toHaveBeenCalledTimes(1);
    });


})

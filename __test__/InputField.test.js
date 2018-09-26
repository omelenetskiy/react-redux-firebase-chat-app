import React from 'react'
import { shallow } from 'enzyme'
import InputField from '../src/components/InputField'

describe('InputField', () => {
  let wrap;
  let props;
  beforeEach(() => {
    props = { type: 'text', onChange: jest.fn(), value: 'Type here...', name: 'text', text: 'Text field' }
    wrap = shallow(<InputField {...props} />)
  })
  it('should render input', () => {
    expect(wrap).toMatchSnapshot();
  })
  it('should render span text', () => {
    expect(wrap.find('span').text()).toEqual('Text field');
  })
  it('should simulate onChange', () => {
    const event = jest.fn();
    wrap.find('input').simulate('change', event);
    expect(props.onChange).toHaveBeenCalledTimes(1);
  })
})

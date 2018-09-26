import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Loading from '../src/components/Loading'

describe('Loading', () => {
  let wrap;
  beforeEach(() => {
    wrap = shallow(<Loading />)
  })
  it('should render Loading', () => {
    expect(toJson(wrap)).toMatchSnapshot();
  })
  it('should render text: Loading...', () => {
    expect(wrap.find('span').text()).toEqual('Loading...')
  })


})

import React from 'react';
import Loading from '../src/components/Loading';
import { shallow } from 'enzyme';

it('should render a Loading', () => {
	const wrapper = shallow(<Loading />);
	expect(wrapper).toMatchSnapshot();
});

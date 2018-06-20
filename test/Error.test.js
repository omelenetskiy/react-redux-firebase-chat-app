import React from 'react';
import Error from '../src/components/Error';

it('should render a Error', () => {
	const wrapper = shallow(<Error error="error" />);
	expect(wrapper.prop('error')).toEqual('error');
});

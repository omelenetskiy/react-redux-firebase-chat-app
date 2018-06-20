import React from 'react';
import Loading from '../src/components/Loading';
import { render } from 'enzyme';

it('should render a App', () => {
	const wrapper = render(<Loading />);
	expect(wrapper).toMatchSnapshot();
});

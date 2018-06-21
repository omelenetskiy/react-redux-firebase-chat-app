import React from 'react';
import InputFile from '../src/components/InputFile';
import { shallow, render } from 'enzyme';

describe('<InputFile />', () => {
	it('should render a Loading', () => {
		const wrapper = shallow(
			<InputFile fileName="File" close={() => closeFile()} />
		);
		expect(wrapper).toMatchSnapshot();
	});
	it('should render a document name', () => {
		const wrapper = render(
			<InputFile fileName="File" close={() => closeFile()} />
		);
		expect(wrapper.find('span').text()).toEqual('File');
	});
});

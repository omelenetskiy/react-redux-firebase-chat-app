import { isOpen, OPEN_POPUP } from '../../src/actions/isOpen';

describe('open', () => {
	it('it should check is open', () => {
		const open = false;
		const expectedAction = {
			type: OPEN_POPUP,
			open
		};
		expect(isOpen(open)).toEqual(expectedAction);
	});
});

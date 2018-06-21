import { popup } from '../../src/reducers/popup';
import { OPEN_POPUP } from '../../src/actions/isOpen';

describe('reducer', () => {
	it('should return the initial state', () => {
		expect(popup(undefined, {})).toEqual({
			createChannel: false
		});
	});
});

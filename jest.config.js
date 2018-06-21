module.exports = {
	setupFiles: ['./jest.setup.js'],
	snapshotSerializers: ['enzyme-to-json/serializer'],
	moduleNameMapper: {
		'^.+\\.(jpg|jpeg|gif|png|mp4|mkv|avi|webm|swf|wav|mid)$':
			'jest-static-stubs/$1',
		'\\.(css|less|scss|sass)$': 'identity-obj-proxy',
	},
};
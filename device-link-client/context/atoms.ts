import { atom } from 'recoil';

const phantomState = atom({
	key: 'phantomState',
	default: '',
});

const queryInfoState = atom({
	key: 'queryInfoState',
	default: {
		period: ['', ''],
		queries: {},
		count: 0,
	},
});

export { phantomState, queryInfoState };

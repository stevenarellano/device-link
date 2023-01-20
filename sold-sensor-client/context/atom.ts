import { atom } from 'recoil';

const phantomState = atom({
	key: 'phantomState',
	default: '',
});

export { phantomState };

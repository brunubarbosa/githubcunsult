import { createStore } from 'redux';

import reducers from './ducks';

export const store = createStore(reducers);

export default store;

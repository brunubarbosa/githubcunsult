import React from 'react';
import { Provider } from 'react-redux';

import store from './store';
import Route from './routes';
import GlobalStyles from './styles/global';

function App() {
  return (
    <>
        <Provider store={store}>
            <GlobalStyles store={store} />
            <Route/>
        </Provider>
    </>
  );
}

export default App;

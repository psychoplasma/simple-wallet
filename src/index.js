import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react'
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import networkStats from './reducers/networkStats';
import authReducer from './reducers/auth';
import wallet from './reducers/wallet';
import contracts from './reducers/contracts';
import App from './app';
const electronProcess = window.require('electron').remote.process;

const middlewares = [];
middlewares.push(thunk);

if (electronProcess.env.NODE_ENV === 'development' ) {
  // Logging Middleware
  const logger = createLogger({
    level: 'info',
    collapsed: true
  });

  middlewares.push(logger);
}

const authPersistConfig = {
  key: 'authState',
  storage,
  whitelist: ['encryptedWallet', 'network']
};

const contractPersistConfig = {
  key: 'contracts',
  storage,
  whitelist: ['mainnet', 'rinkeby', 'ropsten', 'klaytn-aspen']
};

const rootReducer = combineReducers({
  authState: persistReducer(authPersistConfig, authReducer),
  networkStats,
  wallet,
  contracts: persistReducer(contractPersistConfig, contracts)
});

const store = createStore(rootReducer, {}, applyMiddleware(...middlewares));
const persistor = persistStore(store);

render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App/>
    </PersistGate>
  </Provider>,
  window.document.getElementById('app')
);

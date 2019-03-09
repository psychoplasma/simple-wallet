import { combineReducers } from 'redux';
import authState from './auth';
import networkStats from './networkStats';
import wallet from './wallet';
import contracts from './contracts';


const rootReducer = combineReducers({
  authState,
  networkStats,
  wallet,
  contracts
});

// FIXME: Not used currently, every reducer set should be imported in `src/index.js` file directly
export default rootReducer;

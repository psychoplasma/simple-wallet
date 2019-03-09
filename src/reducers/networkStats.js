import {
  FETCH_GAS_PRICE,
  SET_GAS_PRICE
} from '../actions/actionTypes';
import { DEFAULT_PRICE_STATS } from '../api/networkStatsApi';

const initState = {
  fetching: false,
  gasPriceStats: DEFAULT_PRICE_STATS
};

const networkStats = (state = initState, action) => {
  switch (action.type) {
    case FETCH_GAS_PRICE:
      return {...state, fetching: true};
    case SET_GAS_PRICE:
     return {...state, fetching: false, gasPriceStats: action.payload}
  }

  return state;
};

export default networkStats;
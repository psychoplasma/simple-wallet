import {
  FETCH_GAS_PRICE,
  SET_GAS_PRICE
} from './actionTypes';
import { getGasPriceStats } from '../api/networkStatsApi';

export function setGasPrice(gasPriceStats) {
  return {
    type: SET_GAS_PRICE,
    payload: gasPriceStats
  }
}

export function fetchGasPrice() {
  return async (dispatch, getState) => {
    // Inform the store that fetching is in progress
    dispatch({type: FETCH_GAS_PRICE});

    const { authState } = getState();
    // And fetch the gas price stats
    let gasPriceStats = await getGasPriceStats(authState.network);
    // Then update the store with the new value set
    dispatch(setGasPrice(gasPriceStats));
  };
}

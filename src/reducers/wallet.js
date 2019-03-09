import * as ActionTypes from '../actions/actionTypes';


const initState = {
  gasEstimate: 6000000, // This must be the max block gas limit as a default
  isEstimating: false,
  txResponse: {},
  txReceipt: {},
  txHistory: [],
  assets: [],
  nativeBalance: '',
  processing: false,
  error: '',
};

const wallet = (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.WALLET_ESTIMATE_GAS:
      return {...state, error: '', isEstimating: true};
    case ActionTypes.WALLET_ESTIMATE_GAS_SUCCESS:
      return {...state, gasEstimate: action.payload, isEstimating: false};
    case ActionTypes.WALLET_ESTIMATE_GAS_FAILURE:
      return {...state, error: action.payload, isEstimating: false};
    case ActionTypes.WALLET_FETCH_TX:
      return {...state, txResponse: action.payload, processing: false, error: ''};
    case ActionTypes.WALLET_FETCH_TX_HISTORY:
      return {...state, txHistory: action.payload, processing: false, error: ''};
    case ActionTypes.WALLET_FETCH_TX_RECEIPT:
      return {...state, txReceipt: action.payload, processing: false, error: ''};
    case ActionTypes.WALLET_SEND_TX:
      return {...state, txResponse: action.payload, processing: false, error: ''};
    case ActionTypes.WALLET_FETCH_NATIVE_BALANCE:
      return {...state, nativeBalance: action.payload.balance, processing: false, error: ''};
    case ActionTypes.WALLET_FETCH_TOKEN_BALANCE:
      return {
        ...state,
        assets: {
          ...state.assets,
          [action.payload.tokenName]: {
            ...state.assets[action.payload.tokenName],
            balance: action.payload.balance
          }
        },
        processing: false,
        error: ''
      };
    case ActionTypes.WALLET_NETWORK_PROCESSING:
     return {...state, processing: true, error: ''};
    case ActionTypes.WALLET_NETWORK_FAILED:
      console.error(action.payload);
      return {...state, processing: false, error: action.payload};
  }

  return state;
};

export default wallet;
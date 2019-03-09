import * as ActionTypes from '../actions/actionTypes';
import { DEFAULT_NETWORK } from '../config';
import { ShowPopup } from '../utils/popup';


const initState = {
  wallet: {},
  isLoggedIn: false,
  processing: false,
  error: '',
  network: DEFAULT_NETWORK
};

const authState = (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_IMPORT_WALLET:
      return {
        ...state,
        encryptedWallet: action.payload,
        processing: false,
        error: ''
      };
    case ActionTypes.AUTH_LOGGED_IN:
      return {
        ...state,
        wallet: action.payload,
        isLoggedIn: true,
        processing: false,
        error: ''
      };
    case ActionTypes.AUTH_LOGOUT:
      return {
        ...state,
        wallet: undefined,
        isLoggedIn: false,
        processing: false,
        error: ''
      };
    case ActionTypes.AUTH_CONNECT_NETWORK:
      return {
        ...state,
        wallet: action.payload.wallet,
        network: action.payload.network,
        processing: false,
        error: ''
      };
    case ActionTypes.AUTH_PROCESSING:
      return {
        ...state,
        processing: true,
        error: ''
      };
    case ActionTypes.AUTH_FAILED:
      ShowPopup(action.payload);
      return {
        ...state,
        isLoggedIn: false,
        processing: false,
        error: action.payload
      };
  }

  return state;
};

export default authState;
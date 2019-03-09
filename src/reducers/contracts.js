import * as ActionTypes from '../actions/actionTypes';

const initState = {
  gasEstimate: 6000000, // This must be the max block gas limit as a default
  isEstimating: false,
  error: '',
};


const contracts = (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.CONTRACTS_ADD:
      return {
        ...state,
        [action.payload.network]: {
          ...state[action.payload.network],
          [action.payload.contractName]: {
            address: action.payload.address,
            interface: action.payload.contractInterface,
            balance: '',
            query: [],
            syncing: false,
            error: '',
            state: {}
          }
        }
      };
    case ActionTypes.CONTRACTS_REMOVE:
      delete state[action.payload.network][action.payload.contractName];
      return {...state};
    case ActionTypes.CONTRACTS_ESTIMATE_GAS:
      return {...state, error: '', isEstimating: true};
    case ActionTypes.CONTRACTS_ESTIMATE_GAS_SUCCESS:
      return {...state, gasEstimate: action.payload, isEstimating: false};
    case ActionTypes.CONTRACTS_ESTIMATE_GAS_FAILURE:
      return {...state, error: action.payload.error, isEstimating: false};
    case ActionTypes.CONTRACTS_STATE_SYNC:
      return {
        ...state,
        [action.payload.network]: {
          ...state[action.payload.network],
          [action.payload.contractName]: {
            ...state[action.payload.network][action.payload.contractName],
            syncing: true,
            error: ''
          }
        }
      };
    case ActionTypes.CONTRACTS_STATE_SYNC_SUCCESS:
      return {
        ...state,
        [action.payload.network]: {
          ...state[action.payload.network],
          [action.payload.contractName]: {
            ...state[action.payload.network][action.payload.contractName],
            state: action.payload.state,
            syncing: false
          }
        }
      };
    case ActionTypes.CONTRACTS_STATE_SYNC_FAILURE:
      return {
        ...state,
        [action.payload.network]: {
          ...state[action.payload.network],
          [action.payload.contractName]: {
            ...state[action.payload.network][action.payload.contractName],
            syncing: false,
            error: action.payload.error
          }
        }
      };
    case ActionTypes.CONTRACTS_READ:
      return {
        ...state,
        [action.payload.network]: {
          ...state[action.payload.network],
          [action.payload.contractName]: {
            ...state[action.payload.network][action.payload.contractName],
            query: {
              ...state[action.payload.network][action.payload.contractName].query,
              [action.payload.queryName]: {
                isFetching: true,
                result: '',
                error: ''
              }
            },
            error: ''
          }
        }
      };
    case ActionTypes.CONTRACTS_READ_SUCCESS:
      return {
        ...state,
        [action.payload.network]: {
          ...state[action.payload.network],
          [action.payload.contractName]: {
            ...state[action.payload.network][action.payload.contractName],
            query: {
              ...state[action.payload.network][action.payload.contractName].query,
              [action.payload.queryName]: {
                isFetching: false,
                result: action.payload.result
              }
            }
          }
        }
      };
    case ActionTypes.CONTRACTS_READ_FAILURE:
      return {
        ...state,
        [action.payload.network]: {
          ...state[action.payload.network],
          [action.payload.contractName]: {
            ...state[action.payload.network][action.payload.contractName],
            query: {
              ...state[action.payload.network][action.payload.contractName].query,
              [action.payload.queryName]: {
                isFetching: false,
                result: '',
                error: action.payload.error
              }
            }
          }
        }
      };
    case ActionTypes.CONTRACTS_FETCH_BALANCE:
      return {
        ...state,
        [action.payload.network]: {
          ...state[action.payload.network],
          [action.payload.contractName]: {
            ...state[action.payload.network][action.payload.contractName],
            balance: action.payload.balance
          }
        }
      };
  }

  return state;
};

export default contracts;
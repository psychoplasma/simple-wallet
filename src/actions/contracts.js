import merge from 'lodash/merge';
import { parseTxReceipt, parseTxResponse } from '../api/txParser';
import * as ActionTypes from './actionTypes';
import { parseContractData } from '../api/contractStateParser';
import {
  createQuery,
  parseQueryResult,
  getTokenBalance,
  sendTxFn,
  getContractState,
  getContractByInterface,
  getGasEstimate
} from '../api/contractApi';

export function addContract(contractName, contractInterface, address) {
  return (dispatch, getState) => {
    dispatch({
      type: ActionTypes.CONTRACTS_ADD,
      payload: {
        network: getState().authState.network,
        contractName,
        contractInterface,
        address
      }
    });
  }
}

export function removeContract(contractName, address) {
  return (dispatch, getState) => {
    dispatch({
      type: ActionTypes.CONTRACTS_REMOVE,
      payload: {
        network: getState().authState.network,
        contractName,
        address
      }
    });
  }
}

export function estimateGas(contractName, fnName, params) {
  return async (dispatch, getState) => {
    dispatch({
      type: ActionTypes.CONTRACTS_ESTIMATE_GAS,
      payload: { contractName }
    });

    try {
      const { authState, contracts } = getState();
      const contract = getContractByInterface(
        authState.wallet,
        contracts[authState.network][contractName].interface,
        contracts[authState.network][contractName].address
      );
      let gasEstimate = await getGasEstimate(contract, fnName, params);

      dispatch({
        type: ActionTypes.CONTRACTS_ESTIMATE_GAS_SUCCESS,
        payload: gasEstimate.toString(10)
      });
    } catch (e) {
      dispatch({
        type: ActionTypes.CONTRACTS_ESTIMATE_GAS_FAILURE,
        payload: {
          contractName,
          error: 'Transaction will most likely fail or be reverted by the target contract!'
        }
      });
    }
  }
}

export function fetchContractState(contractName) {
  return async (dispatch, getState) => {
    const { authState, contracts } = getState();

    dispatch({
      type: ActionTypes.CONTRACTS_STATE_SYNC,
      payload: {
        network: authState.network,
        contractName
      }
    });

    const contract = getContractByInterface(
      authState.wallet,
      contracts[authState.network][contractName].interface,
      contracts[authState.network][contractName].address
    );

    try {
      let state = await getContractState(contract);
      state = parseContractData(contractName, state);

      dispatch({
        type: ActionTypes.CONTRACTS_STATE_SYNC_SUCCESS,
        payload: {
          network: authState.network,
          contractName, 
          state 
        }
      });
    } catch (e) {
      dispatch({
        type: ActionTypes.CONTRACTS_STATE_SYNC_FAILURE,
        payload: {
          network: authState.network,
          contractName,
          error: e.message
        }
      });
    }
  };
}

export function writeContract(contractName, fnName, params, gasPrice, gasLimit) {
  return async (dispatch, getState) => {
    const { authState, contracts } = getState();

    dispatch({ type: ActionTypes.WALLET_NETWORK_PROCESSING });
    
    try {
      const contract = getContractByInterface(
        authState.wallet,
        contracts[authState.network][contractName].interface,
        contracts[authState.network][contractName].address
      );

      let txResponse = await sendTxFn(contract, fnName, params, gasPrice, gasLimit);
      let txReceipt = await txResponse.wait();

      dispatch({
        type: ActionTypes.WALLET_SEND_TX,
        payload: merge(parseTxResponse(txResponse), parseTxReceipt(txReceipt))
      });
    } catch (e) {
      console.log('writeContract => Error:', e);
      dispatch({
        type: ActionTypes.WALLET_NETWORK_FAILED,
        payload: e.message
      });
    }
  }
}

export function readContract(contractName, fnName, params) {
  return async (dispatch, getState) => {
    const { authState, contracts } = getState();

    dispatch({
      type: ActionTypes.CONTRACTS_READ,
      payload: {
        network: authState.network,
        contractName, 
        queryName: fnName 
      }
    });
    
    try {
      const contract = getContractByInterface(
        authState.wallet,
        contracts[authState.network][contractName].interface,
        contracts[authState.network][contractName].address
      );

      // Create a query and call it
      let query = createQuery(contract, fnName, params);
      let result = await query.call();
      // Parse the query result
      result = parseQueryResult(result, query.outputTypes);

      dispatch({
        type: ActionTypes.CONTRACTS_READ_SUCCESS,
        payload: { 
          network: authState.network,
          contractName, 
          queryName: fnName, 
          result 
        }
      });
    } catch (e) {
      dispatch({
        type: ActionTypes.CONTRACTS_READ_FAILURE,
        payload: {
          network: authState.network,
          contractName, 
          queryName: fnName, 
          error: e.message
        }
      });
    }
  }
}

export function fetchContractTokenBalance(contractName, tokenContractName) {
  return async (dispatch, getState) => {
    const { authState, contracts } = getState();
    const signer = authState.wallet;
    const network = authState.network;
    const contract = getContractByInterface(
      signer,
      contracts[network][contractName].interface,
      contracts[network][contractName].address
    );
    const token = getContractByInterface(
      signer,
      contracts[network][tokenContractName].interface,
      contracts[network][tokenContractName].address
    );

    try {
      let balance = await getTokenBalance(token, contract.address);

      dispatch({
        type: ActionTypes.CONTRACTS_FETCH_BALANCE,
        payload: { 
          network,
          contractName, 
          balance
        }
      });
    } catch (e) {
      console.log('contracts#fetchContractTokenBalance => Error:', e.message);
      // Ignored error: Token balance of a contract is not a crucial data
    }
  };
}

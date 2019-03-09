import _ from 'lodash';
import { utils, providers } from 'ethers';
import { parseTxReceipt, parseTxResponse } from '../api/txParser';
import * as ActionTypes from './actionTypes';
import { getTokenBalance, getNativeBalance, getSpinTokenContract } from '../api/contractApi';
import { SPIN_TOKEN_CONTRACT_NAME } from '../api/contractMetaData';


export function estimateGas(to, value, data, gasPrice) {
  return async (dispatch, getState) => {
    const { authState } = getState();
    dispatch({
      type: ActionTypes.WALLET_ESTIMATE_GAS,
    });
    
    try {
      let gasEstimate = await authState.wallet.provider.estimateGas({
        to,
        from: authState.wallet.address,
        value: utils.parseEther(value.toString(10)),
        data,
        gasPrice: utils.parseUnits(gasPrice, 'gwei').toHexString()
      });
      dispatch({
        type: ActionTypes.WALLET_ESTIMATE_GAS_SUCCESS,
        payload: gasEstimate.toString(10)
      });
    } catch (e) {
      dispatch({
        type: ActionTypes.WALLET_ESTIMATE_GAS_FAILURE,
        payload: 'Transaction will most likely fail or be reverted by the target contract!'
      });
    }
  }
}

export function sendTransaction(to, value, data, gasPrice, gasLimit) {
  return async (dispatch, getState) => {
    const { authState } = getState();
    
    dispatch({ type: ActionTypes.WALLET_NETWORK_PROCESSING });

    try {
      let txResponse = await authState.wallet.sendTransaction({
        to,
        value: utils.parseEther(value.toString(10)),
        data,
        gasPrice: utils.parseUnits(gasPrice, 'gwei').toHexString(),
        gasLimit: gasLimit && !isNaN(gasLimit) ? Number(gasLimit) : undefined
      });
      let txReceipt = await txResponse.wait();

      dispatch({
        type: ActionTypes.WALLET_SEND_TX,
        payload: _.merge(parseTxResponse(txResponse), parseTxReceipt(txReceipt))
      });
    } catch (e) {
      console.log('sendTransaction => Error:', e);
      dispatch({
        type: ActionTypes.WALLET_NETWORK_FAILED,
        payload: e.message
      });
    }
  }
}

export function fetchTransactionReceipt(txHash) {
  return async (dispatch, getState) => {
    dispatch({ type: ActionTypes.WALLET_NETWORK_PROCESSING });

    const { authState } = getState();

    try {
      let response = await authState.wallet.provider.getTransaction(txHash);
      let receipt = await authState.wallet.provider.getTransactionReceipt(txHash);
      response = parseTxResponse(response);
      receipt = parseTxReceipt(receipt);
      
      dispatch({
        type: ActionTypes.WALLET_FETCH_TX_RECEIPT,
        payload: _.merge(response, receipt)
      });
    } catch (e) {
      dispatch({
        type: ActionTypes.WALLET_NETWORK_FAILED,
        payload: e.message
      });
    }
  }
}

export function fetchTransaction(txHash) {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.WALLET_NETWORK_PROCESSING });

    const { authState } = getState();

    authState.wallet.provider.getTransaction(txHash)
      .then(response => {
        dispatch({
          type: ActionTypes.WALLET_FETCH_TX,
          payload: parseTxResponse(response)
        });
      })
      .catch(e => {
        dispatch({
          type: ActionTypes.WALLET_NETWORK_FAILED,
          payload: e.message
        });
      });
  }
}

export function fetchTransactionHistory() {
  return async (dispatch, getState) => {
    const { authState } = getState();

    dispatch({ type: ActionTypes.WALLET_NETWORK_PROCESSING });

    try {
      const etherscanProvider = new providers.EtherscanProvider(authState.network);
      let txHistory = await etherscanProvider.getHistory(authState.wallet.address);
      dispatch({
        type: ActionTypes.WALLET_FETCH_TX_HISTORY,
        payload: txHistory.map(parseTxResponse).sort((a, b) => b.timestamp - a.timestamp)
      });
    } catch (e) {
      dispatch({
        type: ActionTypes.WALLET_NETWORK_FAILED,
        payload: e.message
      });
    }
  }
}

export function fetchNativeBalance() {
  return async (dispatch, getState) => {
    const { authState } = getState();
    const signer = authState.wallet;

    try {
      let balance = await getNativeBalance(signer.provider, signer.address);

      dispatch({
        type: ActionTypes.WALLET_FETCH_NATIVE_BALANCE,
        payload: { balance }
      });
    } catch (e) {
      dispatch({
        type: ActionTypes.WALLET_NETWORK_FAILED,
        payload: e.message
      });
    }
  }
}

export function fetchTokenBalance() {
  return async (dispatch, getState) => {
    const { authState, contracts } = getState();
    const signer = authState.wallet;
    const tokenContractAddress = contracts[authState.network] && contracts[authState.network][SPIN_TOKEN_CONTRACT_NAME] 
        ? contracts[authState.network][SPIN_TOKEN_CONTRACT_NAME].address : '';

    try {
      const tokenContract = getSpinTokenContract(signer, tokenContractAddress);
      
      let balance = await getTokenBalance(tokenContract, signer.address, {format: true});

      dispatch({
        type: ActionTypes.WALLET_FETCH_TOKEN_BALANCE,
        payload: { tokenName: SPIN_TOKEN_CONTRACT_NAME, balance }
      });
    } catch (e) {
      dispatch({
        type: ActionTypes.WALLET_NETWORK_FAILED,
        payload: e.message
      });
    }
  }
}

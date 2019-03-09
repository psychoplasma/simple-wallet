import { getDefaultProvider } from 'ethers';
import { readUTF8File } from '../utils/fileUtils';
import * as ActionTypes from './actionTypes';
import {
  createWalletFromMnemonics,
  createWalletFromPrivateKey,
  encryptWallet,
  decryptWallet
} from '../utils/wallet-utils';


export function importMnemonics(mnemonics, password) {
  return async (dispatch) => {
    // Inform the store about dencryption is in progress
    dispatch({ type: ActionTypes.AUTH_PROCESSING });

    try {  
      // Retrieve wallet from the mnemonics and encrypt it
      const encryptedWallet = await encryptWallet(
        createWalletFromMnemonics(mnemonics),
        password
      );

      // Save the encrpyted wallet to the store
      dispatch({
        type: ActionTypes.AUTH_IMPORT_WALLET,
        payload: encryptedWallet
      });

      // And then login
      dispatch(login(password));
    } catch(e) {
      dispatch({
        type: ActionTypes.AUTH_FAILED,
        payload: e.message
      });
    }
  }
}

export function importKeystore(keystore, password) {
  return dispatch => {
    // Inform the store about encryption is in progress
    dispatch({ type: ActionTypes.AUTH_PROCESSING });

    readUTF8File(keystore)
      .then(encryptedWallet => {
        // Save the encrpyted wallet to the store
        dispatch({
          type: ActionTypes.AUTH_IMPORT_WALLET,
          payload: encryptedWallet
        });

        // And then login
        dispatch(login(password));
      })
      .catch(e => {
        console.log('Error while reading keystore file:', e);
        dispatch({
          type: ActionTypes.AUTH_FAILED,
          payload: e.message
        });
      });
  }
}

export function importPrivateKey(privateKey, password) {
  return async (dispatch) => {
    // Inform the store about dencryption is in progress
    dispatch({ type: ActionTypes.AUTH_PROCESSING });

    try {  
      // Retrieve wallet from the private key and encrypt it
      const encryptedWallet = await encryptWallet(
        createWalletFromPrivateKey(privateKey),
        password
      );

      // Save the encrpyted wallet to the store
      dispatch({
        type: ActionTypes.AUTH_IMPORT_WALLET,
        payload: encryptedWallet
      });

      // And then login
      dispatch(login(password));
    } catch(e) {
      dispatch({
        type: ActionTypes.AUTH_FAILED,
        payload: e.message
      });
    }
  }
}

export function login(password) {
  return (dispatch, getState) => {
    // Inform the store about encryption is in progress
    dispatch({ type: ActionTypes.AUTH_PROCESSING });
    // Get the encrypted wallet from the store
    // and decrypt it with the password
    const { authState } = getState();
    
    decryptWallet(authState.encryptedWallet, password)
      .then(wallet => {
        wallet = wallet.connect(getDefaultProvider(authState.network));
        dispatch({
          type: ActionTypes.AUTH_LOGGED_IN,
          payload: wallet
        });
      })
      .catch(e => {
        dispatch({
          type: ActionTypes.AUTH_FAILED,
          payload: e.message
        });
      });
  }
}

export function logout() {
  return { type: ActionTypes.AUTH_LOGOUT };
}

export function connectNetwork(network) {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.AUTH_PROCESSING });

    const { authState } = getState();

    let newWallet = authState.wallet.connect(getDefaultProvider(network));

    dispatch({
      type: ActionTypes.AUTH_CONNECT_NETWORK,
      payload: { wallet: newWallet, network}
    });
  }
}

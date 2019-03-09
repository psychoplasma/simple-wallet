import { Wallet } from 'ethers';


/**
 * @param {string} mnemonics 
 */
export function createWalletFromMnemonics(mnemonics) {
    return Wallet.fromMnemonic(mnemonics);
}

/**
 * @param {string} privateKey 
 */
export function createWalletFromPrivateKey(privateKey) {
    return new Wallet(privateKey);
}

/**
 * @param {Wallet} wallet 
 * @param {string} password 
 */
export function encryptWallet(wallet, password) {
    return wallet.encrypt(password);
}

/**
 * @param {string} encryptedJsonWallet 
 * @param {string} password 
 */
export function decryptWallet(encryptedJsonWallet, password) {
    return Wallet.fromEncryptedJson(encryptedJsonWallet, password);
}
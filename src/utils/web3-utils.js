import Web3 from 'web3';

const ETHEREUM_ADDR_PREFIX = '0x';


const web3 = new Web3();

export function toEther(wei, returnType) {
    if (returnType === 'bn') {
        return web3.utils.fromWei(`${wei}`, 'ether');
    }
    return Number(web3.utils.fromWei(`${wei}`, 'ether'));
}
  
export function toGwei(wei, returnType) {
    if (returnType === 'bn') {
        return web3.utils.fromWei(`${wei}`, 'gwei');
    }
    return Number(web3.utils.fromWei(`${wei}`, 'gwei'));
}

export function toWeiFromEther(eth, returnType) {
    if (returnType === 'bn') {
        return web3.utils.toWei(`${eth}`, 'ether');
    }
    return Number(web3.utils.toWei(`${eth}`, 'ether'));
}

export function toWeiFromGwei(gwei, returnType) {
    if (returnType === 'bn') {
        return web3.utils.toWei(`${gwei}`, 'gwei');
    }
    return Number(web3.utils.toWei(`${gwei}`, 'gwei'));
}

export function isValidAddress(address) {
    return address.startsWith(ETHEREUM_ADDR_PREFIX)
        && web3.utils.isAddress(`${address}`);
}

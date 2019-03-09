import { utils, Contract, providers, Signer } from 'ethers';
import { formatToken } from '../utils/conversions';
import { SPIN_TOKEN_CONTRACT_INTERFACE, SPIN_CROWDSALE_CONTRACT_INTERFACE } from './contractMetaData';


/**
 * Returns the addresses of smart contracts
 * for the provided network.
 * 
 * @param {string} network Network name
 */
export function getContractAddresses(network) {
  let tokenContractAddress = '0x0';
  let saleContractAddress = '0x0';

  switch (network) {
    case 'mainnet':
    case 'homestead':
      saleContractAddress = '0x0';
      tokenContractAddress = '0x0';
      break;
    case 'ropsten':
      saleContractAddress = '0xd1e51a5fbffba1145ee59e9ad50090139242f72d';
      tokenContractAddress = '0x4f22310c27ef39feaa4a756027896dc382f0b5e2';
      break;
    case 'rinkeby':
      saleContractAddress = '0xb1a8b1597c32dae4a25fae75afbdffb1cc821d28'//'0x17096cefd5587cc57c0e4baae14270220a137ad1';
      tokenContractAddress = '0xd97243b693c3173b165e975fc0bc1590e6acee15';
      break;
    case 'kovan':
      saleContractAddress = '0x0';
      tokenContractAddress = '0x0';
      break;
    case 'aspen':
      saleContractAddress = '0xe24abde016cd48b867cb9da8aadde869b5f2df08';
      tokenContractAddress = '0x760e61a237adfe8169887e160eca8c2ca80e2aac';
      break;
    default:
      throw new Error(`Unsupported network! network: "${network}"`);
  }

  return {
    tokenContractAddress,
    saleContractAddress
  }
}

/**
 * @param {providers.BaseProvider|Signer} signerOrProvider
 * @param {string} address 
 */
export function getSpinTokenContract(signerOrProvider, address) {
  return getContractByInterface(signerOrProvider, SPIN_TOKEN_CONTRACT_INTERFACE, address);
}

/**
 * @param {providers.BaseProvider|Signer} signerOrProvider
 * @param {string} address 
 */
export function getSpinSaleContract(signerOrProvider, address) {
  return getContractByInterface(signerOrProvider, SPIN_CROWDSALE_CONTRACT_INTERFACE, address);
}

/**
 * @param {providers.BaseProvider|Signer} signerOrProvider 
 * @param {object} contractInterface 
 * @param {string} address 
 */
export function getContractByInterface(signerOrProvider, contractInterface, address) {
  return new Contract(address, contractInterface, signerOrProvider);
}

/**
 * Sends a call to the network with provided function
 * and its parameters and then returns the gas spent.
 * 
 * @param {Contract} contract 
 * @param {string} fnName 
 * @param {object} params 
 */
export function getGasEstimate(contract, fnName, params) {
  const inputs = orderInputs(contract, fnName, params);
  return contract.estimate[fnName](...inputs);
}

/**
 * @param {providers.BaseProvider} provider 
 * @param {string} address 
 */
export async function getNativeBalance(provider, address) {
  let balance = await provider.getBalance(address);
  return utils.formatEther(balance).toString(10);
}

/**
 * @param {Contract} token Token contract
 * @param {string} address
 * @param {{format:boolean,decimals:string|number}} [options={format:false, decimals:18}]
 */
export async function getTokenBalance(token, address, options={format:false, decimals:18}) {
  let query = createQuery(token, 'balanceOf', {owner: address});
  let balance = await query.call();
  balance = parseQueryResult(balance, query.outputTypes);

  if (options && options.format) {
    return formatToken(balance, options.decimals || 18);
  }

  return balance;
}

/**
 * Fetches the current state of the contract.
 * Notice that only the functions marked 
 * with `constant:true` and `outputs:[]`
 * in ABI are called.
 * 
 * @param {Contract} contract 
 */
export async function getContractState(contract) {
  let state = [];
  // Iterate through the contract's ABI
  for (let i = 0; i < contract.interface.abi.length; i++) {
    let abi = contract.interface.abi[i];
    // Only fetch functions which are constant and do not take inputs
    if (abi.constant === true && abi.inputs.length === 0) {
      // Make a call to the network with the selected function
      let result = await contract[abi.name]();
      // Get the output types for formatting purpose later
      let outputTypes = abi.outputs.map(output => output.type);
      state[abi.name] = parseQueryResult(result, outputTypes);
    }
  }

  return state;
}

/**
 * Makes a function call with the given function name
 * to the given contract. The call will change the state
 * of the contract, i.e transaction call.
 * 
 * @param {Contract} contract
 * @param {string} fnName
 * @param {*} params
 * @param {string|number} gasPrice
 * @param {string|number} gasLimit
 * @returns {Promise<providers.TransactionResponse>}
 */
export function sendTxFn(contract, fnName, params, gasPrice, gasLimit) {
  // Put the inputs in the same order as the function takes them
  const inputs = orderInputs(contract, fnName, params);

  console.log('sendTxFn#inputs:', inputs);

  return contract[fnName](...inputs, {
    gasPrice: utils.parseUnits(gasPrice, 'gwei').toHexString(),
    gasLimit: gasLimit && !isNaN(gasLimit) ? Number(gasLimit) : undefined
  });
}

/**
 * Creates a query to read contract
 * 
 * @param {Contract} contract 
 * @param {string} queryName 
 * @param {object} params
 */
export function createQuery(contract, queryName, params) {
  const inputs = orderInputs(contract, queryName, params);

  if (!contract[queryName]) {
    throw new Error(`"${contract}" doesn't have any function named as "${queryName}"!`);
  }

  return {
    call: contract[queryName].bind(contract, ...inputs),
    outputTypes: contract.interface.functions[queryName].outputs.map(output => output.type)
  };
}

/**
 * Puts the input in the same order
 * as they are in the contract interface.
 * 
 * @param {Contract} contract 
 * @param {string} fnName 
 * @param {object} params 
 */
export function orderInputs(contract, fnName, params) {
  const inputs = [];
  contract.interface.functions[fnName].inputs.forEach(input => {
    if (params[input.name]) {
      inputs.push(params[input.name]);
    }
  });
  return inputs;
}

/**
 * Parses the query result according to type.
 * Basically, it only converts BigNumber types
 * to its string representation. If `result`
 * includes more than one value, the parsed result
 * will be an array of the parsed values.
 *
 * @param {*} result 
 * @param {Array<{type:string}>} outputTypes 
 */
export function parseQueryResult(result, outputTypes) {
  if (outputTypes.length > 1) {
    return outputTypes.map((type, i) => {
      return isBigNumber(type) && result[i] instanceof utils.BigNumber
        ? result[i].toString(10)
        : result[i];
    });
  }

  return isBigNumber(outputTypes[0]) && result instanceof utils.BigNumber
    ? result.toString(10)
    : result;
}

function isBigNumber(type) {
  switch (type) {
    case 'int':
    case 'int8':
    case 'int16':
    case 'int32':
    case 'int64':
    case 'int128':
    case 'int256':
    case 'uint':
    case 'uint8':
    case 'uint16':
    case 'uint32':
    case 'uint64':
    case 'uint128':
    case 'uint256':
      return true;
    default:
      return false;
  }
}
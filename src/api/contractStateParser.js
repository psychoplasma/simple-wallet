import { utils } from 'ethers';
import {
  SPIN_CROWDSALE_CONTRACT_NAME,
  SPIN_TOKEN_CONTRACT_NAME
} from "./contractMetaData";
import { formatToken } from '../utils/conversions';

export function parseContractData(contractName, dataSet) {
  switch (contractName) {
    case SPIN_CROWDSALE_CONTRACT_NAME:
      return parseSaleContractData(dataSet);
    case SPIN_TOKEN_CONTRACT_NAME:
      return parseTokenContractData(dataSet);
    default:
     throw new Error(`${contractName} is not supported for data parsing!`);
  }
}

function parseSaleContractData(dataSet) {
  return {
    isPhaseActive: dataSet.isActive,
    phaseIndex: dataSet.phaseIndex,
    phaseStart: dataSet.phaseStartTime * 1000,
    phaseEnd: dataSet.phaseEndTime * 1000,
    phaseBonusRate: dataSet.phaseBonusRate / 100,
    totalCap: utils.formatEther(dataSet.getTotalSaleCap),
    fundRaised: utils.formatEther(dataSet.weiRaised),
    rate: dataSet.rate,
    progress: utils.formatEther(dataSet.weiRaised) / utils.formatEther(dataSet.getTotalSaleCap) * 100,
    collectorAddress: dataSet.wallet,
    minCap: utils.formatEther(dataSet.getIndividualCaps[0]),
    maxCap: utils.formatEther(dataSet.getIndividualCaps[1]),
    lockedBalance: dataSet.getTotalLockedAmount
  }
}

// TODO: Must be generic
function parseTokenContractData(dataSet) {
  return {
    ...dataSet,
    totalSupply: formatToken(dataSet.totalSupply)
  };
}
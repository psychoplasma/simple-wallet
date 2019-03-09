import React from 'react';
import { connect } from 'react-redux';
import { utils } from 'ethers';
import CrowdsaleScreen from '../components/screens/Crowdsale';
import {
    SPIN_CROWDSALE_CONTRACT_NAME,
    SPIN_TOKEN_CONTRACT_NAME
} from '../api/contractMetaData';
import { parseToken, formatToken } from '../utils/conversions';
import { writeContractScreen } from '../navigationPaths';
import {
    fetchContractState,
    fetchContractTokenBalance
} from '../actions/contracts';

const DATA_SYNC_INTERVAL = 10000;


class Crowdsale extends React.Component {
    constructor(props) {
        super(props);
        this.syncInterval = null;
    }

    componentDidMount() {
        this.props.sync();
        this.syncInterval = setInterval(() => {this.props.sync()}, DATA_SYNC_INTERVAL);
    }

    componentWillUnmount() {
        clearInterval(this.syncInterval);
        this.syncInterval = null;
    }

    render() {
        return (
            <CrowdsaleScreen {...this.props}/>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onSetPhase: (purchaseRate, startTime, endTime, bonusRate) => {
            event.preventDefault();
            ownProps.history.push({
                pathname: writeContractScreen,
                state: {
                    contractName: SPIN_CROWDSALE_CONTRACT_NAME, 
                    functionName: 'setPhase',
                    params: {
                        purchaseRate,
                        startTime,
                        endTime,
                        bonusRate: bonusRate * 100
                    }
                }
            });
        },
        onSetIndiviualCaps: (minCap, maxCap) => {
            event.preventDefault();
            ownProps.history.push({
                pathname: writeContractScreen,
                state: {
                    contractName: SPIN_CROWDSALE_CONTRACT_NAME, 
                    functionName: 'setIndividualCaps',
                    params: {
                        minCap: utils.parseEther(minCap),
                        maxCap: utils.parseEther(maxCap)
                    }
                }
            });
        },
        onWithdrawEther: (amount) => {
            event.preventDefault();
            ownProps.history.push({
                pathname: writeContractScreen,
                state: {
                    contractName: SPIN_CROWDSALE_CONTRACT_NAME, 
                    functionName: 'withdrawEther',
                    params: {amount: utils.parseEther(amount)}
                }
            });
        },
        onWithdrawToken: (amount) => {
            event.preventDefault();
            ownProps.history.push({
                pathname: writeContractScreen,
                state: {
                    contractName: SPIN_CROWDSALE_CONTRACT_NAME, 
                    functionName: 'withdrawToken',
                    params: {amount: parseToken(amount)}
                }
            });
        },
        onSetWallet: (wallet) => {
            event.preventDefault();
            ownProps.history.push({
                pathname: writeContractScreen,
                state: {
                    contractName: SPIN_CROWDSALE_CONTRACT_NAME, 
                    functionName: 'setWallet',
                    params: {wallet}
                }
            });
        },
        sync: () => {
            dispatch(fetchContractTokenBalance(
                SPIN_CROWDSALE_CONTRACT_NAME,
                SPIN_TOKEN_CONTRACT_NAME
            ));
            dispatch(fetchContractState(SPIN_CROWDSALE_CONTRACT_NAME));
        }
    }
};

const mapStateToProps = ({ authState, contracts }) => {
    return {
        ...contracts[authState.network][SPIN_CROWDSALE_CONTRACT_NAME].state,
        contractAddress: contracts[authState.network][SPIN_CROWDSALE_CONTRACT_NAME].address,
        balance: formatToken(contracts[authState.network][SPIN_CROWDSALE_CONTRACT_NAME].balance),
        lockedBalance: contracts[authState.network][SPIN_CROWDSALE_CONTRACT_NAME].state.lockedBalance
            ? formatToken(contracts[authState.network][SPIN_CROWDSALE_CONTRACT_NAME].state.lockedBalance)
            : 'N/A',
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Crowdsale);

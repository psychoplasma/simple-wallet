import React from 'react';
import { connect } from 'react-redux';
import { utils } from 'ethers';
import {
    SPIN_CROWDSALE_CONTRACT_NAME,
    SPIN_TOKEN_CONTRACT_NAME
} from '../api/contractMetaData';
import { parseToken, formatToken } from '../utils/conversions';
import { writeContractScreen, lockDetailsScreen, lockedTokenListScreen } from '../navigationPaths';
import {
    fetchContractState,
    fetchContractTokenBalance,
    readContract
} from '../actions/contracts';
import VestingAndLocksScreen from '../components/screens/VestingAndLocks';

const DATA_SYNC_INTERVAL = 10000;


class VestingAndLocks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalEarned: '',
            unlockable: ''
        }
        this.syncInterval = null;
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.props.query['getTotalLockedTokens'] &&
            this.props.query['getTotalLockedTokens'].isFetching &&
            !nextProps.query['getTotalLockedTokens'].isFetching) {
            this.setState({totalEarned: formatToken(nextProps.query['getTotalLockedTokens'].result)});
        }

        if (this.props.query['getUnlockableTokens'] &&
            this.props.query['getUnlockableTokens'].isFetching &&
            !nextProps.query['getUnlockableTokens'].isFetching) {
            this.setState({unlockable: formatToken(nextProps.query['getUnlockableTokens'].result)});
        }
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
            <VestingAndLocksScreen
                {...this.props}
                totalEarned={this.state.totalEarned}
                unlockable={this.state.unlockable}
            />
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onSetVestingPeriods: (periods) => {
            event.preventDefault();
            ownProps.history.push({
                pathname: writeContractScreen,
                state: {
                    contractName: SPIN_CROWDSALE_CONTRACT_NAME, 
                    functionName: 'setLockPeriods',
                    params: {periods}
                }
            });
        },
        onTokenRelease: (accounts) => {
            event.preventDefault();
            ownProps.history.push({
                pathname: writeContractScreen,
                state: {
                    contractName: SPIN_CROWDSALE_CONTRACT_NAME, 
                    functionName: 'releaseTokens',
                    params: {accounts}
                }
            });
        },
        onTokenUnlock: (_of) => {
            event.preventDefault();
            ownProps.history.push({
                pathname: writeContractScreen,
                state: {
                    contractName: SPIN_CROWDSALE_CONTRACT_NAME, 
                    functionName: 'unlock',
                    params: {_of}
                }
            });
        },
        onTokenUnlockableCheck: (_of) => {
            event.preventDefault();
            dispatch(readContract(SPIN_CROWDSALE_CONTRACT_NAME, 'getTotalLockedTokens', {_of}));
            dispatch(readContract(SPIN_CROWDSALE_CONTRACT_NAME, 'getUnlockableTokens', {_of}));
        },
        onTokenUnlockableListCheck: (addressList) => {
            event.preventDefault();
            ownProps.history.push({
                pathname: lockedTokenListScreen,
                state: { addressList }
            });
        },
        onLockDetailsCheck: (address) => {
            event.preventDefault();
            ownProps.history.push({
                pathname: lockDetailsScreen,
                state: { address }
            });
        },
        onTokenVest: (dedicatedAccounts, dedicatedTokens) => {
            event.preventDefault();
            ownProps.history.push({
                pathname: writeContractScreen,
                state: {
                    contractName: SPIN_CROWDSALE_CONTRACT_NAME, 
                    functionName: 'vestDedicatedTokens',
                    params: {
                        dedicatedAccounts,
                        dedicatedTokens
                    }
                }
            });
        },
        onTokenVestManually: (to, reason, amount, time) => {
            event.preventDefault();
            ownProps.history.push({
                pathname: writeContractScreen,
                state: {
                    contractName: SPIN_CROWDSALE_CONTRACT_NAME, 
                    functionName: 'lock',
                    params: {
                        to,
                        reason: reason.map(utils.formatBytes32String),
                        amount: amount.map(a => parseToken(a)),
                        time: time.map(t => Math.floor(Date.parse(t) / 1000))
                    }
                }
            });
        },
        onDeliverPurchases: (beneficiaries, tokenAmounts, bonusAmounts, bonusExpiry) => {
            event.preventDefault();
            console.log('beneficiaries', beneficiaries);
            console.log('tokenAmounts', tokenAmounts);
            console.log('bonusAmounts', bonusAmounts);
            console.log('bonusExpiry', Math.floor(Date.parse(bonusExpiry) / 1000));
            ownProps.history.push({
                pathname: writeContractScreen,
                state: {
                    contractName: SPIN_CROWDSALE_CONTRACT_NAME, 
                    functionName: 'deliverPurchasedTokensManually',
                    params: {
                        beneficiaries,
                        tokenAmounts,
                        bonusAmounts,
                        bonusExpiry: Math.floor(Date.parse(bonusExpiry) / 1000)
                    }
                }
            });
        },
        onTokenLock: (to, reason, amount, time) => {
            event.preventDefault();
            ownProps.history.push({
                pathname: writeContractScreen,
                state: {
                    contractName: SPIN_CROWDSALE_CONTRACT_NAME, 
                    functionName: 'lock',
                    params: {
                        to: [to],
                        reason: [utils.formatBytes32String(reason)],
                        amount: [parseToken(amount)],
                        time: [time]
                    }
                }
            });
        },
        onAdjustLockTime: (to, reason, time) => {
            event.preventDefault();
            ownProps.history.push({
                pathname: writeContractScreen,
                state: {
                    contractName: SPIN_CROWDSALE_CONTRACT_NAME, 
                    functionName: 'adjustLockPeriod',
                    params: {
                        to,
                        reason: utils.formatBytes32String(reason),
                        time
                    }
                }
            });
        },
        onIncreaseLockAmount: (to, reason, amount) => {
            event.preventDefault();
            ownProps.history.push({
                pathname: writeContractScreen,
                state: {
                    contractName: SPIN_CROWDSALE_CONTRACT_NAME, 
                    functionName: 'increaseLockAmount',
                    params: {
                        to,
                        reason: utils.formatBytes32String(reason),
                        amount: parseToken(amount)
                    }
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
        query: contracts[authState.network][SPIN_CROWDSALE_CONTRACT_NAME].query,
        unlockableLoading: contracts[authState.network][SPIN_CROWDSALE_CONTRACT_NAME].query['getTotalLockedTokens']
            ? contracts[authState.network][SPIN_CROWDSALE_CONTRACT_NAME].query['getTotalLockedTokens'].isFetching
            : false,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VestingAndLocks);

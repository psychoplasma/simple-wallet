import React from 'react';
import { connect } from 'react-redux';
import SpinTokenScreen from '../components/screens/SpinToken';
import { SPIN_TOKEN_CONTRACT_NAME } from '../api/contractMetaData';
import { writeContractScreen } from '../navigationPaths';
import { parseToken, formatToken } from '../utils/conversions';
import { fetchContractState, readContract } from '../actions/contracts';

const DATA_SYNC_INTERVAL = 10000;


class SpinToken extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            balanceOf: 'N/A',
            allowance: 'N/A'
        };
        this.syncInterval = null;
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.props.query['balanceOf'] &&
            this.props.query['balanceOf'].isFetching &&
            !nextProps.query['balanceOf'].isFetching) {
            this.setState({balanceOf: formatToken(nextProps.query['balanceOf'].result)});
        }

        if (this.props.query['allowance'] &&
            this.props.query['allowance'].isFetching &&
            !nextProps.query['allowance'].isFetching) {
            this.setState({allowance: formatToken(nextProps.query['allowance'].result)});
        }
    }

    componentDidMount() {
        this.props.sync();
        this.syncInterval = setInterval(() => { this.props.sync() }, DATA_SYNC_INTERVAL);
    }

    componentWillUnmount() {
        clearInterval(this.syncInterval);
        this.syncInterval = null;
    }

    render() {
        return (
            <SpinTokenScreen
                balanceOf={this.state.balanceOf}
                allowance={this.state.allowance}
                {...this.props}
            />
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onTokenSend: (to, amount) => {
            event.preventDefault();
            ownProps.history.push({
                pathname: writeContractScreen,
                state: {
                    contractName: SPIN_TOKEN_CONTRACT_NAME, 
                    functionName: 'transfer',
                    params: {to, amount: parseToken(amount)}
                }
            });
        },
        onTokenMint: (to, value) => {
            event.preventDefault();
            ownProps.history.push({
                pathname: writeContractScreen,
                state: {
                    contractName: SPIN_TOKEN_CONTRACT_NAME, 
                    functionName: 'mint',
                    params: {to, value: parseToken(value)}
                }
            });
        },
        onTokenBurn: (value) => {
            event.preventDefault();
            ownProps.history.push({
                pathname: writeContractScreen,
                state: {
                    contractName: SPIN_TOKEN_CONTRACT_NAME, 
                    functionName: 'burn',
                    params: {value: parseToken(value)}
                }
            });
        },
        onTokenBurnFrom: (from, value) => {
            event.preventDefault();
            ownProps.history.push({
                pathname: writeContractScreen,
                state: {
                    contractName: SPIN_TOKEN_CONTRACT_NAME, 
                    functionName: 'burnFrom',
                    params: {from, value: parseToken(value)}
                }
            });
        },
        onTokenPause: () => {
            event.preventDefault();
            ownProps.history.push({
                pathname: writeContractScreen,
                state: {
                    contractName: SPIN_TOKEN_CONTRACT_NAME, 
                    functionName: 'pause',
                    params: {}
                }
            });
        },
        onTokenUnpause: () => {
            event.preventDefault();
            ownProps.history.push({
                pathname: writeContractScreen,
                state: {
                    contractName: SPIN_TOKEN_CONTRACT_NAME, 
                    functionName: 'unpause',
                    params: {}
                }
            });
        },
        onTokenBalanceCheck: (owner) => {
            event.preventDefault();
            dispatch(readContract(
                SPIN_TOKEN_CONTRACT_NAME, 
                'balanceOf',
                {owner}
            ));
        },
        onTokenAllowanceCheck: (owner, spender) => {
            event.preventDefault();
            dispatch(readContract(
                SPIN_TOKEN_CONTRACT_NAME, 
                'allowance',
                {owner, spender}
            ));
        },
        sync: () => {
            dispatch(fetchContractState(SPIN_TOKEN_CONTRACT_NAME));
        }
    }
};

const mapStateToProps = ({authState, contracts}) => {
    return {
        ...contracts[authState.network][SPIN_TOKEN_CONTRACT_NAME].state,
        contractAddress: contracts[authState.network][SPIN_TOKEN_CONTRACT_NAME].address,
        query: contracts[authState.network][SPIN_TOKEN_CONTRACT_NAME].query,
        loadingBalanceOf: contracts[authState.network][SPIN_TOKEN_CONTRACT_NAME].query['balanceOf']
            ? contracts[authState.network][SPIN_TOKEN_CONTRACT_NAME].query['balanceOf'].isFetching
            : false,
        loadingAllowance: contracts[authState.network][SPIN_TOKEN_CONTRACT_NAME].query['allowance']
            ? contracts[authState.network][SPIN_TOKEN_CONTRACT_NAME].query['allowance'].isFetching
            : false,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpinToken);

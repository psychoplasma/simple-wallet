import React from 'react';
import { connect } from 'react-redux';
import PermissionScreen from '../components/screens/Permission';
import { SPIN_CROWDSALE_CONTRACT_NAME } from '../api/contractMetaData';
import { writeContractScreen } from '../navigationPaths';
import { readContract } from '../actions/contracts';


class Permission extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAdmin: 'N/A',
            isWhitelisted: 'N/A'
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.props.query['isAdmin'] &&
            this.props.query['isAdmin'].isFetching &&
            !nextProps.query['isAdmin'].isFetching) {
            this.setState({isAdmin: nextProps.query['isAdmin'].result});
        }

        if (this.props.query['isWhitelisted'] &&
            this.props.query['isWhitelisted'].isFetching &&
            !nextProps.query['isWhitelisted'].isFetching) {
            this.setState({isWhitelisted: nextProps.query['isWhitelisted'].result});
        }
    }

    render() {
        return ( 
            <PermissionScreen
                isAdmin={this.state.isAdmin}
                isWhitelisted={this.state.isWhitelisted}
                {...this.props}
            />
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onAddWhitelist: (accounts) => {
            event.preventDefault();
            ownProps.history.push({
                pathname: writeContractScreen,
                state: {
                    contractName: SPIN_CROWDSALE_CONTRACT_NAME, 
                    functionName: 'addWhitelist',
                    params: { accounts }
                }
            });
        },
        onAddToWhitelist: (account) => {
            event.preventDefault();
            ownProps.history.push({
                pathname: writeContractScreen,
                state: {
                    contractName: SPIN_CROWDSALE_CONTRACT_NAME, 
                    functionName: 'addToWhitelist',
                    params: { account }
                }
            });
        },
        onRemoveFromWhitelist: (account) => {
            event.preventDefault();
            ownProps.history.push({
                pathname: writeContractScreen,
                state: {
                    contractName: SPIN_CROWDSALE_CONTRACT_NAME, 
                    functionName: 'removeFromWhitelist',
                    params: { account }
                }
            });
        },
        onAddAdmin: (account) => {
            event.preventDefault();
            ownProps.history.push({
                pathname: writeContractScreen,
                state: {
                    contractName: SPIN_CROWDSALE_CONTRACT_NAME, 
                    functionName: 'addAdmin',
                    params: { account }
                }
            });
        },
        onRenounceAdmin: () => {
            event.preventDefault();
            ownProps.history.push({
                pathname: writeContractScreen,
                state: {
                    contractName: SPIN_CROWDSALE_CONTRACT_NAME, 
                    functionName: 'renounceAdmin',
                    params: {}
                }
            });
        },
        onAdminCheck: (account) => {
            dispatch(readContract(
                SPIN_CROWDSALE_CONTRACT_NAME,
                'isAdmin',
                {account}
            ));
        },
        onWhitelistCheck: (account) => {
            dispatch(readContract(
                SPIN_CROWDSALE_CONTRACT_NAME,
                'isWhitelisted',
                {account}
            ));
        }
    }
};

const mapStateToProps = ({ contracts, authState }) => {
    return {
        thisAccount: authState.wallet.address,
        contractAddress: contracts[authState.network][SPIN_CROWDSALE_CONTRACT_NAME].address,
        query: contracts[authState.network][SPIN_CROWDSALE_CONTRACT_NAME].query,
        loadingIsAdmin: contracts[authState.network][SPIN_CROWDSALE_CONTRACT_NAME].query['isAdmin']
            ? contracts[authState.network][SPIN_CROWDSALE_CONTRACT_NAME].query['isAdmin'].isFetching
            : false,
        loadingIsWhitelisted: contracts[authState.network][SPIN_CROWDSALE_CONTRACT_NAME].query['isWhitelisted']
            ? contracts[authState.network][SPIN_CROWDSALE_CONTRACT_NAME].query['isWhitelisted'].isFetching
            : false,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Permission);

import React from 'react';
import { connect } from 'react-redux';
import { addContract } from '../actions/contracts';
import {
  SPIN_TOKEN_CONTRACT_NAME,
  SPIN_TOKEN_CONTRACT_INTERFACE,
  SPIN_CROWDSALE_CONTRACT_NAME,
  SPIN_CROWDSALE_CONTRACT_INTERFACE
} from '../api/contractMetaData';
import SettingsScreen from '../components/screens/Settings';


class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.onSetContractAddressesHandler= this.onSetContractAddressesHandler.bind(this);
    this.goBackHandler = this.goBackHandler.bind(this);
  }

  onSetContractAddressesHandler(tokenContractAddress, saleContractAddress) {
    // Set token and sale contract addresses
    this.props.dispatch(addContract(
      SPIN_TOKEN_CONTRACT_NAME,
      SPIN_TOKEN_CONTRACT_INTERFACE,
      tokenContractAddress
    ));
    this.props.dispatch(addContract(
      SPIN_CROWDSALE_CONTRACT_NAME,
      SPIN_CROWDSALE_CONTRACT_INTERFACE,
      saleContractAddress
    ));
  }

  goBackHandler() {
    this.props.history.goBack();
  }

  render() {
    return (
      <SettingsScreen
        {...this.props}
        onSetContractAddresses={this.onSetContractAddressesHandler}
        goBack={this.goBackHandler}
      />
    );
  }
}

const mapStateToProps = ({ wallet, contracts, authState }) => {
  return {
    processing: wallet.processing,
    tokenContractAddress: contracts[authState.network] && contracts[authState.network][SPIN_TOKEN_CONTRACT_NAME] 
      ? contracts[authState.network][SPIN_TOKEN_CONTRACT_NAME].address : '',
    saleContractAddress: contracts[authState.network] && contracts[authState.network][SPIN_CROWDSALE_CONTRACT_NAME]
      ? contracts[authState.network][SPIN_CROWDSALE_CONTRACT_NAME].address : ''
  };
}

export default connect(mapStateToProps)(Settings);

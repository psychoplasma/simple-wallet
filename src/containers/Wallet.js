import React from 'react';
import { connect } from 'react-redux';
import WalletScreen from '../components/screens/Wallet';
import {
  historyScreen,
  loginScreen,
  restoreScreen,
  sendScreen,
  settingsScreen
} from '../navigationPaths';
import { NETWORK_LIST } from '../config';
import { SPIN_TOKEN_CONTRACT_NAME } from '../api/contractMetaData';
import { connectNetwork, logout } from '../actions/auth';
import { fetchNativeBalance, fetchTokenBalance } from '../actions/wallet';
const SYNC_INTERVAL = 5000;


class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.onLogoutHandler = this.onLogoutHandler.bind(this);
    this.onImportHandler = this.onImportHandler.bind(this);
    this.goToSendHandler = this.goToSendHandler.bind(this);
    this.onNetworkChangeHandler = this.onNetworkChangeHandler.bind(this);
    this.goToHistoryHandler= this.goToHistoryHandler.bind(this);
    this.goToSettingsHandler = this.goToSettingsHandler.bind(this);
    this.sync = this.sync.bind(this);
    this.syncInterval = null;
  }

  componentDidMount() {
    this.sync();
    this.syncInterval = setInterval(this.sync, SYNC_INTERVAL);
  }

  componentWillUnmount() {
    clearInterval(this.syncInterval);
    this.syncInterval = null;
  }

  sync() {
    this.props.dispatch(fetchNativeBalance());
    this.props.dispatch(fetchTokenBalance());
  }

  onLogoutHandler() {
    this.props.dispatch(logout());
    // Go to login screen
    this.props.history.push(loginScreen);
  }

  onImportHandler() {
    this.props.dispatch(logout());
    // Go to restore screen
    this.props.history.push(restoreScreen);
  }

  goToSendHandler() {
    this.props.history.push(sendScreen);
  }

  onNetworkChangeHandler(network) {
    this.props.dispatch(connectNetwork(network));
  }

  goToSettingsHandler() {
    this.props.history.push(settingsScreen);
  }

  goToHistoryHandler() {
    this.props.history.push(historyScreen);
  }

  render() {
    return (
      <WalletScreen
        networkList={NETWORK_LIST}
        network={this.props.network}
        address={this.props.address}
        balance={this.props.balance}
        spinBalance={this.props.spinBalance}
        onNetworkChange={this.onNetworkChangeHandler}
        onLogout={this.onLogoutHandler}
        onImport={this.onImportHandler}
        goToSend={this.goToSendHandler}
        goToHistory={this.goToHistoryHandler}
        goToSettings={this.goToSettingsHandler}
      />
    );
  }
}

const mapStateToProps = ({ authState, wallet }) => {
  return {
      network: authState.network,
      isLoggedIn: authState.isLoggedIn,
      address: authState.wallet.address,
      balance: wallet.nativeBalance,
      spinBalance: wallet.assets[SPIN_TOKEN_CONTRACT_NAME]
        ? wallet.assets[SPIN_TOKEN_CONTRACT_NAME].balance
        : ''
  };
}

export default connect(mapStateToProps)(Wallet);

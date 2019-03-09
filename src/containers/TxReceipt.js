import React from 'react';
import { connect } from 'react-redux';
import { fetchTransactionReceipt } from '../actions';
import TxReceiptScreen from '../components/screens/TxReceipt';
import { sendTransactionScreen } from '../navigationPaths';


class TxReceipt extends React.Component {
  constructor(props) {
    super(props);
    this.onDoneHandler= this.onDoneHandler.bind(this);
  }

  componentDidMount() {
    // If this screen is navigated without `txResponse` parameter
    // fetch transaction receipt with the `txHash` parameter
    if (!this.props.location.state.txResponse) {
      this.props.dispatch(
        fetchTransactionReceipt(this.props.location.state.txHash)
      );
    }
  }

  onDoneHandler() {
    if (this.props.location.state.navigatedFrom === sendTransactionScreen) {
      // If navigated through send asset,
      // at the end go back to Wallet Screen
      this.props.history.go(-2);
    } else {
      // Just go back to previous screen
      this.props.history.goBack();
    }
  }

  render() {
    return (
      <TxReceiptScreen
        txReceipt={this.props.location.state.txResponse || this.props.txReceipt}
        onDone={this.onDoneHandler}
        processing={this.props.processing}
      />
    );
  }
}

const mapStateToProps = ({ wallet }) => {
  return {
    txReceipt: wallet.txReceipt,
    processing: wallet.processing
  };
}

export default connect(mapStateToProps)(TxReceipt);
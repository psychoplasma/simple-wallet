import React from 'react';
import { connect } from 'react-redux';
import { fetchGasPrice, sendTransaction } from '../actions';
import SendTransactionScreen from '../components/screens/SendTransaction';
import { txReceiptScreen, sendTransactionScreen } from '../navigationPaths';
import { utils } from 'ethers';
import { estimateGas } from '../actions/wallet';


class SendTransaction extends React.Component {
  constructor(props) {
    super(props);
    this.onSendHandler= this.onSendHandler.bind(this);
    this.goBackHandler = this.goBackHandler.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!!this.props.processing && !nextProps.processing) {
      // Go to Tx-Receipt screen
      this.props.history.push({
        pathname: txReceiptScreen,
        state: { txResponse: nextProps.txResponse, navigatedFrom: sendTransactionScreen }
      });
    }
  }

  componentDidMount() {
    this.props.dispatch(fetchGasPrice());

    let { location, gasPrice } = this.props;
    this.props.dispatch(estimateGas(
      location.state.to,
      location.state.value,
      location.state.data,
      gasPrice
    ));
  }

  onSendHandler(to, value, data, gasPrice, gasLimit) {
    return this.props.dispatch(sendTransaction(
      to,
      value,
      data,
      gasPrice,
      gasLimit
    ));
  }

  goBackHandler() {
    this.props.history.goBack();
  }

  render() {
    let { gasPrice, gasLimit, error, processing, location } = this.props;
    return (
      <SendTransactionScreen
        to={location.state.to}
        amount={location.state.value}
        data={location.state.data}
        gasPrice={gasPrice}
        gasLimit={gasLimit}
        error={error}
        processing={processing}
        onSend={this.onSendHandler}
        goBack={this.goBackHandler}
      />
    );
  }
}

const mapStateToProps = ({ networkStats, wallet }) => {
  return {
    gasPrice: utils.formatUnits(networkStats.gasPriceStats.avg, 'gwei'),
    gasLimit: wallet.gasEstimate,
    error: wallet.error,
    txResponse: wallet.txResponse,
    processing: wallet.processing
  };
}

export default connect(mapStateToProps)(SendTransaction);

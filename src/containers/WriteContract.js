import React from 'react';
import { connect } from 'react-redux';
import { fetchGasPrice } from '../actions';
import { estimateGas, writeContract } from '../actions/contracts';
import WriteContractScreen from '../components/screens/WriteContract';
import { txReceiptScreen, sendTransactionScreen } from '../navigationPaths';
import { utils } from 'ethers';


class WriteContract extends React.Component {
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
        state: {
          txResponse: nextProps.txResponse,
          navigatedFrom: sendTransactionScreen
        }
      });
    }
  }

  componentDidMount() {
    this.props.dispatch(fetchGasPrice());

    let {contractName, functionName, params} = this.props.location.state;
    this.props.dispatch(
      estimateGas(contractName, functionName, params)
    );
  }

  onSendHandler(gasPrice, gasLimit) {
    let {contractName, functionName, params} = this.props.location.state;
    this.props.dispatch(writeContract(
      contractName,
      functionName,
      params,
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
      <WriteContractScreen
        functionSignature={location.state.functionName}
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

const mapStateToProps = ({ networkStats, wallet, contracts }) => {
  return {
    gasPrice: utils.formatUnits(networkStats.gasPriceStats.avg, 'gwei'),
    gasLimit: contracts.gasEstimate,
    error: contracts.error,
    processing: wallet.processing,
    txResponse: wallet.txResponse,
  };
}

export default connect(mapStateToProps)(WriteContract);

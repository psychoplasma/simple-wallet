import React from 'react';
import { connect } from 'react-redux';
import { fetchTransactionHistory } from '../actions';
import { txReceiptScreen } from '../navigationPaths';
import HistoryScreen from '../components/screens/History';


class History extends React.Component {
  constructor(props) {
    super(props);
    this.goBackHandler= this.goBackHandler.bind(this);
    this.onItemClickHandler = this.onItemClickHandler.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchTransactionHistory());
  }

  onItemClickHandler(txHash) {
    this.props.history.push({
      pathname: txReceiptScreen,
      state: { txHash }
    });
  }

  goBackHandler() {
    // Go back to Wallet Screen
    this.props.history.goBack();
  }

  render() {
    return (
      <HistoryScreen
        txHistory={this.props.txHistory}
        processing={this.props.processing}
        onItemClick={this.onItemClickHandler}
        goBack={this.goBackHandler}
      />
    );
  }
}

const mapStateToProps = ({ wallet }) => {
  return {
    txHistory: wallet.txHistory,
    processing: wallet.processing
  };
}

export default connect(mapStateToProps)(History);
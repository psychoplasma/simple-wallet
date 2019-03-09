import React from 'react';
import { connect } from 'react-redux';
import { SPIN_CROWDSALE_CONTRACT_NAME } from '../api/contractMetaData';
import LockedTokenListScreen from '../components/screens/LockedTokenList';
import { formatToken } from '../utils/conversions';
import {
  createQuery,
  parseQueryResult,
  getContractByInterface
} from '../api/contractApi';


class LockedTokenList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columnHeaders: ['address', 'unlockable tokens', 'locked tokens'],
      rows: [],
      processing: false
    };
    this.contract = getContractByInterface(
      props.wallet,
      props.contract.interface,
      props.contract.address
    );
  }

  async componentDidMount() {
    const { addressList } = this.props.location.state;
    this.setState({processing: true});
    
    for (let i = 0; i < addressList.length; i++) {
      try {
        let totalLocked = await this.getTotalLockedTokens(addressList[i]);
        let unlockable = await this.getUnlockableTokens(addressList[i]);
        this.setState(state => {
          let { rows } = state;
          rows.push({ address: addressList[i], unlockable: formatToken(unlockable), totalLocked: formatToken(totalLocked) });
          return { rows };
        });
      } catch (e) {
        console.log('Error:', e);
        this.setState(state => {
          let { rows } = state;
          rows.push({ address: addressList[i], unlockable: 'error', totalLocked: 'error'});
          return { rows };
        });
      }
    }
    this.setState({processing: false});
  }
  
  async getTotalLockedTokens(address) {
    // Create a query and call it
    let query = createQuery(this.contract, 'getTotalLockedTokens', {_of: address});
    let result = await query.call();
    // Parse the query result
    return parseQueryResult(result, query.outputTypes);
  }

  async getUnlockableTokens(address) {
    // Create a query and call it
    let query = createQuery(this.contract, 'getUnlockableTokens', {_of: address});
    let result = await query.call();
    // Parse the query result
    return parseQueryResult(result, query.outputTypes);
  }

  goBackHandler = () => {
    this.props.history.goBack();
  }

  render() {
    return (
      <LockedTokenListScreen
        processing={this.state.processing}
        columnHeaders={this.state.columnHeaders}
        rows={this.state.rows}
        goBack={this.goBackHandler}
      />
    );
  }
}

const mapStateToProps = ({ authState, contracts }) => {
  return {
    contract: contracts[authState.network][SPIN_CROWDSALE_CONTRACT_NAME],
    wallet: authState.wallet
  };
};

export default connect(mapStateToProps)(LockedTokenList);

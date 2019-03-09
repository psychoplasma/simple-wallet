import React from 'react';
import { connect } from 'react-redux';
import { SPIN_CROWDSALE_CONTRACT_NAME } from '../api/contractMetaData';
import LockDetailsScreen from '../components/screens/LockDetails';
import { formatToken } from '../utils/conversions';
import {
  createQuery,
  parseQueryResult,
  getContractByInterface
} from '../api/contractApi';
import {utils} from 'ethers';
import _ from 'lodash';


class LockDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columnHeaders: ['address', 'unlockable tokens', 'locked tokens'],
      rows: [],
      owner: '',
      totalLockedAmount: '',
      totalClaimableAmount: '',
      processing: false
    };
    this.contract = getContractByInterface(
      props.wallet,
      props.contract.interface,
      props.contract.address
    );
  }

  async componentDidMount() {
    const { address } = this.props.location.state;
    this.setState({processing: true});
  
    try {
      let details = await this.getLockDetails(address);
      let totalLockedAmount = await this.getTotalLockedTokens(address);
      let totalClaimableAmount = await this.getUnlockableTokens(address);
      let { rows } = this.state;
      let reasons = details[0];
      let amounts = details[1];
      let expiries = details[2];
      let statuses = details[3];

      reasons.forEach((reason, i) => {
        reason = utils.parseBytes32String(reason);
        if (reason) {
          rows.push({
            reason,
            amount: formatToken(amounts[i]),
            expiry: expiries[i] * 1000,
            status: statuses[i]
          });
        }
      });

      this.setState({
        rows,
        owner: address,
        totalLockedAmount: formatToken(totalLockedAmount), 
        totalClaimableAmount: formatToken(totalClaimableAmount)
      });
    } catch (e) {
      console.log('LockDetails#Error:', e);
    } finally {
      this.setState({processing: false});
    }
  }

  async getLockDetails(address) {
    // Create a query and call it
    let query = createQuery(this.contract, 'getLockDetails', {lockee: address});
    let result = await query.call();
    // Parse the query result
    return parseQueryResult(result, query.outputTypes);
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
      <LockDetailsScreen
        processing={this.state.processing}
        rows={this.state.rows}
        owner={this.state.owner}
        totalLockedAmount={this.state.totalLockedAmount}
        totalClaimableAmount={this.state.totalClaimableAmount}
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

export default connect(mapStateToProps)(LockDetails);

import React from 'react';
import PropTypes from 'prop-types';
import PopupPatcher from '../../PopupPatcher';
import { ActionEntryCard } from '../../cards';
import { isValidAddress } from '../../../utils/web3-utils';
import { csvFileToJson } from '../../../utils/fileUtils';
import { parseToken } from '../../../utils/conversions';


class TokenVestManually extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      reason: '',
      amount: '',
      expiry: '',
      vestingList: [],
      loading: false
    }
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.onAddHandler = this.onAddHandler.bind(this);
    this.onUploadHandler = this.onUploadHandler.bind(this);
    this.onClearHandler = this.onClearHandler.bind(this);
  }

  validateInputs(address, reason, amount, expiry) {
    if (!isValidAddress(address)
      || !reason
      || !amount || isNaN(amount)
      || !expiry || isNaN(Date.parse(expiry))) {
      this.props.showMessageBox('Invalid input value!');
      return false;
    }
    return true;
  }

  formatEntries(vestingList) {
    if (!vestingList || !vestingList.length) {
      return '';
    }
    return vestingList.reduce((acc, curr) => 
      `${acc}\n${curr.address}, ${curr.reason}, ${curr.amount}, ${curr.expiry}`, '');
  }

  onAddHandler() {
    this.setState(state => {
      if (!this.validateInputs(state.address, state.reason, state.amount, state.expiry)) { return; }
      // Add new item to vesting list
      state.vestingList.push({
        address: state.address,
        reason: state.reason,
        amount: state.amount,
        expiry: state.expiry
      });
      // And update the state
      return {
        address: '',
        reason: '',
        amount: '',
        expiry: '',
        vestingList: state.vestingList
      }
    });
  }

  async onUploadHandler(filename) {
    this.setState({ loading: true });
    try {
      let jsonArray = await csvFileToJson(filename);
      this.setState({
        address: '',
        reason: '',
        amount: '',
        expiry: '',
        vestingList: jsonArray
      });
    } catch (e) {
      this.props.showMessageBox(`Cannot parse the file! Error: ${e.message}`);
    } finally {
      this.setState({ loading: false });
    }
  }

  onClearHandler() {
    this.setState({
      address: '',
      reason: '',
      amount: '',
      expiry: '',
      vestingList: []
    });
  }

  onSubmitHandler() {
    try {
      let addressList = this.state.vestingList.map(item => {
        if (!isValidAddress(item.address)) {
          throw new Error(`Input list contains an invalid Ethereum address => ${item.address}`);
        }
        return item.address;
      });
      let amountList = this.state.vestingList.map(item => {
        return item.amount;
      });
      let reasonList = this.state.vestingList.map(item => {
        if (!item.reason) {
          throw new Error(`Input list contains an invalid reason for vesting => ${item.reason}`);
        }
        return item.reason;
      });
      let expiryList = this.state.vestingList.map(item => {
        if (isNaN(Date.parse(item.expiry))) {
          throw new Error(`Input list contains an invalid expiry date for vesting => ${item.expiry}`);
        }
        return item.expiry;
      });
      this.props.onSubmit(addressList, reasonList, amountList, expiryList);
    } catch (e) {
      this.props.showMessageBox(e.message);
    }
  }

  render() {
    return (
      <ActionEntryCard
        title={'Vest Tokens Manually For'}
        size={1.15}
        inputList={[
          {
            label: 'Address',
            placeholder: 'Ethereum address',
            onChange: event => this.setState({address: event.target.value}),
            value: this.state.address
          },
          {
            label: 'Reason',
            placeholder: 'Vesting reason',
            onChange: event => this.setState({reason: event.target.value}),
            value: this.state.reason
          },
          {
            label: 'Vesting Amount',
            placeholder: 'SPIN amount',
            adornment: 'SPIN',
            type: 'number',
            onChange: event => this.setState({amount: event.target.value}),
            value: this.state.amount
          },
          {
            label: 'Expiry',
            type: 'date',
            onChange: selectedDate => this.setState({expiry: selectedDate})
          }
        ]}
        listLabel={'Vesting List'}
        entries={this.formatEntries(this.state.vestingList)}
        onAdd={this.onAddHandler}
        onUpload={this.onUploadHandler}
        onClear={this.onClearHandler}
        onSubmit={this.onSubmitHandler}
        processing={this.props.loading || this.state.loading}
      />
    );
  }
}

TokenVestManually.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default PopupPatcher(TokenVestManually);

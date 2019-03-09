import React from 'react';
import PropTypes from 'prop-types';
import PopupPatcher from '../../PopupPatcher';
import { ActionEntryCard } from '../../cards';
import { isValidAddress } from '../../../utils/web3-utils';
import { csvFileToJson } from '../../../utils/fileUtils';
import { parseToken } from '../../../utils/conversions';


class TokenVest extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      amount: '',
      vestingList: [],
      loading: false
    }
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.onAddHandler = this.onAddHandler.bind(this);
    this.onUploadHandler = this.onUploadHandler.bind(this);
    this.onClearHandler = this.onClearHandler.bind(this);
  }

  validateInputs(address, amount) {
    if (!isValidAddress(address) || !amount || isNaN(amount)) {
      this.props.showMessageBox('Invalid input value!');
      return false;
    }
    return true;
  }

  formatEntries(vestingList) {
    if (!vestingList || !vestingList.length) {
      return '';
    }
    return vestingList.reduce((acc, curr) => `${acc}\n${curr.address} ${curr.amount}`, '');
  }

  onAddHandler() {
    this.setState(state => {
      if (!this.validateInputs(state.address, state.amount)) { return; }
      state.vestingList.push({
        address: state.address,
        amount: state.amount
      });
      return {
        address: '',
        amount: '',
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
        amount: '',
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
      amount: '',
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
        return parseToken(item.amount);
      });
      this.props.onSubmit(addressList, amountList);
    } catch (e) {
      this.props.showMessageBox(e.message);
    }
  }

  render() {
    return (
      <ActionEntryCard
        title={'Vest Tokens For'}
        size={1.15}
        inputList={[
          {
            label: 'Address',
            placeholder: 'Ethereum address',
            onChange: event => this.setState({address: event.target.value}),
            value: this.state.address
          },
          {
            label: 'Amount Per Vesting Period',
            placeholder: 'SPIN amount',
            adornment: 'SPIN',
            type: 'number',
            onChange: event => this.setState({amount: event.target.value}),
            value: this.state.amount
          }
        ]}
        listLabel={'Address List'}
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

TokenVest.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default PopupPatcher(TokenVest);

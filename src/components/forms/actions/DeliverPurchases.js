import React from 'react';
import PropTypes from 'prop-types';
import PopupPatcher from '../../PopupPatcher';
import { ActionEntryCard } from '../../cards';
import { isValidAddress } from '../../../utils/web3-utils';
import { csvFileToJson } from '../../../utils/fileUtils';
import { parseToken } from '../../../utils/conversions';


class DeliverPurchases extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      amount: '',
      bonus: '',
      deliveryList: [],
      expiry: '',
      loading: false
    }
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.onAddHandler = this.onAddHandler.bind(this);
    this.onUploadHandler = this.onUploadHandler.bind(this);
    this.onClearHandler = this.onClearHandler.bind(this);
  }

  validateInputs(address, amount, bonusAmount) {
    if (!isValidAddress(address) 
      || !amount || isNaN(amount) 
      || !bonusAmount || isNaN(bonusAmount)) {
      this.props.showMessageBox('Invalid input value!');
      return false;
    }
    return true;
  }

  formatEntries(deliveryList) {
    if (!deliveryList || !deliveryList.length) {
      return '';
    }
    return deliveryList.reduce((acc, curr) => `${acc}\n${curr.address} ${curr.amount} ${curr.bonus}`, '');
  }

  onAddHandler() {
    this.setState(state => {
      if (!this.validateInputs(state.address, state.amount, state.bonus)) { return; }
      state.deliveryList.push({
        address: state.address,
        amount: state.amount,
        bonus: state.bonus
      });
      return {
        address: '',
        amount: '',
        bonus: '',
        deliveryList: state.deliveryList
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
        deliveryList: jsonArray
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
      bonus: '',
      deliveryList: [],
      expiry: ''
    });
  }

  onSubmitHandler() {
    if (this.state.expiry === ''
      || isNaN(Date.parse(this.state.expiry))) {
      this.props.showMessageBox('Invalid expiry date value!');
      return;
    }

    try {
      let beneficiaries = this.state.deliveryList.map(item => {
        if (!isValidAddress(item.address)) {
          throw new Error(`Input list contains an invalid Ethereum address => ${item.address}`);
        }
        return item.address;
      });
      let amounts = this.state.deliveryList.map(item => {
        return parseToken(item.amount);
      });
      let bonusAmounts = this.state.deliveryList.map(item => {
        return parseToken(item.bonus);
      });
      this.props.onSubmit(beneficiaries, amounts, bonusAmounts, this.state.expiry);
    } catch (e) {
      this.props.showMessageBox(e.message);
    }
  }

  render() {
    return (
      <ActionEntryCard
        title={'Deliver Tokens For'}
        size={1.15}
        inputList={[
          {
            label: 'Address',
            placeholder: 'Ethereum address',
            onChange: event => this.setState({address: event.target.value}),
            value: this.state.address
          },
          {
            label: 'Token Amount',
            placeholder: 'SPIN amount',
            adornment: 'SPIN',
            type: 'number',
            onChange: event => this.setState({amount: event.target.value}),
            value: this.state.amount
          },
          {
            label: 'Bonus Amount',
            placeholder: 'SPIN amount',
            adornment: 'SPIN',
            type: 'number',
            onChange: event => this.setState({bonus: event.target.value}),
            value: this.state.bonus
          },
          {
            label: 'Lock Expiry',
            placeholder: 'Expiry Date',
            type: 'date',
            onChange: selectedDate => this.setState({expiry: selectedDate})
          }
        ]}
        listLabel={'Delivery List'}
        entries={this.formatEntries(this.state.deliveryList)}
        onAdd={this.onAddHandler}
        onUpload={this.onUploadHandler}
        onClear={this.onClearHandler}
        onSubmit={this.onSubmitHandler}
        processing={this.props.loading || this.state.loading}
      />
    );
  }
}

DeliverPurchases.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default PopupPatcher(DeliverPurchases);

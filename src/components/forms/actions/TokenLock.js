import React from 'react';
import PropTypes from 'prop-types';
import { ActionCard } from '../../cards';
import PopupPatcher from '../../PopupPatcher';
import { isValidAddress } from '../../../utils/web3-utils';


class TokenLock extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      to: '',
      reason: '',
      amount: '',
      expiry: '',
    }
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  validateInputs() {
    if (!isValidAddress(this.state.to)
      || this.state.reason === ''
      || this.state.amount === ''
      || isNaN(this.state.amount)
      || this.state.expiry === ''
      || isNaN(Date.parse(this.state.expiry))) {
      this.props.showMessageBox('Invalid input value!');
      return false;
    }
    return true;
  }

  onSubmitHandler() {
    if (!this.validateInputs()) { return; }
    this.props.onSubmit(
      this.state.to,
      this.state.reason,
      this.state.amount,
      Math.floor(new Date(this.state.expiry).getTime() / 1000)
    );
  }

  render() {
    return (
      <ActionCard
        title={'Lock Token'}
        inputList={[
          {
            label: 'To',
            placeholder: 'Ethereum address',
            onChange: event => this.setState({to: event.target.value}),
            value: this.state.to
          },
          {
            label: 'Reason',
            placeholder: 'Lock reason',
            onChange: event => this.setState({reason: event.target.value}),
            value: this.state.reason
          },
          {
            label: 'Amount',
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
        onSubmit={this.onSubmitHandler}
      />
    );
  }
}

TokenLock.propTypes = {
    onSubmit: PropTypes.func.isRequired
}

export default PopupPatcher(TokenLock);

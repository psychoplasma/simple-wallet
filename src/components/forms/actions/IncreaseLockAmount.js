import React from 'react';
import PropTypes from 'prop-types';
import { ActionCard } from '../../cards';
import PopupPatcher from '../../PopupPatcher';
import { isValidAddress } from '../../../utils/web3-utils';


class IncreaseLockAmount extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      to: '',
      reason: '',
      amount: '',
    }
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  validateInputs() {
    if (!isValidAddress(this.state.to)
      || this.state.reason === ''
      || this.state.amount === ''
      || isNaN(this.state.amount)) {
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
      this.state.amount
    );
  }

  render() {
    return (
      <ActionCard
        title={'Increase Lock Amount'}
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
            label: 'Additional Amount',
            placeholder: 'SPIN amount',
            adornment: 'SPIN',
            type: 'number',
            onChange: event => this.setState({amount: event.target.value}),
            value: this.state.amount
          }
        ]}
        onSubmit={this.onSubmitHandler}
      />
    );
  }
}

IncreaseLockAmount.propTypes = {
    onSubmit: PropTypes.func.isRequired
}

export default PopupPatcher(IncreaseLockAmount);

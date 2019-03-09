import React from 'react';
import PropTypes from 'prop-types';
import { ActionCard } from '../../cards';
import PopupPatcher from '../../PopupPatcher';
import { isValidAddress } from '../../../utils/web3-utils';


class TokenBurnFrom extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      amount: ''
    }

    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  validateInputs() {
    if (this.state.address === ''
      || !isValidAddress(this.state.address)
      || this.state.amount === ''
      || isNaN(this.state.amount)
    ) {
      this.props.showMessageBox('Invalid input value!');
      return false;
    }
    return true;
  }

  onSubmitHandler() {
    if (!this.validateInputs()) { return; }
    this.props.onSubmit(this.state.address, this.state.amount);
  }

  render() {
    return (
      <ActionCard
        title={'Burn Token From'}
        inputList={[
          {
            label: 'From Address',
            placeholder: 'Address whose tokens to be burnt',
            onChange: (event) => this.setState({address: event.target.value}),
            value: this.state.address
          },
          {
            label: 'Amount',
            placeholder: 'Amount of token to be burnt',
            adornment: 'TKN',
            type: 'number',
            onChange: (event) => this.setState({amount: event.target.value}),
            value: this.state.amount
          }
        ]}
        onSubmit={this.onSubmitHandler}
      />
    );
  }
}

TokenBurnFrom.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default PopupPatcher(TokenBurnFrom);

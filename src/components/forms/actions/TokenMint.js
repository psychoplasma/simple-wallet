import React from 'react';
import PropTypes from 'prop-types';
import { ActionCard } from '../../cards';
import PopupPatcher from '../../PopupPatcher';
import { isValidAddress } from '../../../utils/web3-utils';


class TokenMint extends React.PureComponent {
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
        title={'Mint Token'}
        inputList={[
          {
            label: 'To Address',
            placeholder: 'Address to be minted for',
            onChange: (event) => this.setState({address: event.target.value}),
            value: this.state.address
          },
          {
            label: 'Amount',
            placeholder: 'Amount of token to be minted',
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

TokenMint.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default PopupPatcher(TokenMint);

import React from 'react';
import PropTypes from 'prop-types';
import PopupPatcher from '../../PopupPatcher';
import { ActionCard } from '../../cards';
import { isValidAddress } from '../../../utils/web3-utils';


class TokenUnlock extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      address: ''
    }
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  validateInputs() {
    if (this.state.address === ''
      || !isValidAddress(this.state.address)) {
      this.props.showMessageBox('Invalid input value!');
      return false;
    }
    return true;
  }

  onSubmitHandler() {
    if (!this.validateInputs()) { return; }
    this.props.onSubmit(this.state.address);
  }

  render() {
    return (
      <ActionCard
        title={'UNLOCK'}
        inputList={[
          {
            label: 'Address',
            placeholder: 'Ethereum address',
            onChange: event => this.setState({address: event.target.value}),
            value: this.state.address
          }
        ]}
        onSubmit={this.onSubmitHandler}
      />
    );
  }
}

TokenUnlock.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default PopupPatcher(TokenUnlock);

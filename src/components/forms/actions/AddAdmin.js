import React from 'react';
import PropTypes from 'prop-types';
import { ActionCard } from '../../cards';
import PopupPatcher from '../../PopupPatcher';
import { isValidAddress } from '../../../utils/web3-utils';


class AddAdmin extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      account: ''
    };
    this.onAddHandler = this.onAddHandler.bind(this);
  }

  validateInputs() {
    if (!isValidAddress(this.state.account)) {
      this.props.showMessageBox('Invalid Ethereum address!');
      return false;
    }
    return true;
  }

  onAddHandler() {
    if (!this.validateInputs()) { return; }
    this.props.onSubmit(this.state.account);
  }

  render() {
    return (
      <ActionCard
        title={'Add Admin'}
        inputList={[
          {
            label: 'Account',
            placeholder: 'Ethereum Address',
            onChange: event => this.setState({account: event.target.value}),
            value: this.state.account
          }
        ]}
        onSubmit={this.onAddHandler}
        processing={this.state.processing}
      />
    );
  }
}

AddAdmin.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default PopupPatcher(AddAdmin);

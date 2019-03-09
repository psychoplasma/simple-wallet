import React from 'react';
import PropTypes from 'prop-types';
import { MultiActionCard } from '../../cards';
import PopupPatcher from '../../PopupPatcher';
import { isValidAddress } from '../../../utils/web3-utils';


class AddRemoveWhitelist extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      account: ''
    }

    this.onAddHandler = this.onAddHandler.bind(this);
    this.onRemoveHandler = this.onRemoveHandler.bind(this);
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
    this.props.onAdd(this.state.account);
  }

  onRemoveHandler() {
    if (!this.validateInputs()) { return; }
    this.props.onRemove(this.state.account);
  }

  render() {
    return (
      <MultiActionCard
        title={'Add/Remove From Whitelist'}
        inputList={[
          {
            label: 'Account',
            placeholder: 'Ethereum Address',
            onChange: event => this.setState({account: event.target.value}),
            value: this.state.account
          }
        ]}
        buttonPositive={{
          text: 'add',
          onClick: this.onAddHandler
        }}
        buttonNegative={{
          text: 'remove',
          onClick: this.onRemoveHandler
        }}
      />
    );
  }
}

AddRemoveWhitelist.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired
}

export default PopupPatcher(AddRemoveWhitelist);

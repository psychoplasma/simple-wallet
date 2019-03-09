import React from 'react';
import PropTypes from 'prop-types';
import { ActionCard } from '../../cards';
import PopupPatcher from '../../PopupPatcher';
import { isValidAddress } from '../../../utils/web3-utils';
import { utils } from 'ethers';


class AdjustLockTime extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      to: '',
      reason: '',
      expiry: '',
    }
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  validateInputs() {
    if (!isValidAddress(this.state.to)
      || this.state.reason === ''
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
      Math.floor(new Date(this.state.expiry).getTime() / 1000)
    );
  }

  render() {
    return (
      <ActionCard
        title={'Adjust Lock Time'}
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

AdjustLockTime.propTypes = {
    onSubmit: PropTypes.func.isRequired
}

export default PopupPatcher(AdjustLockTime);

import React from 'react';
import PropTypes from 'prop-types';
import { ActionCard } from '../../cards';
import PopupPatcher from '../../PopupPatcher';
import { isValidAddress } from '../../../utils/web3-utils';


class SetContractAddresses extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tokenContractAddress: this.props.tokenContractAddress,
      saleContractAddress: this.props.saleContractAddress
    }

    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  validateInputs() {
    if (this.state.tokenContractAddress === ''
      || !isValidAddress(this.state.tokenContractAddress)
      || this.state.saleContractAddress === ''
      || !isValidAddress(this.state.saleContractAddress)
    ) {
      this.props.showMessageBox('Invalid address values!');
      return false;
    }
    return true;
  }

  onSubmitHandler() {
    if (!this.validateInputs()) { return; }
    this.props.onSubmit(this.state.tokenContractAddress, this.state.saleContractAddress);
  }

  render() {
    return (
      <ActionCard
        title={'Set Contract Addresses'}
        inputList={[
          {
            label: 'Token Contract Address',
            placeholder: 'Enter contract address',
            onChange: (event) => this.setState({tokenContractAddress: event.target.value}),
            value: this.state.tokenContractAddress
          },
          {
            label: 'Sale Contract Address',
            placeholder: 'Enter contract address',
            onChange: (event) => this.setState({saleContractAddress: event.target.value}),
            value: this.state.saleContractAddress
          }
        ]}
        onSubmit={this.onSubmitHandler}
      />
    );
  }
}

SetContractAddresses.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  tokenContractAddress: PropTypes.string,
  saleContractAddress: PropTypes.string
}

export default PopupPatcher(SetContractAddresses);

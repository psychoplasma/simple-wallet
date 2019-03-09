import React from 'react';
import PropTypes from 'prop-types';
import { ActionCard } from '../../cards';
import PopupPatcher from '../../PopupPatcher';
import { isValidAddress } from '../../../utils/web3-utils';


class SetFundCollector extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      address: ''
    }
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  validateInputs() {
    if (!isValidAddress(this.state.address)) {
      this.props.showMessageBox('Invalid Ethereum address!');
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
        title={'Set Fund Collector'}
        inputList={[
          {
            label: 'Address',
            placeholder: 'Fund Collector Address' ,
            onChange: (event) => this.setState({address: event.target.value}),
            value: this.state.address
          }
        ]}
        onSubmit={this.onSubmitHandler}
      />
    );
  }
}

export default PopupPatcher(SetFundCollector);


SetFundCollector.propTypes = {
  onSubmit: PropTypes.func.isRequired
}


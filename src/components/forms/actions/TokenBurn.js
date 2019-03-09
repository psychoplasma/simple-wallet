import React from 'react';
import PropTypes from 'prop-types';
import { ActionCard } from '../../cards';
import PopupPatcher from '../../PopupPatcher';


class TokenBurn extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      amount: ''
    }

    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  validateInputs() {
    if (this.state.amount === '' | isNaN(this.state.amount)) {
      this.props.showMessageBox('Invalid input value!');
      return false;
    }
    return true;
  }

  onSubmitHandler() {
    if (!this.validateInputs()) { return; }
    this.props.onSubmit(this.state.amount);
  }

  render() {
    return (
      <ActionCard
        title={'Burn Token'}
        inputList={[
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

TokenBurn.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default PopupPatcher(TokenBurn);

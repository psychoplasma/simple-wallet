import React from 'react';
import PropTypes from 'prop-types';
import CardMaker from '../CardMaker';
import ScreenMaker from '../ScreenMaker';
import PopupPatcher from '../PopupPatcher';
import Separator from '../Separator.jsx';
import { BasicInput } from '../inputs';
import { SubmitButton } from '../buttons/';
import { Column } from '../boxes';
import { isValidAddress } from '../../utils/web3-utils';


class SendScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      to: '',
      amount: ''
    };
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  validateInputs() {
    if (!this.state.to || !isValidAddress(this.state.to)) {
      this.props.showMessageBox('Empty or invalid address!');
      return false;
    }

    if (!this.state.amount || isNaN(this.state.amount)) {
      this.props.showMessageBox('Non-numeric amount value!');
      return false;
    }

    return true;
  }

  onClickHandler() {
    if (!this.validateInputs()) {
      return;
    }
    this.props.onSend(this.state.to, this.state.amount);
  }

  render() {
    return (
      <Column>
        <Separator spacing={10}/>

        <BasicInput
          label={'Address'}
          placeholder={'Address to send'}
          onChange={event => this.setState({to: event.target.value})}
          value={this.state.to}
        />
        
        <Separator spacing={10}/>

        <BasicInput
          label={'Amount'}
          placeholder={'Amount in Ether to be sent'}
          adornment={'ETH'}
          onChange={event => this.setState({amount: event.target.value})}
          value={this.state.amount}
          type={'number'}
        />

        <Separator spacing={20}/>

        <SubmitButton
          text={'continue'}
          onClick={this.onClickHandler}
        />
      </Column>
    );
  }
}

export default ScreenMaker(
  PopupPatcher(CardMaker(SendScreen)),
  {title: 'Send Ether', size: 1.35, goBackable: true}
);

SendScreen.propTypes = {
  onSend: PropTypes.func.isRequired
};

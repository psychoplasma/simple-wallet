import React from 'react';
import PropTypes from 'prop-types';
import CardMaker from '../CardMaker';
import ScreenMaker from '../ScreenMaker';
import PopupPatcher from '../PopupPatcher';
import Separator from '../Separator.jsx';
import { BasicInput } from '../inputs';
import { SubmitButton } from '../buttons/';
import { Column, Row } from '../boxes';


class LoginScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      password: ''
    }
    this.onLoginHandler = this.onLoginHandler.bind(this);
  }

  passwordEmpty() {
    if (this.state.password === '') {
      this.props.showMessageBox('Empty password!');
      return false;
    }
    return true;
  }

  onLoginHandler() {
    if (!this.passwordEmpty()) { return; }
    this.props.onLogin(this.state.password);
  }

  render() {
    return (
      <Column>
        <Separator spacing={10}/>

        <BasicInput
          label={'Password'}
          placeholder={'Enter your password'}
          onChange={event => this.setState({password: event.target.value})}
          value={this.state.password}
          type={'password'}
        />

        <Separator spacing={20}/>

        <SubmitButton
          text={'login'}
          onClick={this.onLoginHandler}
          loading={this.props.processing}
        />

        <Separator spacing={10}/>
        <Row>
          <a style={{textAlign: 'center'}} onClick={this.props.onImport}>
            Import Wallet
          </a>
        </Row>
      </Column>
    );
  }
}

export default ScreenMaker(
  PopupPatcher(CardMaker(LoginScreen)),
  {title: 'Log in Simple Wallet', size: 1.35}
);

LoginScreen.propTypes = {
  onLogin: PropTypes.func.isRequired,
  onImport: PropTypes.func.isRequired,
  processing: PropTypes.bool
};

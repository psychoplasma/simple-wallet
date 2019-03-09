import React from 'react';
import PropTypes from 'prop-types';
import CardMaker from '../CardMaker';
import ScreenMaker from '../ScreenMaker';
import PopupPatcher from '../PopupPatcher';
import Separator from '../Separator.jsx';
import { BasicInput } from '../inputs';
import { SubmitButton } from '../buttons/';
import { Column } from '../boxes';


class ImportMnemonicsScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirmPassword: '',
      mnemonics: ''
    }
    this.onImportHandler = this.onImportHandler.bind(this);
  }

  validatePassword() {
    return this.passwordEmpty() && this.passwordMatch();
  }

  passwordEmpty() {
    if (this.state.password === '') {
      this.props.showMessageBox('Empty password!');
      return false;
    }
    return true;
  }

  passwordMatch() {
    if (this.state.password !== this.state.confirmPassword) {
      this.props.showMessageBox('Password does not match!');
      return false;
    }
    return true;
  }

  validateMnemonics() {
    // TODO: Implement this
    return true;
  }

  onImportHandler() {
    if (!this.validatePassword()
      || !this.validateMnemonics()) { return; }

    this.props.onImport(this.state.mnemonics, this.state.password);
  }

  render() {
    return (
      <Column>
        <Separator spacing={10}/>
        <BasicInput
          label={'Seed Phrase'}
          placeholder={'Enter your 12-word seed phrase'}
          onChange={event => this.setState({mnemonics: event.target.value})}
          value={this.state.mnemonics}
        />

        <Separator spacing={10}/>

        <BasicInput
          label={'Password'}
          placeholder={'Enter your password'}
          onChange={event => this.setState({password: event.target.value})}
          value={this.state.password}
          type={'password'}
        />

        <Separator spacing={10}/>

        <BasicInput
          label={'Confirm Password'}
          placeholder={'Confirm your password'}
          onChange={event => this.setState({confirmPassword: event.target.value})}
          value={this.state.confirmPassword}
          type={'password'}
        />

        <Separator spacing={20}/>

        <SubmitButton
          text={'import'}
          onClick={this.onImportHandler}
          loading={this.props.processing}
        />
      </Column>
    );
  }
}

export default ScreenMaker(
  PopupPatcher(CardMaker(ImportMnemonicsScreen)),
  {title: 'Import From Seed Phrase', size: 1.35, goBackable: true}
);

ImportMnemonicsScreen.propTypes = {
  onImport: PropTypes.func.isRequired,
  processing: PropTypes.bool
};

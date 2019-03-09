import React from 'react';
import PropTypes from 'prop-types';
import CardMaker from '../CardMaker';
import ScreenMaker from '../ScreenMaker';
import PopupPatcher from '../PopupPatcher';
import Separator from '../Separator.jsx';
import { BasicInput } from '../inputs';
import { SubmitButton } from '../buttons/';
import { Column, Row } from '../boxes';
import { OpenFileBrowser } from '../../utils/popup';


class ImportKeystoreFileScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      filename: ''
    }
    this.onImportHandler = this.onImportHandler.bind(this);
    this.onBrowseHandler = this.onBrowseHandler.bind(this);
  }

  passwordEmpty() {
    if (this.state.password === '') {
      this.props.showMessageBox('Empty password!');
      return false;
    }
    return true;
  }

  onImportHandler() {
    if (!this.passwordEmpty()) { return; }
    this.props.onImport(this.state.filename, this.state.password);
  }

  onBrowseHandler() {
    OpenFileBrowser(filename => this.setState({filename}));
  }

  render() {
    return (
      <Column>
        <Separator spacing={10}/>

        <Row>
          <BasicInput
            style={{flex: 4}}
            label={'Keystore'}
            value={this.state.filename || 'Browse to Keystore file'}
            onChange={_ => {}}
            disabled={true}
          />

          <Separator vertical={true}/>

          <SubmitButton
            style={{flex: 1}}
            text={'browse'}
            onClick={this.onBrowseHandler}
          />
        </Row>

        <Separator/>

        <Column>
          <BasicInput
            label={'Password'}
            placeholder={'Enter your password'}
            onChange={event => this.setState({password: event.target.value})}
            value={this.state.password}
            type={'password'}
          />

          <Separator/>

          <SubmitButton
            text={'import'}
            onClick={this.onImportHandler}
            loading={this.props.processing}
          />
        </Column>
      </Column>
    );
  }
}

export default ScreenMaker(
  PopupPatcher(CardMaker(ImportKeystoreFileScreen)),
  {title: 'Import From Keystore File', size: 1.35, goBackable: true}
);

ImportKeystoreFileScreen.propTypes = {
  onImport: PropTypes.func.isRequired,
  processing: PropTypes.bool
};

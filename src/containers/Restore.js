import React from 'react';
import { connect } from 'react-redux';
import RestoreScreen from '../components/screens/Restore';
import {
  importKeystoreFileScreen,
  importMnemonicsScreen,
  importPrivateKeyScreen
} from '../navigationPaths';


class Restore extends React.Component {
  constructor(props) {
    super(props);
    this.goToImportMnemonicsHandler = this.goToImportMnemonicsHandler.bind(this);
    this.goToImportKeystoreFileHandler = this.goToImportKeystoreFileHandler.bind(this);
    this.goToImportPrivateKeyHandler = this.goToImportPrivateKeyHandler.bind(this);
    this.goBackHandler = this.goBackHandler.bind(this);
  }

  goToImportMnemonicsHandler() {
    this.props.history.push(importMnemonicsScreen);
  }

  goToImportKeystoreFileHandler() {
    this.props.history.push(importKeystoreFileScreen);
  }

  goToImportPrivateKeyHandler() {
    this.props.history.push(importPrivateKeyScreen);
  }

  goBackHandler() {
    this.props.history.goBack();
  }

  render() {
    return (
      <RestoreScreen
        goToImportMnemonics={this.goToImportMnemonicsHandler}
        goToImportKeystoreFile={this.goToImportKeystoreFileHandler}
        goToImportPrivateKey={this.goToImportPrivateKeyHandler}
        goBack={this.goBackHandler}
      />
    );
  }
}

export default connect()(Restore);

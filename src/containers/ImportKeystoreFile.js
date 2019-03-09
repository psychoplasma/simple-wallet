import React from 'react';
import { connect } from 'react-redux';
import { importKeystore } from '../actions/auth';
import ImportKeystoreFileScreen from '../components/screens/ImportKeystoreFile';
import { walletScreen } from '../navigationPaths';


class ImportKeystoreFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onImportHandler = this.onImportHandler.bind(this);
    this.goBackHandler = this.goBackHandler.bind(this);
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.isLoggedIn) {
      // Go to logout screen
      nextProps.history.push(walletScreen);
    }

    return null;
  }

  onImportHandler(filename, password) {
    this.props.dispatch(importKeystore(filename, password));
  }

  goBackHandler() {
    this.props.history.goBack();
  }

  render() {
    return (
      <ImportKeystoreFileScreen
        onImport={this.onImportHandler}
        processing={this.props.processing}
        goBack={this.goBackHandler}
      />
    );
  }
}

const mapStateToProps = ({ authState }) => {
  return {
      isLoggedIn: authState.isLoggedIn,
      processing: authState.processing
  };
}

export default connect(mapStateToProps)(ImportKeystoreFile);

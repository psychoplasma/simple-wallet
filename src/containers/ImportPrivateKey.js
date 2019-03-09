import React from 'react';
import { connect } from 'react-redux';
import { importPrivateKey } from '../actions/auth';
import ImportPrivateKeyScreen from '../components/screens/ImportPrivateKey';
import { walletScreen } from '../navigationPaths';


class ImportPrivateKey extends React.Component {
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

  onImportHandler(privateKey, password) {
    this.props.dispatch(importPrivateKey(privateKey, password));
  }

  goBackHandler() {
    this.props.history.goBack();
  }

  render() {
    return (
      <ImportPrivateKeyScreen
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

export default connect(mapStateToProps)(ImportPrivateKey);

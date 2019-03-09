import React from 'react';
import { connect } from 'react-redux';
import { importMnemonics } from '../actions/auth';
import ImportMnemonicsScreen from '../components/screens/ImportMnemonics';
import { walletScreen } from '../navigationPaths';


class ImportMnemonics extends React.Component {
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

  onImportHandler(mnemonics, password) {
    this.props.dispatch(importMnemonics(mnemonics, password));
  }

  goBackHandler() {
    this.props.history.goBack();
  }

  render() {
    return (
      <ImportMnemonicsScreen
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

export default connect(mapStateToProps)(ImportMnemonics);

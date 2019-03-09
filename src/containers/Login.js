import React from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import LoginScreen from '../components/screens/Login';
import { walletScreen, restoreScreen } from '../navigationPaths';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onLoginHandler = this.onLoginHandler.bind(this);
    this.onImportHandler = this.onImportHandler.bind(this);
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.isLoggedIn) {
      // Go to logout screen
      nextProps.history.push(walletScreen);
    }

    return null;
  }

  onLoginHandler(password) {
    this.props.dispatch(login(password));
  }

  onImportHandler() {
    this.props.history.push(restoreScreen);
  }

  render() {
    return (
      <LoginScreen
        onLogin={this.onLoginHandler}
        onImport={this.onImportHandler}
        processing={this.props.processing}
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

export default connect(mapStateToProps)(Login);

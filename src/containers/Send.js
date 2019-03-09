import React from 'react';
import { connect } from 'react-redux';
import SendScreen from '../components/screens/Send';
import { sendTransactionScreen } from '../navigationPaths';


class Send extends React.Component {
    constructor(props) {
        super(props);
        this.onSendHandler = this.onSendHandler.bind(this);
        this.goBackHandler = this.goBackHandler.bind(this);
    }

    onSendHandler(to, value) {
        // Go to Transaction Screen
        this.props.history.push({
            pathname: sendTransactionScreen,
            state: { to, value }
        });
    }

    goBackHandler() {
        this.props.history.goBack();
    }

    render() {
        return (
            <SendScreen
                onSend={this.onSendHandler}
                goBack={this.goBackHandler}
            />
        );
    }
}

export default connect()(Send);

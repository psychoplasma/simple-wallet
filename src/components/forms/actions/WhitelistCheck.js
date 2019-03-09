import React from 'react';
import PropTypes from 'prop-types';
import { ActionStatusCard } from '../../cards';
import PopupPatcher from '../../PopupPatcher';
import { isValidAddress } from '../../../utils/web3-utils';


class WhitelistCheck extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
        }

        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    validateInputs() {
        if (this.state.address === ''
            || !isValidAddress(this.state.address)) {
            this.props.showMessageBox('Please enter a valid Ethereum address!');
            return false;
        }
        return true;
    }

    onSubmitHandler() {
        if (!this.validateInputs()) { return; }
        this.props.onSubmit(this.state.address);
    }

    render() {
        return (
            <ActionStatusCard
                title={'Check Whitelist'}
                inputList={[
                    {
                        label: 'Address',
                        placeholder: 'Address to be checked',
                        onChange: (event) => this.setState({address: event.target.value}),
                        value: this.state.address
                    },
                    {
                        resultLabel: 'Is Whitelisted',
                        result: this.props.isWhitelisted.toString()
                    }
                ]}
                processing={this.props.processing}
                onSubmit={this.onSubmitHandler}
            />
        );
    }
}

export default PopupPatcher(WhitelistCheck);


WhitelistCheck.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    isWhitelisted: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ]),
    processing: PropTypes.bool
}

import React from 'react';
import PropTypes from 'prop-types';
import { ActionCard } from '../../cards';
import PopupPatcher from '../../PopupPatcher';


class WithdrawToken extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            tokenAmount: ''
        }
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    validateInputs() {
        if (this.state.tokenAmount === '') {
            this.props.showMessageBox('Amount value cannot be empty!');
            return false;
        }

        return true;
    }

    onSubmitHandler() {
        if (!this.validateInputs()) { return; }
        this.props.onSubmit(this.state.tokenAmount);
    }

    render() {
        return (
            <ActionCard
                title={'WITHDRAW TKN'}
                inputList={[
                    {
                        label: 'Amount',
                        placeholder: 'Amount of SPIN to withdraw',
                        adornment: 'TKN',
                        type: 'number',
                        onChange: (event) => this.setState({tokenAmount: event.target.value}),
                        value: this.state.tokenAmount
                    }
                ]}
                onSubmit={this.onSubmitHandler}
            />
        );
    }
}

WithdrawToken.propTypes = {
    onSubmit: PropTypes.func.isRequired
}

export default PopupPatcher(WithdrawToken);

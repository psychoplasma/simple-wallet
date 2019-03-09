import React from 'react';
import PropTypes from 'prop-types';
import { ActionCard } from '../../cards';
import PopupPatcher from '../../PopupPatcher';


class WithdrawEther extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            etherAmount: ''
        }
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    validateInputs() {
        if (this.state.etherAmount === '') {
            this.props.showMessageBox('Amount value cannot be empty!');
            return false;
        }

        return true;
    }

    onSubmitHandler() {
        if (!this.validateInputs()) { return; }
        this.props.onSubmit(this.state.etherAmount);
    }

    render() {
        return (
            <ActionCard
                title={'WITHDRAW ETHER'}
                inputList={[
                    {
                        label: 'Amount',
                        placeholder: 'Amount of ETH to withdraw',
                        adornment: 'ETH',
                        type: 'number',
                        onChange: (event) => this.setState({etherAmount: event.target.value}),
                        value: this.state.etherAmount
                    }
                ]}
                onSubmit={this.onSubmitHandler}
            />
        );
    }
}

WithdrawEther.propTypes = {
    onSubmit: PropTypes.func.isRequired
}

export default PopupPatcher(WithdrawEther);

import React from 'react';
import PropTypes from 'prop-types';
import { ActionCard } from '../../cards';
import PopupPatcher from '../../PopupPatcher';


class TokenSend extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            amount: ''
        }
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    validateInputs() {
        if (this.state.amount === ''
            || isNaN(this.state.amount)
            || this.state.address === '') {
            this.props.showMessageBox('Invalid input!');
            return false;
        }
        return true;
    }

    onSubmitHandler() {
        if (!this.validateInputs()) { return; }
        this.props.onSubmit(
            this.state.address,
            this.state.amount
        );
    }

    render() {
        return (
            <ActionCard
                title={'Send TKN'}
                inputList={[
                    {
                        label: 'Address',
                        placeholder: 'Recipient\'s Address' ,
                        onChange: (event) => this.setState({address: event.target.value}),
                        value: this.state.address
                    },
                    {
                        label: 'Amount',
                        placeholder: 'Amount of TKN to be sent',
                        adornment: 'TKN',
                        type: 'number',
                        onChange: (event) => this.setState({amount: event.target.value}),
                        value: this.state.amount
                    }
                ]}
                onSubmit={this.onSubmitHandler}
            />
        );
    }
}

export default PopupPatcher(TokenSend);


TokenSend.propTypes = {
    onSubmit: PropTypes.func.isRequired
}

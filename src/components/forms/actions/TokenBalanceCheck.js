import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import { ActionStatusCard } from '../../cards';
import PopupPatcher from '../../PopupPatcher';


class TokenBalanceCheck extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
        }
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onSubmitHandler() {
        this.props.onSubmit(this.state.address);
    }

    render() {
        return (
            <ActionStatusCard
                title={'Check Balance'}
                inputList={[
                    {
                        label: 'Address',
                        placeholder: 'Address to be checked',
                        onChange: (event) => this.setState({address: event.target.value}),
                        value: this.state.address
                    },
                    {
                        resultLabel: 'Balance',
                        adornment: 'TKN',
                        result: `${!isNaN(this.props.balance) ? numeral(this.props.balance).format('0,0.[000000]') : 'N/A'}`
                    }
                ]}
                processing={this.props.processing}
                onSubmit={this.onSubmitHandler}
            />
        );
    }
}

export default PopupPatcher(TokenBalanceCheck);


TokenBalanceCheck.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    balance: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    processing: PropTypes.bool
}

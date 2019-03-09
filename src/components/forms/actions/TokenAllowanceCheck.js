import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import { ActionStatusCard } from '../../cards';
import PopupPatcher from '../../PopupPatcher';


class TokenCheckAllowance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            owner: '',
            spender: '',
        }
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onSubmitHandler() {
        this.props.onSubmit(this.state.owner, this.state.spender);
    }

    render() {
        return (
            <ActionStatusCard
                title={'Check Allowance'}
                inputList={[
                    {
                        label: 'Owner',
                        placeholder: 'Owner\'s Address',
                        onChange: (event) => this.setState({owner: event.target.value}),
                        value: this.state.owner
                    },
                    {
                        label: 'Spender',
                        placeholder: 'Spender\'s Address',
                        onChange: (event) => this.setState({spender: event.target.value}),
                        value: this.state.spender,
                    },
                    {
                        resultLabel: 'Allowance',
                        adornment: 'TKN',
                        result: `${!isNaN(this.props.allowance) ? numeral(this.props.allowance).format('0,0.[000000]') : 'N/A'}`
                    }
                ]}
                processing={this.props.processing}
                onSubmit={this.onSubmitHandler}
            />
        );
    }
}

export default PopupPatcher(TokenCheckAllowance);


TokenCheckAllowance.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    allowance: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    processing: PropTypes.bool
}

import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import { ActionStatusCard } from '../../cards';
import PopupPatcher from '../../PopupPatcher';


class TokenUnlockableCheck extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            address: ''
        }
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onSubmitHandler() {
        this.props.onSubmit(this.state.address);
    }

    render() {
        return (
            <ActionStatusCard
                title={'Check Unlockable Token'}
                inputList={[
                    {
                        label: 'Address',
                        placeholder: 'Address to be checked',
                        onChange: (event) => this.setState({address: event.target.value}),
                        value: this.state.address
                    },
                    {
                        resultLabel: 'Claimable',
                        adornment: 'SPIN',
                        result: `${!isNaN(this.props.unlockable) ? numeral(this.props.unlockable).format('0,0.[000000]') : 'N/A'}`
                    },
                    {
                        resultLabel: 'Total Locked',
                        adornment: 'SPIN',
                        result: `${!isNaN(this.props.total) ? numeral(this.props.total).format('0,0.[000000]') : 'N/A'}`
                    }
                ]}
                processing={this.props.processing}
                onSubmit={this.onSubmitHandler}
            />
        );
    }
}

export default PopupPatcher(TokenUnlockableCheck);


TokenUnlockableCheck.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    unlockable: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    total: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    processing: PropTypes.bool
}

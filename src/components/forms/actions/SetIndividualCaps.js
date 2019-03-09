import React from 'react';
import PropTypes from 'prop-types';
import { ActionCard } from '../../cards';
import PopupPatcher from '../../PopupPatcher';


class SetIndividualCaps extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            maxCap: '',
            minCap: ''
        }

        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    validateInputs() {
        if (this.state.maxCap === ''
            || isNaN(this.state.maxCap)
            || this.state.minCap === ''
            || isNaN(this.state.minCap)
        ) {
            this.props.showMessageBox('Invalid input value!');
            return false;
        }
        return true;
    }

    onSubmitHandler() {
        if (!this.validateInputs()) { return; }
        this.props.onSubmit(
            this.state.minCap,
            this.state.maxCap
        );
    }

    render() {
        return (
            <ActionCard
                title={'SET INDIVIDUAL CAPS'}
                inputList={[
                    {
                        label: 'Maximum Cap',
                        placeholder: 'Max. purchase amount in ETH',
                        adornment: 'ETH',
                        type: 'number',
                        onChange: event => this.setState({maxCap: event.target.value}),
                        value: this.state.maxCap
                    },
                    {
                        label: 'Minimum Cap',
                        placeholder: 'Min. purchase amount in ETH',
                        adornment: 'ETH',
                        type: 'number',
                        onChange: event => this.setState({minCap: event.target.value}),
                        value: this.state.minCap
                    }
                ]}
                onSubmit={this.onSubmitHandler}
            />
        );
    }
}

SetIndividualCaps.propTypes = {
    onSubmit: PropTypes.func.isRequired
}


export default PopupPatcher(SetIndividualCaps);

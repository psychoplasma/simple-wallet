import React from 'react';
import PropTypes from 'prop-types';
import { ActionCard } from '../../cards';
import PopupPatcher from '../../PopupPatcher';


class SetPhase extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            rate: '',
            startDate: '',
            endDate: '',
            bonusRate: ''
        }

        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    validateInputs() {
        if (this.state.bonusRate === ''
            || isNaN(this.state.bonusRate)
            || this.state.startDate === ''
            || isNaN(Date.parse(this.state.startDate))
            || this.state.endDate === ''
            || isNaN(Date.parse(this.state.endDate))
            || this.state.bonusRate === ''
            || isNaN(this.state.bonusRate)) {
            this.props.showMessageBox('Invalid input value!');
            return false;
        }
        return true;
    }

    onSubmitHandler() {
        if (!this.validateInputs()) { return; }
        this.props.onSubmit(
            this.state.rate,
            Math.floor(new Date(this.state.startDate).getTime() / 1000),
            Math.floor(new Date(this.state.endDate).getTime() / 1000),
            this.state.bonusRate
        );
    }

    render() {
        return (
            <ActionCard
                title={'SET PHASE'}
                inputList={[
                    {
                        label: 'Purchase Rate',
                        placeholder: 'TKN equivalent value of 1 ETH',
                        adornment: 'TKN/ETH',
                        type: 'number',
                        onChange: event => this.setState({rate: event.target.value}),
                        value: this.state.rate
                    },
                    {
                        label: 'Bonus Rate',
                        placeholder: 'Enter in percentage',
                        adornment: '%',
                        type: 'number',
                        onChange: event => this.setState({bonusRate: event.target.value}),
                        value: this.state.bonusRate
                    },
                    {
                        label: 'Start Date',
                        type: 'date',
                        onChange: selectedDate => this.setState({startDate: selectedDate})
                    },
                    {
                        label: 'End Date',
                        type: 'date',
                        onChange: selectedDate => this.setState({endDate: selectedDate})
                    }
                ]}
                onSubmit={this.onSubmitHandler}
            />
        );
    }
}

SetPhase.propTypes = {
    onSubmit: PropTypes.func.isRequired
}

export default PopupPatcher(SetPhase);

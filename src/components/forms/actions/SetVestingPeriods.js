import React from 'react';
import PropTypes from 'prop-types';
import { ActionCard } from '../../cards';
import PopupPatcher from '../../PopupPatcher';


class SetVestingPeriods extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            bonus: '',
            phase1: '',
            phase2: '',
            phase3: '',
            phase4: ''
        }
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    validateInputs() {
        if (this.state.bonus === ''
            || isNaN(Date.parse(this.state.bonus))
            || this.state.phase1 === ''
            || isNaN(Date.parse(this.state.phase1))
            || this.state.phase2 === ''
            || isNaN(Date.parse(this.state.phase2))
            || this.state.phase3 === ''
            || isNaN(Date.parse(this.state.phase3))
            || this.state.phase4 === ''
            || isNaN(Date.parse(this.state.phase4))) {
            this.props.showMessageBox('Invalid input value!');
            return false;
        }
        return true;
    }

    onSubmitHandler() {
        if (!this.validateInputs()) { return; }
        this.props.onSubmit([
            Math.floor(new Date(this.state.bonus).getTime() / 1000),
            Math.floor(new Date(this.state.phase1).getTime() / 1000),
            Math.floor(new Date(this.state.phase2).getTime() / 1000),
            Math.floor(new Date(this.state.phase3).getTime() / 1000),
            Math.floor(new Date(this.state.phase4).getTime() / 1000)
        ]);
    }

    render() {
        return (
            <ActionCard
                title={'SET VESTING PERIODS'}
                inputList={[
                    {
                        label: 'Bonus Expiry',
                        type: 'date',
                        onChange: selectedDate => this.setState({bonus: selectedDate}),
                    },
                    {
                        label: '1st Release Expiry',
                        type: 'date',
                        onChange: selectedDate => this.setState({phase1: selectedDate})
                    },
                    {
                        label: '2nd Release Expiry',
                        type: 'date',
                        onChange: selectedDate => this.setState({phase2: selectedDate})
                    },
                    {
                        label: '3rd Release Expiry',
                        type: 'date',
                        onChange: selectedDate => this.setState({phase3: selectedDate})
                    },
                    {
                        label: '4th Release Expiry',
                        type: 'date',
                        onChange: selectedDate => this.setState({phase4: selectedDate})
                    }
                ]}
                onSubmit={this.onSubmitHandler}
            />
        );
    }
}

SetVestingPeriods.propTypes = {
    onSubmit: PropTypes.func.isRequired
}

export default PopupPatcher(SetVestingPeriods);

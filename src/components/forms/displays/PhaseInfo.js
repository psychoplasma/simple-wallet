import React from 'react';
import PropTypes from 'prop-types';
import { StatusCard } from '../../cards';

const SYNC_INTERVAL = 1000;

export default class PhaseInfo extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            remainingTime: '? days  --:--:--'
        },
        this.syncInterval = null;
    }

    componentDidMount() {
        this.countDownToPhaseEnd(this.props.phaseEnd);
        this.syncInterval = setInterval(this.countDownToPhaseEnd.bind(this), SYNC_INTERVAL);
    }

    componentWillUnmount() {
        clearInterval(this.syncInterval);
    }

    countDownToPhaseEnd() {
        let remainingTime = this.timeFormatter(this.calculateRemaingTime(this.props.phaseEnd));
        this.setState({ remainingTime });
    }

    calculateRemaingTime(end) {
        // If the phase time hasn't been fetched yet
        if (!end || !this.props.isActive) {
            return 0;
        }
      
        let countdown = end - Date.now();

        // That countdown reaches zero means that the phase has ended.
        return countdown > 0 ? countdown / 1000 : 0;
    }
    
    timeFormatter(time) {
        let days = Math.floor(time / 24 / 3600);
        let hours = Math.floor(time % (24 * 3600) / 3600);
        let mins = Math.floor((time % 3600) / 60);
        let secs = Math.floor(time % 60);
    
        return `${days} days ${(hours < 10 ? '0' : '')}${hours}:${(mins < 10 ? '0' : '')}${mins}:${(secs < 10 ? '0' : '')}${secs}`;
    }

    dateFormatter(date) {
        let options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(date).toLocaleDateString('us', options);
    }

    render() {
        return (
            <StatusCard
                title={'PHASE INFO'}
                itemList={[
                    {
                        label: 'Status',
                        value: `${this.props.isActive ? 'Active' : 'Not Active'}`
                    },
                    {
                        label: 'Phase Index',
                        value: this.props.phaseIndex
                    },
                    {
                        label: 'Phase Bonus',
                        adornment: '%',
                        value: `${this.props.phaseBonusRate}`
                    },
                    {
                        label: 'Start Date',
                        value: this.dateFormatter(this.props.phaseStart)
                    },
                    {
                        label: 'End Date',
                        value: this.dateFormatter(this.props.phaseEnd)
                    },
                    {
                        label: 'Remaining Time',
                        value: this.state.remainingTime
                    }
                ]}
            />
        );
    }
}

PhaseInfo.propTypes = {
    isActive: PropTypes.bool,
    phaseIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    phaseStart: PropTypes.any,
    phaseEnd: PropTypes.any,
    phaseBonusRate: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

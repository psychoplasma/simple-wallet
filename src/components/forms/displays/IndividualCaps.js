import React from 'react';
import PropTypes from 'prop-types';
import { StatusCard } from '../../cards';


export default class IndividualCaps extends React.PureComponent {
    render() {
        return (
            <StatusCard
                title={'INDIVIDUAL CAPS'}
                itemList={[
                    {
                        label: 'Max. Cap',
                        number: true,
                        format: '0,0.[0000000000]',
                        adornment: 'ETH',
                        value: this.props.maxCap
                    },
                    {
                        label: 'Min. Cap',
                        number: true,
                        format: '0,0.[0000000000]',
                        adornment: 'ETH',
                        value: this.props.minCap
                    }
                ]}
            />
        );
    }
}

IndividualCaps.propTypes = {
    maxCap: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    minCap: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
}

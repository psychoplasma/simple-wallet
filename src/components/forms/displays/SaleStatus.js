import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import { StatusCard } from '../../cards';


export default class SaleStatus extends React.PureComponent {
    render() {
        return (
            <StatusCard
                title={'SALE STATUS'}
                itemList={[
                    {
                        label: 'Purchase Rate',
                        adornment: 'TKN/ETH',
                        value: `${numeral(this.props.purchaseRate).format('0,0')}`,
                    },
                    {
                        label: 'Total Cap',
                        adornment: 'ETH',
                        value: `${numeral(this.props.totalCap).format('0,0')}`,
                    },
                    {
                        label: 'Fund Raised',
                        adornment: 'ETH',
                        value: `${numeral(this.props.fundRaised).format('0,0.[000]')}`,
                    },
                    {
                        label: 'Sale Progress',
                        adornment: '%',
                        value: `${this.props.saleProgress}`
                    },
                    {
                        label: 'Collector',
                        value: this.props.fundCollector
                    }
                ]}
            />
        );
    }
}

SaleStatus.propTypes = {
    totalCap: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    fundRaised: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    purchaseRate: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    saleProgress: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    fundCollector: PropTypes.string
}

import React from 'react';
import Numeral from 'numeral';
import PropTypes from 'prop-types';
import styled from 'styled-components';


export default function Balance(props) {
    const formatNumber = function (num, format) {
        return num === ''
            ? '-,-'
            : `${Numeral(num).format(format || '0,0.0')}`;
    };

    return (
        <Wrapper>
            <BalanceText>
                { formatNumber(props.balance, props.format) }
            </BalanceText>
            <Symbol>
                { props.assetSymbol }
            </Symbol>
        </Wrapper>
    );
}

Balance.propTypes = {
    assetSymbol: PropTypes.string.isRequired,
    format: PropTypes.string,
    balance: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
}

const Symbol = styled.div`
    text-align: center;
    font-size: 16px;
    margin-left: 5px;
`;

const BalanceText = styled.div`
    flex-direction: row;
    justify-content: center;
    text-align: center;
    font-size: 16px;
`; 

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;
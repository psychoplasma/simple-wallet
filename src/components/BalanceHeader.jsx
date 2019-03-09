import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Balance from './Balance';


export default function BalanceHeader(props) {
    const balanceRenderer = function (assetList) {
        return assetList.map((asset, index) => {
            return (
                <Asset key={index}>
                    <AssetName>
                        {`${asset.symbol} Balance:`}
                    </AssetName>

                    <Balance
                        assetSymbol={asset.symbol}
                        format={asset.format}
                        balance={asset.balance}
                    />
                </Asset>
            );
        });
    };

    return (
        <Container>
           {balanceRenderer(props.assetList)}
        </Container>
    );
}

BalanceHeader.propTypes = {
    assetList: PropTypes.arrayOf(PropTypes.shape({
        symbol: PropTypes.string,
        format: PropTypes.string,
        balance: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    })).isRequired,
}

const Container = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
`;

const Asset = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const AssetName = styled.div`
    color: #666;
    font-style: italic;
    font-size: 14px;
    font-weight: 600;
    margin-right: 10px;
`;

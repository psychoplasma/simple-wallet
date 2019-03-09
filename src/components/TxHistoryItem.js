import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { utils } from 'ethers';
import Separator from './Separator.jsx';


export default function TxHistoryItem(props) {
  return (
    <Wrapper onClick={_ => {props.onClick(props.item.hash)}}>
    <Item>
        <Header>
          <Count># {props.item.nonce}</Count>
          <Separator vertical={true}/>
          <DateTime>
            {new Date(Number(props.item.timestamp) * 1000).toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric' })}
            {` @ ${new Date(Number(props.item.timestamp) * 1000).toLocaleTimeString()}`}
          </DateTime>
        </Header>
        <Separator spacing={5}/>
        <Content>
          <Hash>{props.item.hash}</Hash>
          <Separator vertical={true}/>
          <NumericContent>
            <Value>{props.item.value} ETH</Value>
            <Fee>{utils.formatEther(`${props.item.gasLimit * props.item.gasPrice}`).toString(10)} ETH</Fee>
          </NumericContent>
        </Content>
      </Item>
      <Separator line={true} lineWitdh={0.5} spacing={0}/>
    </Wrapper>
  );
}

TxHistoryItem.propTypes = {
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
};

const PrimaryText = styled.div`
  font-size: 16px;
  color: #606060;
`;

const SecondaryText = styled.div`
  font-size: 14px;
  color: #c0c0c0;
`;

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  &:hover {
    background-color: #e0e0e0;
  }
  &:active {
    background-color: #d0d0d0;
  }
`;

const Item = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  padding-right: 5px;
  padding-left: 5px;
  margin-bottom: 10px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const Count = styled(SecondaryText)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: start;
  text-align: left;
`;

const DateTime = styled(SecondaryText)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const Content = styled.div`
  display: flex;
  flex: 4;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Hash = styled(PrimaryText)`
  display: flex;
  flex: 11;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  word-break: break-word;
  text-align: left;
`;

const NumericContent = styled.div`
  display: flex;
  flex: 3;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
`;

const Value = styled(PrimaryText)`
  display: flex;
  flex: 1;
  text-align: right;
`;

const Fee = styled(SecondaryText)`
  display: flex;
  flex: 1;
  text-align: right;
`;

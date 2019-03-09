import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import {
    PageContainer,
    PageHeader,
    PageContent,
    Row,
    Column
} from '../boxes';
import {
    TokenAllowanceCheck,
    TokenBalanceCheck,
    TokenBurn,
    TokenBurnFrom,
    TokenMint,
    TokenPause,
    TokenSend
} from '../forms/actions';
import Separator from '../Separator.jsx';
import LabeledValue from '../LabeledValue.jsx';
import ScreenTitle from '../ScreenTitle.jsx';


export default function SpinTokenScreen(props) {
  return (
    <PageContainer>
      <PageHeader>
        <Column>
          <ScreenTitle title={'oken Contract'}/>
          <Separator/>
          <Row>
            <LabeledValue
              style={{width: 400}}
              label={'Contract Address'}
              value={props.contractAddress}
            />
            <Separator vertical={true} spacing={50}/>
            <LabeledValue
              label={'Total Supply'}
              adornment='TKN'
              value={`${numeral(props.totalSupply).format('0,0.[000000]')}`}
            />
          </Row>
        </Column>
      </PageHeader>
      <PageContent>
        <Row>
          <TokenBalanceCheck
            onSubmit={props.onTokenBalanceCheck}
            balance={props.balanceOf}
            processing={props.loadingBalanceOf}
          />
          <Separator vertical={true}/>
          <TokenAllowanceCheck
            onSubmit={props.onTokenAllowanceCheck}
            allowance={props.allowance}
            processing={props.loadingAllowance}
          />
          <Separator vertical={true}/>
          <TokenSend onSubmit={props.onTokenSend}/>
        </Row>
        <Separator spacing={20}/>
        <Row>
          <TokenMint onSubmit={props.onTokenMint}/>
          <Separator vertical={true}/>
          <TokenBurn onSubmit={props.onTokenBurn}/>
          <Separator vertical={true}/>
          <TokenBurnFrom onSubmit={props.onTokenBurnFrom}/>
        </Row>
        <Separator spacing={20}/>
        <Row>
          <TokenPause
            isPaused={props.paused}
            onPause={props.onTokenPause}
            onUnpause={props.onTokenUnpause}
          />
        </Row>
      </PageContent>
    </PageContainer>
  );
}

SpinTokenScreen.propTypes = {
  contractAddress: PropTypes.string,
  totalSupply: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  paused: PropTypes.bool,
  balanceOf: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  allowance: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  loadingBalanceOf: PropTypes.bool,
  loadingAllowance: PropTypes.bool,
  onTokenBalanceCheck: PropTypes.func.isRequired,
  onTokenAllowanceCheck: PropTypes.func.isRequired,
  onTokenSend: PropTypes.func.isRequired,
  onTokenMint: PropTypes.func.isRequired,
  onTokenBurn: PropTypes.func.isRequired,
  onTokenBurnFrom: PropTypes.func.isRequired,
  onTokenPause: PropTypes.func.isRequired,
  onTokenUnpause: PropTypes.func.isRequired
};

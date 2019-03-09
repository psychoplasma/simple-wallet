import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import Separator from '../Separator.jsx';
import ScreenTitle from '../ScreenTitle.jsx';
import LabeledValue from '../LabeledValue.jsx';
import {
    PageContainer,
    PageHeader,
    PageContent,
    Row,
    Column
} from '../boxes';
import {
    SetPhase,
    SetIndividualCaps,
    WithdrawEther,
    WithdrawToken,
    SetFundCollector
} from '../forms/actions';
import {
    IndividualCaps,
    PhaseInfo,
    SaleStatus
} from '../forms/displays';


export default function CrowdsaleScreen(props) {
  return (
    <PageContainer>
      <PageHeader>
        <Column>
          <ScreenTitle title={'Crowdsale Contract'}/>
          <Separator/>
          <Row>
            <LabeledValue
              style={{width: 400}}
              label={'Contract Address'}
              value={props.contractAddress}
            />
          </Row>
          <Separator/>
          <Row>
            <LabeledValue
              label={'Token Balance'}
              adornment='TKN'
              value={`${numeral(props.balance).format('0,0.[000000]')}`}
            />            
            <Separator vertical={true} spacing={50}/>
            <LabeledValue
              label={'Withdrawable Token Balance'}
              adornment='TKN'
              value={`${numeral(props.balance - props.lockedBalance).format('0,0.[000000]')}`}
            />
            <Separator vertical={true} spacing={50}/>
            <LabeledValue
              label={'Token Locked'}
              adornment='TKN'
              value={`${numeral(props.lockedBalance).format('0,0.[000000]')}`}
            />
          </Row>
        </Column>
      </PageHeader>
      <PageContent>
        <Row>
          <PhaseInfo
            isActive={props.isPhaseActive}
            phaseIndex={props.phaseIndex}
            phaseStart={props.phaseStart}
            phaseEnd={props.phaseEnd}
            phaseBonusRate={props.phaseBonusRate}
          />
          <SaleStatus
            totalCap={props.totalCap}
            fundRaised={props.fundRaised}
            purchaseRate={props.rate}
            saleProgress={props.progress}
            fundCollector={props.collectorAddress}
          />
          <IndividualCaps
            minCap={props.minCap}
            maxCap={props.maxCap}
          />
        </Row>
        <Separator spacing={20}/>
        <Row>
          <SetPhase onSubmit={props.onSetPhase}/>
          <SetIndividualCaps onSubmit={props.onSetIndiviualCaps}/>
        </Row>
        <Separator spacing={20}/>
        <Row>
          <SetFundCollector onSubmit={props.onSetWallet}/>
          <WithdrawEther onSubmit={props.onWithdrawEther}/>
          <WithdrawToken onSubmit={props.onWithdrawToken}/>
        </Row>
      </PageContent>
    </PageContainer>
  );
}

CrowdsaleScreen.propTypes = {
  contractAddress: PropTypes.string,
  processing: PropTypes.bool,
  balance: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  lockedBalance: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  isPhaseActive: PropTypes.bool,
  phaseIndex: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  phaseStart: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  phaseEnd: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  phaseBonusRate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  totalCap: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  fundRaised: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  rate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  progress: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  collectorAddress: PropTypes.string,
  minCap: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  maxCap: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  onSetPhase: PropTypes.func.isRequired,
  onSetIndiviualCaps: PropTypes.func.isRequired,
  onWithdrawEther: PropTypes.func.isRequired,
  onWithdrawToken: PropTypes.func.isRequired,
  onSetWallet: PropTypes.func.isRequired,
};

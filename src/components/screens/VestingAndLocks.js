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
    ReleaseTokens,
    TokenUnlock,
    TokenUnlockableCheck,
    DeliverPurchases,
    TokenLock,
    AdjustLockTime,
    IncreaseLockAmount,
    TokenVestManually,
    TokenUnlockableListCheck,
    LockDetailsCheck
} from '../forms/actions';


export default function VestingAndLocksScreen(props) {
  return (
    <PageContainer>
      <PageHeader>
        <Column>
          <ScreenTitle title={'Vesting And Locks'}/>
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
              label={'Total Token Balance'}
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
              label={'Locked TOKEN Balance'}
              adornment='TKN'
              value={`${numeral(props.lockedBalance).format('0,0.[000000]')}`}
            />
          </Row>
        </Column>
      </PageHeader>
      <PageContent>
        <Row>
          <TokenVestManually onSubmit={props.onTokenVestManually}/>
          <DeliverPurchases onSubmit={props.onDeliverPurchases}/>
        </Row>
        <Separator spacing={20}/>
        <Row>
          <TokenLock onSubmit={props.onTokenLock}/>
          <AdjustLockTime onSubmit={props.onAdjustLockTime}/>
          <IncreaseLockAmount onSubmit={props.onIncreaseLockAmount}/>
        </Row>
        <Separator spacing={20}/>
        <Row>
          <TokenUnlock onSubmit={props.onTokenUnlock}/>
          <LockDetailsCheck onSubmit={props.onLockDetailsCheck}/>
          <TokenUnlockableCheck
            unlockable={props.unlockable}
            total={props.totalEarned}
            processing={props.processing}
            onSubmit={props.onTokenUnlockableCheck}
          />
        </Row>
        <Separator spacing={20}/>
        <Row>
          <ReleaseTokens onSubmit={props.onTokenRelease}/>
          <TokenUnlockableListCheck onSubmit={props.onTokenUnlockableListCheck}/>
        </Row>
      </PageContent>
    </PageContainer>
  );
}

VestingAndLocksScreen.propTypes = {
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
  totalEarned: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  unlockable: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  onSetVestingPeriods: PropTypes.func.isRequired,
  onTokenRelease: PropTypes.func.isRequired,
  onTokenUnlock: PropTypes.func.isRequired,
  onTokenUnlockableCheck: PropTypes.func.isRequired,
  onTokenUnlockableListCheck: PropTypes.func.isRequired,
  onLockDetailsCheck: PropTypes.func.isRequired,
  onTokenVestManually: PropTypes.func.isRequired,
  onDeliverPurchases: PropTypes.func.isRequired,
  onTokenLock: PropTypes.func.isRequired,
  onAdjustLockTime: PropTypes.func.isRequired,
  onIncreaseLockAmount: PropTypes.func.isRequired,
};

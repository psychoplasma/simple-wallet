import React from 'react';
import PropTypes from 'prop-types';
import CardMaker from '../CardMaker';
import ScreenMaker from '../ScreenMaker';
import PopupPatcher from '../PopupPatcher';
import Separator from '../Separator.jsx';
import Address from '../Address';
import Balance from '../Balance';
import NetworkSelector from '../NetworkSelector';
import { SubmitButton } from '../buttons';
import { Column, Row } from '../boxes';


function WalletScreen(props) {
  return (
    <Column>
      <NetworkSelector
        networks={props.networkList}
        value={props.network}
        onSelect={props.onNetworkChange}
      />

      <Separator spacing={10}/>
      <Address
        address={props.address}
        size={200}
      />

      <Separator spacing={10}/>
      <Balance
        assetSymbol={'ETH'}
        format={'0,0.[0000000000]'}
        balance={props.balance}
      />

      <Separator spacing={10}/>
      <Balance
        assetSymbol={'TKN'}
        format={'0,0.[0000000000]'}
        balance={props.spinBalance}
      />

      <Separator spacing={20}/>
      <SubmitButton
        text={'send'}
        onClick={props.goToSend}
      />

      <Separator spacing={10}/>
      <SubmitButton
        text={'tx history'}
        onClick={props.goToHistory}
      />

      <Separator spacing={10}/>
      <SubmitButton
        text={'settings'}
        onClick={props.goToSettings}
      />

      <Separator spacing={10}/>
      <SubmitButton
        text={'logout'}
        onClick={props.onLogout}
      />

      <Separator spacing={10}/>
      <Row>
        <a style={{textAlign: 'center'}} onClick={props.onImport}>
          Import Wallet
        </a>
      </Row>
    </Column>
  );
}

export default ScreenMaker(
  PopupPatcher(CardMaker(WalletScreen)),
  {title: 'Simple Wallet', size: 1.35}
);

WalletScreen.propTypes = {
  onLogout: PropTypes.func.isRequired,
  onImport: PropTypes.func.isRequired,
  goToSend: PropTypes.func.isRequired,
  onNetworkChange: PropTypes.func.isRequired,
  goToHistory: PropTypes.func.isRequired,
  goToSettings: PropTypes.func.isRequired,
  networkList: PropTypes.arrayOf(PropTypes.string).isRequired,
  network: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  balance: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  spinBalance: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};
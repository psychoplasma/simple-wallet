import React from 'react';
import PropTypes from 'prop-types';
import { SetContractAddresses } from '../forms/actions';
import PopupPatcher from '../PopupPatcher';
import CardMaker from '../CardMaker';
import ScreenMaker from '../ScreenMaker';
import Separator from '../Separator.jsx';
import { Column, Row } from '../boxes';


class SettingsScreen extends React.PureComponent {
  render() {
    return (
      <Column>
        <Separator spacing={20}/>
        <Row>
          <SetContractAddresses
            tokenContractAddress={this.props.tokenContractAddress}
            saleContractAddress={this.props.saleContractAddress}
            onSubmit={this.props.onSetContractAddresses}
          />
        </Row>
      </Column>
    );
  }
}

SettingsScreen.propTypes = {
  onSetContractAddresses: PropTypes.func.isRequired,
  tokenContractAddress: PropTypes.string,
  saleContractAddress: PropTypes.string
};

export default ScreenMaker(
  PopupPatcher(CardMaker(SettingsScreen)),
  {title: 'Settings', size: 1.5, goBackable: true}
);

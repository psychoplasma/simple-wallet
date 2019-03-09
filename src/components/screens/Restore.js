import React from 'react';
import PropTypes from 'prop-types';
import CardMaker from '../CardMaker';
import ScreenMaker from '../ScreenMaker';
import PopupPatcher from '../PopupPatcher';
import Separator from '../Separator.jsx';
import { SubmitButton } from '../buttons/';
import { Column } from '../boxes';


function RestoreScreen(props) {
  return (
    <Column>
    <Separator spacing={20}/>
      <SubmitButton
        text={'From Seed Phrase'}
        nonCapitalized={true}
        onClick={props.goToImportMnemonics}
      />

      <Separator spacing={10}/>

      <SubmitButton
        text={'From Keystore File'}
        nonCapitalized={true}
        onClick={props.goToImportKeystoreFile}
      />
        
      <Separator spacing={10}/>
      
      <SubmitButton
        text={'From Private Key'}
        nonCapitalized={true}
        onClick={props.goToImportPrivateKey}
      />
    </Column>
  );
}

export default ScreenMaker(
  PopupPatcher(CardMaker(RestoreScreen)),
  {title: 'Import Wallet', size: 1.35, goBackable: true}
);

RestoreScreen.propTypes = {
  goToImportMnemonics: PropTypes.func.isRequired,
  goToImportKeystoreFile: PropTypes.func.isRequired,
  goToImportPrivateKey: PropTypes.func.isRequired
};

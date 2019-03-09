import React from 'react';
import PropTypes from 'prop-types';
import { ClipLoader } from 'react-spinners';
import CardMaker from '../CardMaker';
import ScreenMaker from '../ScreenMaker';
import TxHistoryItem from '../TxHistoryItem';
import { Column, Row } from '../boxes';


function HistoryScreen(props) {
  return (
    <Column>
      {
        props.processing
        ? <Row>
            <ClipLoader
              size={24}
              color={'#6ddcc6'}
              loading={props.loading}
            />
          </Row>
        :  props.txHistory.map((item, index) => (
            <TxHistoryItem
              key={index}
              item={item}
              onClick={props.onItemClick}
            />
          ))
      }
    </Column>
  );
}

export default ScreenMaker(
  CardMaker(HistoryScreen),
  {title: 'Transaction History', size: 2.5, goBackable: true}
);

HistoryScreen.propTypes = {
  txHistory: PropTypes.arrayOf(
    PropTypes.object
  ),
  processing: PropTypes.bool,
  onItemClick: PropTypes.func.isRequired
};

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';
import { ClipLoader } from 'react-spinners';
import CardMaker from '../CardMaker';
import ScreenMaker from '../ScreenMaker';
import Separator from '../Separator.jsx';
import { SubmitButton } from '../buttons';
import { Column, Row } from '../boxes';


function TxReceiptScreen(props) {
  const itemRenderer = function (object) {
    let items = [];
    _.forEach(object, (value, prop) => items.push(
      <div key={items.length}>
        <Separator spacing={10}/>

        <Wrapper>
          <Label> {prop} : </Label>
          <Value size={14}> { value } </Value>
        </Wrapper>

      </div>
    ));

    return items;
  };

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
        : itemRenderer(props.txReceipt)
      }

      <Separator spacing={20}/>

      <SubmitButton
        text={'done'}
        onClick={props.onDone}
      />
    </Column>
  );
}

export default ScreenMaker(
  CardMaker(TxReceiptScreen),
  {title: 'Transaction Receipt', size: 2}
);

TxReceiptScreen.propTypes = {
  txReceipt: PropTypes.object.isRequired,
  onDone: PropTypes.func.isRequired
};

const Label = styled.div`
  display: flex;
  flex: 3;
  text-align: left;
  font-size: 16px;
  font-weight: 600;
  font-style: italic;
  color: #6e6e6e;
  margin-right: 5px;
`;

const Value = styled.div`
  display: flex;
  flex: 10;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: ${props => !props.size ? '18px' : `${props.size}px`};
  color: #6e6e6e;
  word-break: break-word;
`; 

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;


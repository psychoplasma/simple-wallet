import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cardMaker from '../CardMaker';
import { Row } from '../boxes';
import { SubmitButton } from '../buttons';
import Separator from '../Separator.jsx';
import { BasicInput } from '../inputs';


function MultiActionCard(props) {
  const renderer = function (inputList) {
    return inputList.map((item, index) => {
      return (
        <Container key={index}>
          <BasicInput {...item}/>
        </Container>
      );
    });
  };

  return (
    <Container>
      {renderer(props.inputList)}

      <Separator/>

      <Row>
        <SubmitButton
          text={props.buttonNegative ? props.buttonNegative.text : ''}
          onClick={props.buttonNegative ? props.buttonNegative.onClick : () => {}}
          disabled={!!props.processing}
          loading={!!props.processing}
          invisible={!props.buttonNegative}
        />

        {!props.buttonNegative ? null : <Separator vertical={true}/>}

        <SubmitButton
          text={props.buttonNeutral ? props.buttonNeutral.text : ''}
          onClick={props.buttonNeutral ? props.buttonNeutral.onClick : () => {}}
          disabled={!!props.processing}
          loading={!!props.processing}
          invisible={!props.buttonNeutral}
        />

        {!props.buttonNeutral || !props.buttonPositive ? null : <Separator vertical={true}/>}

        <SubmitButton
          text={props.buttonPositive ? props.buttonPositive.text : ''}
          onClick={props.buttonPositive ? props.buttonPositive.onClick : () => {}}
          disabled={!!props.processing}
          loading={!!props.processing}
          invisible={!props.buttonPositive}
        />
      </Row>

    </Container>
  );
}

export default cardMaker(MultiActionCard);


MultiActionCard.propTypes = {
  buttonNegative: PropTypes.shape({
    text: PropTypes.string,
    onClick: PropTypes.func
  }),
  buttonNeutral: PropTypes.shape({
    text: PropTypes.string,
    onClick: PropTypes.func
  }),
  buttonPositive: PropTypes.shape({
    text: PropTypes.string,
    onClick: PropTypes.func
  }),
  inputList: PropTypes.arrayOf(PropTypes.object),
  processing: PropTypes.bool
}

const Container = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: stretch;
`;

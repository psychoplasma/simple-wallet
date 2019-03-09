import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cardMaker from '../CardMaker';
import { Column } from '../boxes/';
import { SubmitButton } from '../buttons';
import Separator from '../Separator.jsx';
import LabeledValue from '../LabeledValue.jsx';
import { BasicInput } from '../inputs';


function ActionStatusCard(props) {
  const renderer = function (inputList) {
    return inputList.map((item, index) => {
      let {label, value, resultLabel, result, ...rest} = item;
      return (
        <Column key={index}>
          {
            label || value
              ? <BasicInput {...item}/>
              : null
          }
          {
            resultLabel || result
              ? <LabeledValue
                  label={resultLabel}
                  value={result}
                  {...rest}
                />
              : null
          }
        </Column>
      );
    });
  };

  return (
    <Container>
      {renderer(props.inputList)}

      <Separator/>

      <SubmitButton
          text={'submit'}
          onClick={props.onSubmit}
          disabled={!!props.processing}
          loading={!!props.processing}
      />
    </Container>
  );
}

export default cardMaker(ActionStatusCard);


ActionStatusCard.propTypes = {
  onSubmit: PropTypes.func.isRequired,
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

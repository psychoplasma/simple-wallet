import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cardMaker from '../CardMaker';
import { SubmitButton } from '../buttons';
import Separator from '../Separator.jsx';
import { BasicInput } from '../inputs';
import DateTimePicker from '../DateTimePicker';


function ActionCard(props) {
    const renderer = function (inputList) {
        return inputList.map((item, index) => {
            return item.type === 'date'
                ?   <DateTimePicker key={index} {...item}/>
                :   <BasicInput key={index} {...item}/>;
        });
    };

    return (
        <Container>
            {renderer(props.inputList)}

            <Separator/>

            <SubmitButton
                text={props.buttonText || 'submit'}
                onClick={props.onSubmit}
                disabled={!!props.processing}
                loading={!!props.processing}
            />
        </Container>
    );
}

export default cardMaker(ActionCard);


ActionCard.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    inputList: PropTypes.arrayOf(PropTypes.object),
    processing: PropTypes.bool
}

const Container = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;
`;

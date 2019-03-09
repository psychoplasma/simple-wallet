import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ClipLoader } from 'react-spinners';


export default function SubmitButton(props) {
    if (props.invisible) {
        return null;
    }

    if (props.loading) {
        return (
            <ButtonDisabled style={{...props.style}} onClick={props.onClick} disabled={true}>
                <ClipLoader
                    size={24}
                    color={'white'}
                    loading={props.loading}
                />
            </ButtonDisabled>
        );
    } else {
        return (
            <ButtonEnabled style={{...props.style}} onClick={props.onClick}>
                <Text>
                    {props.nonCapitalized ? props.text : props.text.toUpperCase()}
                </Text>
            </ButtonEnabled>
        );
    }
}

SubmitButton.propTypes = {
    text: PropTypes.string.isRequired,
    loading: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    invisible: PropTypes.bool,
    nonCapitalized: PropTypes.bool
}

const Button = styled.button`
    felx: 1;
    height: 48px;
    min-width: 100px;
    border-radius: 10px;
    border-width: 0px;
    border-color: transparent;
    &:focus {
        outline:0;
    }
`;

const ButtonEnabled = styled(Button)`
    background-color: #42a5f5;
    &:hover {
        box-shadow: 0px 0px 20px 3px rgba(0,0,0,0.25);
    }
    &:active {
        background-color: #80d6ff;
    }
`;

const ButtonDisabled = styled(Button)`
    background-color: #80d6ff;
`;

const Text = styled.div`
    padding: 10px;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    color: white;
`;
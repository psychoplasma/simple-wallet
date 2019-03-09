import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


export default function ScreenTitle(props) {
    return (
        <Title>
            {props.title}
        </Title>
    );
}

ScreenTitle.propTypes = {
    title: PropTypes.string.isRequired,
}

const Title = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 24px;
    font-weight: 400;
    color: black;
`;

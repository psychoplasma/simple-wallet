import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


export default function Separator(props) {
    return props.vertical
        ? <VerticalSeparator spacing={props.spacing} line={props.line} lineWidth={props.lineWidth}/>
        : <HorizontalSeparator spacing={props.spacing} line={props.line} lineWidth={props.lineWidth}/>
}

Separator.propTypes = {
    vertical: PropTypes.bool,
    spacing: PropTypes.number,
    line: PropTypes.bool
}

const VerticalSeparator = styled.div`
    margin-left: ${props => !props.spacing && props.spacing !== 0 ? '10px' : `${props.spacing}px`};
    margin-right: ${props => !props.spacing && props.spacing !== 0 ? '10px' : `${props.spacing}px`};
    width: ${props => props.line ? props.lineWidth ? `${props.lineWidth}px` : '2px' : '0px' };
    align-self: stretch;
    background-color: ${props => props.line ? '#eee' : 'inherited' };
`;

const HorizontalSeparator = styled.div`
    margin-bottom: ${props => !props.spacing && props.spacing !== 0 ? '10px' : `${props.spacing}px`};
    margin-top: ${props => !props.spacing && props.spacing !== 0 ? '10px' : `${props.spacing}px`};
    height: ${props => props.line ? props.lineWidth ? `${props.lineWidth}px` : '2px' : '0px' };
    align-self: stretch;
    background-color: ${props => props.line ? '#eee' : 'inherited' };
`;
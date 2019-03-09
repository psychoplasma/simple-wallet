import React from 'react';
import PropTypes from 'prop-types';
import { MultiActionCard } from '../../cards';
import PopupPatcher from '../../PopupPatcher';


function TokenPause(props) {
    return (
        <MultiActionCard
            title={'Pause/Unpause'}
            inputList={[]}
            buttonPositive={{
                text: props.isPaused ? 'unpause' : 'pause',
                onClick: props.isPaused ? props.onUnpause : props.onPause
            }}
        />
    );
}

export default PopupPatcher(TokenPause);


TokenPause.propTypes = {
    isPaused: PropTypes.bool,
    onPause: PropTypes.func.isRequired,
    onUnpause: PropTypes.func.isRequired
}

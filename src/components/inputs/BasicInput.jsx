import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';


function BasicInput(props) {
    return (
        <div className={props.classes.container} style={{...props.style}}>
            <TextField
                label={props.label}
                placeholder={props.placeholder}
                disabled={props.disabled}
                value={props.value}
                defaultValue={props.defaultValue}
                onChange={props.onChange}
                type={props.type || 'text'}
                margin='dense'
                variant='outlined'
                error={!!props.error}
                helperText={props.error || ''}
                InputProps={props.adornment ? {
                    endAdornment: <InputAdornment position='end'>{props.adornment}</InputAdornment>,
                } : null}
          />
        </div>
    );
}

BasicInput.propTypes = {
    label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    placeholder: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    onChange: PropTypes.func.isRequired
}

const styles = theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch'
    }
});

export default withStyles(styles)(BasicInput);

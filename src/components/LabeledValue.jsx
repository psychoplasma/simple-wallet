import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import TextField from '@material-ui/core/TextField';
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from '@material-ui/core/InputAdornment';


function LabeledValue(props) {
    let { classes } = props;
    return (
        <div className={classes.container} style={{...props.style}}>
            <InputLabel className={classes.label}>
                {props.label}
            </InputLabel>
            <TextField
                className={classes.textField}
                value={props.value}
                onChange={null}
                disabled={true}
                margin='dense'
                variant='standard'
                InputProps={props.adornment ? {
                    endAdornment: <InputAdornment position='end'>{props.adornment}</InputAdornment>,
                } : null}
            />
        </div>
    );
}

LabeledValue.propTypes = {
    label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
}

const styles = theme => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'baseline',
        padding: theme.spacing.unit
    },
    label: {
        flex: 2,
        marginRight: theme.spacing.unit / 2
    },
    textField: {
        flex: 5,
        textAlign: 'center',
        color: grey,
    }
});

export default withStyles(styles)(LabeledValue);

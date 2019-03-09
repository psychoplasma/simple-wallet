import React from 'react';
import PropTypes from 'prop-types';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});


class NetworkSelector extends React.PureComponent {
  populateNetworkList(networks) {
    return networks.map((network, index) => (
      <MenuItem key={index} value={network}>{network}</MenuItem>
    ));
  };

  render() {
    const { classes } = this.props;

    return (
      <div style={{justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row', display: 'flex'}}>
        <FormControl variant='outlined' margin='dense' className={classes.formControl}>
          <InputLabel
            htmlFor='network-selector'
          >
            Network
          </InputLabel>

          <Select
            value={this.props.value}
            onChange={event => this.props.onSelect(event.target.value)}
            input={
              <OutlinedInput
                labelWidth={50}
                name='Network'
                id='network-selector'
              />
            }
          >
            {this.populateNetworkList(this.props.networks)}
          </Select>
        </FormControl>
      </div>
    );
  }
}

NetworkSelector.propTypes = {
  networks: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.any,
  onSelect: PropTypes.func.isRequired
};

export default withStyles(styles)(NetworkSelector);
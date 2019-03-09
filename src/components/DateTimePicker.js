import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DateTimePicker } from 'material-ui-pickers';
import { InputAdornment } from '@material-ui/core';
import Event from '@material-ui/icons/Event';


export default class CustomDateTimePicker extends React.PureComponent {
  state = {
    selectedDate: null
  };

  onChangeHandler = (selectedDate) => {
    this.setState({selectedDate});
    this.props.onChange(selectedDate);
  };

  render() {  
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DateTimePicker
          disablePast
          variant='outlined'
          margin='dense'
          showTodayButton={true}
          todayLabel='now'
          ampm={false}
          InputProps={{
            endAdornment: 
              <InputAdornment position='end'>
                <Event color='action'/>
              </InputAdornment>
          }}
          format={'yyyy/MM/dd hh:mm a'}
          placeholder={'yyyy/MM/dd hh:mm'}
          label={this.props.label}
          value={this.state.selectedDate}
          onChange={this.onChangeHandler}
        />
      </MuiPickersUtilsProvider>
    );
  }
}

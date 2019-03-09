import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import cardMaker from '../CardMaker';
import { BasicInput } from '../inputs';
import { SubmitButton } from '../buttons';
import Separator from '../Separator.jsx';
import { OpenFileBrowser } from '../../utils/popup';
import DateTimePicker from '../DateTimePicker';


const styles = theme => ({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'stretch'
  }
});

function ActionEntryCard(props) {
  const renderer = function (inputList) {
    return inputList.map((item, index) => {
      return item.type === 'date'
        ? <DateTimePicker key={index} {...item}/>
        : <BasicInput key={index} {...item}/>;
        
    });
  };

  return (
    <div className={props.classes.container}>
      {renderer(props.inputList)}

      <Separator/>

      <SubmitButton
        text={'Add'}
        onClick={props.onAdd}
        disabled={!!props.processing}
      />

      <Separator/>

      <SubmitButton
        text={'Upload'}
        onClick={() => OpenFileBrowser(props.onUpload)}
        disabled={!!props.processing}
        loading={!!props.processing}
      />

      <Separator/>

      <SubmitButton
        text={'Clear'}
        onClick={props.onClear}
        disabled={!!props.processing}
      />

      <TextField
        label={props.listLabel}
        disabled
        multiline
        value={props.entries}
        rows="10"
        margin="dense"
        variant="outlined"
      />

      <Separator/>

      <SubmitButton
        text={'Submit'}
        onClick={props.onSubmit}
        disabled={!!props.processing}
      />
    </div>
  );
}

export default cardMaker(withStyles(styles)(ActionEntryCard));

import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Separator from './Separator.jsx';


export default function ProgressDialog(props) {
  let { color, ...others } = props;
  return (
    <Dialog
      {...others}
      disableBackdropClick={true}
      aria-labelledby='progress-dialog-title'
      aria-describedby='progress-dialog-description'
    >
      <DialogTitle id='progress-dialog-title'>
        {props.title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='progress-dialog-description'>
          {props.description}
        </DialogContentText>
      </DialogContent>
      <Separator/>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <CircularProgress color={'secondary'}/>
      </div>
      <Separator/>
    </Dialog>
  );
}

ProgressDialog.propTypes = {
  onClose: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string,
  open: PropTypes.bool
};

import React from 'react';
import PropTypes from 'prop-types';
import { ActionStatusCard } from '../../cards';


export default function RenounceAdmin(props) {
  return (
    <ActionStatusCard
      inputList={[{
        resultLabel: 'This Account',
        result: props.account || 'N/A'
      }]}
      title={'Renounce Admin'}
      onSubmit={props.onSubmit}
      processing={props.processing}
    />
  );
}

RenounceAdmin.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  account: PropTypes.string,
  processing: PropTypes.bool
}

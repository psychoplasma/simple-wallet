import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import QRCode from 'qrcode.react';


export default function Address(props) {
  return (
    <Wrapper>
      <QRCode
        value={props.address}
        size={props.size}
      />
      <AddressText>
        { props.address }
      </AddressText>
    </Wrapper>
  );
}

Address.propTypes = {
  address: PropTypes.string.isRequired,
  size: PropTypes.number
}

const AddressText = styled.div`
  margin-top: 10px;
  text-align: center;
  font-size: 12px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
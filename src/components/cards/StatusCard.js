import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import numeral from 'numeral';
import LabeledValue from '../LabeledValue.jsx';
import Separator from '../Separator.jsx';
import cardMaker from '../CardMaker';


function StatusCard(props) {
    const renderer = function (itemList) {
        return itemList.map((item, index) => {
            if (item.separator) {
                return <Separator key={index}/>
            } else {
                let {value, prefix, suffix, number, format, ...rest} = item;
                return (
                    <LabeledValue
                        {...rest}
                        key={index}
                        value={`${prefix || ''} ${number ? numeral(value).format(format || '0,0') : value} ${suffix || ''}`}
                    />
                );
            }
        });
    };

    return (
        <Wrapper>
            {renderer(props.itemList)}
        </Wrapper>
    );
}

export default cardMaker(StatusCard);


StatusCard.propTypes = {
    itemList: PropTypes.arrayOf(PropTypes.object)
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
`;

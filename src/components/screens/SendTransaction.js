import React from 'react';
import PropTypes from 'prop-types';
import CardMaker from '../CardMaker';
import ScreenMaker from '../ScreenMaker';
import PopupPatcher from '../PopupPatcher';
import Separator from '../Separator.jsx';
import { BasicInput } from '../inputs';
import { SubmitButton } from '../buttons';
import { Column } from '../boxes';


class SendTransactionScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      gasPrice: '',
      gasLimit: ''
    };
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  onClickHandler() {
    this.props.onSend(
      this.props.to,
      this.props.amount,
      this.props.data,
      this.state.gasPrice ? this.state.gasPrice : this.props.gasPrice,
      this.state.gasLimit ? this.state.gasLimit : this.props.gasLimit
    );
  }

  render() {
    return (
      <Column>
        <Separator spacing={10}/>

        <BasicInput
          label={'To'}
          onChange={_ => {}}
          disabled={true}
          value={this.props.to}
        />
        
        <Separator spacing={10}/>

        <BasicInput
          label={'Value'}
          adornment={'ETH'}
          onChange={_ => {}}
          disabled={true}
          value={this.props.amount}
        />
        
        <Separator spacing={10}/>

        <BasicInput
          label={'Tx Data'}
          onChange={_ => {}}
          disabled={true}
          value={this.props.data || '0x (optional)'}
        />
        
        <Separator spacing={10}/>

        <BasicInput
          label={'Gas Price'}
          adornment={'GWEI'}
          placeholder={this.props.gasPrice}
          onChange={event => this.setState({gasPrice: event.target.value})}
          value={this.state.gasPrice ? this.state.gasPrice : this.props.gasPrice}
          type={'number'}
        />
        
        <Separator spacing={10}/>

        <BasicInput
          label={'Gas Limit'}
          placeholder={'Max. number of gas'}
          onChange={event => this.setState({gasLimit: event.target.value})}
          value={this.state.gasLimit ? this.state.gasLimit : this.props.gasLimit}
          error={this.props.error}
          type={'number'}
        />

        <Separator spacing={20}/>

        <SubmitButton
          text={'send'}
          onClick={this.onClickHandler}
          loading={this.props.processing}
        />
      </Column>
    );
  }
}

export default ScreenMaker(
  PopupPatcher(CardMaker(SendTransactionScreen)),
  {title: 'Send Transaction', size: 1.35, goBackable: true}
);

SendTransactionScreen.propTypes = {
  to: PropTypes.string.isRequired,
  amount: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  data: PropTypes.any,
  gasPrice: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  gasLimit: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  processing: PropTypes.bool,
  onSend: PropTypes.func.isRequired
};

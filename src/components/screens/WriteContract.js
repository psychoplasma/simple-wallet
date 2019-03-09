import React from 'react';
import PropTypes from 'prop-types';
import CardMaker from '../CardMaker';
import ScreenMaker from '../ScreenMaker';
import PopupPatcher from '../PopupPatcher';
import Separator from '../Separator.jsx';
import { BasicInput } from '../inputs';
import { SubmitButton } from '../buttons';
import { Column } from '../boxes';


class WriteContractScreen extends React.PureComponent {
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
      this.state.gasPrice ? this.state.gasPrice : this.props.gasPrice,
      this.state.gasLimit ? this.state.gasLimit : this.props.gasLimit
    );
  }

  render() {
    return (
      <Column>
        <Separator spacing={10}/>

        <BasicInput
          label={'Function'}
          onChange={_ => {}}
          disabled={true}
          defaultValue={this.props.functionSignature}
        />
        
        <Separator spacing={10}/>

        <BasicInput
          label={'Gas Price'}
          placeholder={'Gas Price in GWEI'}
          onChange={event => this.setState({gasPrice: event.target.value})}
          value={this.state.gasPrice ? this.state.gasPrice : this.props.gasPrice}
          type={'number'}
        />
        <Separator spacing={10}/>

        <BasicInput
          label={'Gas Limit'}
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
  PopupPatcher(CardMaker(WriteContractScreen)),
  {title: 'Write Contract', size: 1.35, goBackable: true}
);

WriteContractScreen.propTypes = {
  functionSignature: PropTypes.string.isRequired,
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
